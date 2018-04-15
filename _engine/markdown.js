#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const fetch = require('node-fetch');

function markdown (content) {
  return fetch('https://api.github.com/markdown/raw', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: content
  });
}

function parseFilename (arg) {
  const retVal = { arg: arg, inputFilename: path.resolve(process.cwd(), arg), outputFilename: null };

  switch (path.extname(arg)) {
  case '.md':
    retVal.outputFilename = path.resolve(process.cwd(), arg.substring(0, arg.length - 3) + '.html');
    break;
  default:
    retVal.outputFilename = path.resolve(process.cwd(), arg + '.html');
    break;
  }

  return retVal;
}

function createMarkdownStream (descriptor) {
  const readStream = fs.createReadStream(descriptor.inputFilename, { encoding: 'utf-8' });
  return {
    readStream: readStream,
    markdownStream: markdown(readStream),
    ...descriptor
  };
}

function streamifyMarkdownPromise (pipeline, response, idx) {
  const descriptor = pipeline[idx];
  return { ...descriptor, markdownStream: response.body };
}

function writeResponseToFile (descriptor) {
  const writeStream = fs.createWriteStream(descriptor.outputFilename, { encoding: 'utf-8' });
  descriptor.markdownStream.pipe(writeStream);
  return new Promise((resolve, reject) => {
    writeStream
      .on('error', reject)
      .on('finish', resolve);
  });
}

const args = process.argv.slice(2);
const readingPipeline = args.map(parseFilename).map(createMarkdownStream);

console.log('Processing:');
readingPipeline.forEach(descr => { console.log(descr.inputFilename); });

Promise.all(readingPipeline.map(descriptor => descriptor.markdownStream))
  .then(result => {
    const enhancedPipeline = result
      .map(streamifyMarkdownPromise.bind(this, readingPipeline));
    return Promise.all(enhancedPipeline.map(writeResponseToFile))
      .then(() => enhancedPipeline);
  })
  // .then(() => console.log(' ... everything went well'))
  .catch(console.error);
