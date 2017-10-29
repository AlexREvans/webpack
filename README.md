# Webpack

## Using the project

Requires docker & docker-compose (v3 yml). You can examine the toolchain being used in [Dockerfile](Dockerfile).

Load useful aliases into your session using `source alias`.

To build an example:

   * Run `eg`
   * Enter example number at prompt

For the development example you can run the `webpack-dev-server` using `startdev`.

For the production build example you can:

   * Perform a dev build, run `yarn build:dev`
   * Perform a prod build, run `yarn build:prod`
   * Between each build you can run `yarn deadcode` to test whether the build removed an unused JS function from the last-run bundled output

<hr />

## What's the problem?

Before JavaScript modules were introduced scripts were included in the global window scope and resources were loaded individually.

The number of requests to load all of the scripts for a page was controlled by concatenating a collection of scripts, allowing the browser makes one large request rather than multiple smaller ones.

## Why Webpack?

The introduction of JavaScript modules allows encapsulation of individual scripts.

Webpack allows modules to be included and bundled as part of a concatenated output bundle. This provides the benefits of concatenation whilst maintaining the benefits of using JavaScript modules.

In addition to JavaScript, webpack can also include resources, stylesheets and any other assets into your build bundle. This provides a means of controlling the size and number of assets that make up your built product.

It's key to note that webpack is a build-time tool and doesn't load modules/etc at runtime.

## Why should I use it?

The use of webpack mirrors a more traditional non-web toolchain. For other platforms, an intermediary step between code and the runtime is commonplace. Webpack provides that interface for a web application. It provides a means of determining what goes into your build artifact, optimising the artifact, transpiling and many more.

In addition to the control over the build artifacts, webpack also provides a useful interface for bringing together the increasing number of tools involved in building a web application.

## Key concepts

### Entry

The entrypoint for your application. A "main class", root of your dependency tree.

### Output

A configuration that describes how the dependency graph of your application is brought together to form the build artifacts for your application.

See [Entry & Output example.](src/app/1.entryoutput)

### Loader 

A transformer that takes any type of file and converts it into a form that can be used by webpack (ultimately, JavaScript). A file can be processed by more than one loader before it's ready for consumption by webpack. Examples include:

   * `babel-loader` provides JavaScript transpiling
   * `css-loader` is commonly used with `style-loader`. `css-loader` first finds CSS and converts it to an webpack-understandable JavaScript format (doesn't result in any part of the bundle). `style-loader` then converts the result into a form that will ultimately result in `style` tags in the HTML output


See [Loader example.](src/app/2.loader)

[Further loader information.](https://webpack.js.org/loaders/)

### Plugin

Webpack is built on a plugin system. Even the webpack internals operate using the plugin architecture.

Most operation that you'd want to carry out on your code and resulting artifacts exist as plugins. Examples include uglifying and compression.

See [Plugin example.](src/app/3.plugin)

[Further plugin information.](https://webpack.js.org/plugins/)

## Development

Webpack supports source-mapping and a development server which tracks file changes. This allows for hot-module-replacement (HMR) resulting in instant-in-browser feedback.

See [Development example.](src/app/4.development)

## Production

Webpack is configured by regular JavaScript objects and configuration objects can be merged. As such, common configuration can be split from environment specific configuration and merged together. 

Webpack reccommends maintaining a different webpack configuration for each target environment.

See [Production example.](src/app/5.production)

## How does it work?

Everything in webpack is a plugin.

Webpack is made up of an event emitting system (`Tapable`) and a lifecycle that describes the stages of a webpack build.

Webpack also has instances of `Tapable` that listen to the lifecycle transitions that result in building your bundle.

The core `Tapable` steps involve:

   * A `compiler` (the webpack compiler) 
   * And subsequently a `compilation` (the unit of compilation being performed, the dependency graph)
   * The `resolver` which finds candidate files
   * `Module factories` take a resolved file and produce the specification of a module to be included as part of the build
   * `Parser` parses a module and builds a syntax tree to examine the module for any inclusion or dependencies. Loaders transform non JS to JS (so they'll always have a syntax tree and a means of interrogating dependencies)
   * Finally `templates` dictate how the dependency graph of the compilation tie together to form the build output

Each of these elements are exposed and can be plugged into.

Deep dive: [Everything is a plugin! Mastering webpack from the inside out - Sean Larkin](https://www.youtube.com/watch?v=4tQiJaFzuJ8)

## The fututre?

[Vote on features that are developed next!](https://webpack.js.org/loaders/)

One particularly interesting proposal - WebAssembly support. If supported, you'd be able to include C/C++, Rust, etc files in your source tree. Requiring them would bundle them for use by your application!