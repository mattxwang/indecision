# indecision / in(dd)ecision

[![Netlify Status](https://api.netlify.com/api/v1/badges/1a1eda1c-f577-4930-a907-7290410f5b80/deploy-status)](https://app.netlify.com/sites/inddecision/deploys)

This is a quick lil' web app that's a proof of concept for [rsdd](https://github.com/pmall-neu/rsdd/) + WebAssembly!

(if I keep working on this, expect better docs soon!)

## dev setup

Like most node projects, all you really need to do is:

```
$ npm install
$ npm run dev
```

Astro will spin up a nice lil' local server at [http://localhost:3000/](http://localhost:3000/).

### rebuilding `rsdd`

If you want to update `rsdd`, you need to build it from source.

```
$ git clone git@github.com:pmall-neu/rsdd.git
$ cd rsdd
$ cargo build
$ wasm-pack build
```

The last command will generate a `pkg` directory in `rsdd`. Copy the contents of that directory into the top-level `rsdd` folder here!

## stack

The generic frontend is pretty simple: React + TypeScript running on Astro (which uses Vite). The trickiest part was to get Vite/esbuild to play nicely with WASM, which required a few tries (and looking at tutorials).

Reactflow is used for the diagrams and interactivity; Tailwind is my CSS framework. 
