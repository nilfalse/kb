#!/usr/bin/env node

const fetch = require('node-fetch');

function markdown (content) {
  const headers = { 'Content-Type': 'text/plain' };

  const { GITHUB_TOKEN, TRAVIS_REPO_SLUG } = process.env;
  if (GITHUB_TOKEN) {
    headers['Authorization'] = 'token ' + GITHUB_TOKEN;
  }
  if (TRAVIS_REPO_SLUG) {
    headers['User-Agent'] = TRAVIS_REPO_SLUG;
  }

  return fetch('https://api.github.com/markdown/raw', {
    method: 'POST',
    headers: headers,
    body: content
  });
}

markdown(process.stdin)
  .then(function (response) {
    if (response.ok) {
      response.body.pipe(process.stdout);
    } else {
      process.exitCode = 1;
      response.body.pipe(process.stderr);
    }
  });
