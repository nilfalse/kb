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

markdown(process.stdin)
  .then(function (response) {
    if (response.ok) {
      response.body.pipe(process.stdout);
    } else {
      response.body.pipe(process.stderr)
        .on('end', function () {
          process.exit(1);
        });
    }
  });
