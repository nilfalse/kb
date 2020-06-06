# node-maxmind in browser

**An experiment of trying to run `node-maxmind` Node.js library in a browser.**

> Spoiler: it's perfectly possible.

Turns out the library has very little dependency on Node.js environment and most of the dependencies can be safely stubbed.

In order to compile it for a browser we will have to use a bundler. Webpack works like a charm in this case.

The main requirement is to have an implementation of the [Node.js Buffer class](https://nodejs.org/api/buffer.html) available in your browser.
Webpack actually provides this by default when you compile your stuff for browser targets, so we can piggy-back on that.

At this point just trying to import the library into your Javascript code and compile that (protip: `$ npx webpack -p`) will throw the following compile-time error:

```
ERROR in ./node_modules/maxmind/lib/ip.js
Module not found: Error: Can't resolve 'net' in '/app/node_modules/maxmind/lib'
 @ ./node_modules/maxmind/lib/ip.js 6:30-44
 @ ./node_modules/maxmind/lib/index.js
 @ ./src/index.js
```

Fixing this is very straightforward: just create a `webpack.config.js` file in the root of your app with the following content.

```js
module.exports = {
  node: {
    net: "empty",
  },
};
```

So far so good. It will now in the same manner start to complain about `"fs"` module. This time it's going to be a little trickier to fix, though. If you just add `fs: 'empty'` key to the `node: {...}` object from above, the compilation will be green, but running the result code will trigger the following error in your browser:

```
TypeError: The "original" argument must be of type Function
```

The thing is, the library not just imports the `"fs"`, but also promisifies some of its methods. The good news is this call to `promisify()` is isolated in it's own internal module which is not required for our browser use case, so we can mock this entire module and call it a day.

In order to do this you should install webpack's `null-loader` (`$ npm i -D null-loader`) and add the following to your `webpack.config.js`:

```js
  module: {
    rules: [
      {
        test: path.resolve(__dirname, './node_modules/maxmind/lib/fs.js'),
        use: 'null-loader',
      },
    ],
  },
```

Note that the webpack documentation claims that `null-loader` is obsolete and there is a more modern way to mock unneeded modules in your dependencies, but for some reason that didn't work for me.

That's actually it, thanks to webpack magic you can now do something along the lines:

```js
import { Buffer } from "buffer";
import { Reader } from "maxmind";

// ...
const response = await fetch("/blob.mmdb");
const buf = Buffer.from(await response.arrayBuffer());
const lookup = new Reader(buf);
// call `lookup.get(ipAsString)` later in your code
```

But there is one more thing. Turns out the library uses some undocumented `Buffer.utf8Slice()` method in its [database decoder implementation](https://github.com/runk/node-maxmind/blob/47e4eb7f/src/decoder.ts#L320-L326). Probably it's done for performance reasons. This method is not available in webpack's implementation of the Buffer, so in order for the above code to work we will have to monkey-patch the `buf` instance by adding this new method before passing it down to the `Reader`.

After all this is done, we will end up with just 2 files. Optionally, you'll also need `package.json`. I created a Github gist with the final contents which you can see below.

https://gist.github.com/nilfalse/d790596bd4728271209d70c9cc2f422f
