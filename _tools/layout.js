#!/usr/bin/env node

const path = require('path');

const { JSDOM } = require('jsdom');

const config = require('./layout.config.json');

function main ([ input, dom ]) {
  const fragment = JSDOM.fragment(input);
  const { document } = dom.window;

  enhanceTitle(document, fragment.querySelector('h1').textContent);
  enhanceDescription(document, extractDescription(fragment));
  enhanceAnchors(fragment);
  enhanceImages(fragment, document);

  document.getElementById('content').appendChild(fragment);
  return dom.serialize();
}

function enhanceTitle (document, title) {
  const titleTags = [
    'meta[name~="twitter:title"]',
    'meta[property~="og:title"]',
    'meta[property~="og:site_name"]'
  ];
  Array.prototype.forEach.call(
    document.querySelectorAll(titleTags.join(',')),
    function (tag) {
      tag.content = title ? [title, config.title].join(' - ') : config.title;
    }
  );
  document.title = title ? [title, config.title].join(' - ') : config.title;
}

function extractDescription (fragment) {
  let words = [];
  for (const p of fragment.querySelectorAll('p')) {
    const pWords = p.textContent.split(' ').filter(Boolean);
    if (words.length + pWords.length > config.description_words_count_limit) {
      break;
    } else {
      words = words.concat(pWords);
    }
  }
  return words.join(' ');
}

function enhanceDescription (document, description) {
  const descriptionTags = [
    'meta[name~="description"]',
    'meta[name~="twitter:description"]',
    'meta[property~="og:description"]'
  ];
  Array.prototype.forEach.call(
    document.querySelectorAll(descriptionTags.join(',')),
    function (tag) {
      tag.content = description;
    }
  );
}

function enhanceAnchors (fragment) {
  Array.prototype.forEach.call(
    fragment.querySelectorAll('a'),
    function (a) {
      if (!config.nofollow_whitelist.includes(a.hostname)) {
        a.rel = 'nofollow';
      }
      if (!config.internal_domains.includes(a.hostname)) {
        a.target = '_blank';
      }
    }
  );
}

function enhanceImages (fragment, document) {
  function wrapInNoscript (img) {
    const noscript = document.createElement('noscript');
    noscript.dataset.gif = img.src;
    noscript.dataset.alt = img.alt;
    img.parentNode.replaceChild(noscript, img);
    noscript.appendChild(img);
  }

  Array.prototype.forEach.call(
    fragment.querySelectorAll('img'),
    function (img) {
      if ('.gif' === img.src.substr(-4).toLowerCase()) {
        wrapInNoscript(img);
      }
    }
  );
}

function makeStringFromStream (stream) {
  return new Promise(function (resolve, reject) {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString()));
  });
}

const templatePath = path.resolve(__dirname, '..', '_template', 'default.html');
Promise.all([
  makeStringFromStream(process.stdin),
  JSDOM.fromFile(templatePath)
])
.then(main)
.then(console.log)
.catch(err => {
  console.error(err);
  process.exit(1);
});
