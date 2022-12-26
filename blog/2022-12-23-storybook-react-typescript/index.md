---
slug: setup-storybook-react-typescript
title: 'How to setup Storybook + React + Typescript + Webpack'
authors: andres
tags: [React, Storybook, React, Typescript, Webpack]
keywords: [React, Typescript, Storybook, Webpack]
---

Storybook is by far one of the best tools to build components in an isolated manner without the need of external dependencies. Together combined with Typescript and Webpack we can leverage a powerful development workflow. You can find the source code [here](https://github.com/devandres-tech/react-webpack-ts-storybook-setup) - Let's go through the steps to setup it up.

<!-- truncate  -->

## Install React & Typescript

Possibly, the most feasible way to install Typescript and React is to run:

```bash
npx create-react-app <MY_APP> --template typescript
```

This will scaffold a React project with the necessary dependencies to support Typescript.
Let's add the `"outDir": "./dist/"` config option so webpack is aware of the transpiled TS files:

```json title="tsconfig.json"
 "outDir": "./dist/"
```

and let's set the `noEmit` config option to `false`:

```json title="tsconfig.json"
 "noEmit": false,
```

Your `tsconfig` file should look like the following:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "es5",
    // highlight-next-line
    "outDir": "./dist/",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    // highlight-next-line
    "noEmit": false,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

## Install Storybook

As per [Storybook](https://storybook.js.org/docs/react/get-started/install) docs, it is not made for empty projects, you must have a project already bootstrapped with a framework. Run the following in your root directory:

```bash
npx storybook init
```

this will install the necessary dependencies, setup scripts to run and build Storybook, and create boilerplate stories.
To verify this is working correctly, firstly, build your app and run the following command:

```bash
npm run storybook
```

![contact logic](./stobyook-init.png)
If it builds successfully you will be greeted with a welcome message. Now you can use Typescript to build Stories. Next, let's setup Webpack.

## Webpack Setup

In your root directory run the following command to install `webpack` and the `webpack-cli`:

:::caution

The minimum supported Node.js version to run Webpack 5 is 10.13.0 (LTS)

:::

```bash
npm install webpack webpack-cli --save-dev
```

### Config setup

First let's install the Typescript compiler and loader by running:

```bash
npm install --save-dev typescript ts-loader
```

Now let's create a basic Webpack config file, create `webpack.config.js` in your root dir and put the following (depending on your setup, if you don't already have one):

```js title="webpack.config.js"
const path = require('path')
const prod =
  (process.env.NODE_ENV ? process.env.NODE_ENV : '').trim() === 'production'

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: prod ? 'production' : 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}
```

### Loading CSS

To load CSS files within Javascript modules, we need to install `style-loader` and `css-loader` and add the loaders to our webpack config file:

```bash
npm install --save-dev style-loader css-loader
```

```js title="webpack.config.js"
...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // highlight-start
        // rule to load CSS
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      // highlight-end
    ],
  },
...
```

### Loading images

We are able to load our CSS now let's add a loader to load images, in Webpack 5, we can easily incorporate them by using the built-in **_Asset Module_** functionality:

```js title="webpack.config.js"
...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // rule to load CSS
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
       // highlight-start
      // rule to load images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // highlight-end
    ],
  },
...
```

### Loading HTML

To load our html file we need to install the `html-webpack-plugin` and add them to our webpack config plugins section:

```bash
npm install --save-dev html-webpack-plugin
```

```js title="webpack.config.js"
const path = require('path')
const prod =
  (process.env.NODE_ENV ? process.env.NODE_ENV : '').trim() === 'production'
// highlight-next-line
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // rule to load css
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // rule to load images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  mode: prod ? 'production' : 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  // highlight-start
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico',
    }),
  ],
  // highlight-end
}
```

### NPM Scripts

To automate building our project for development purposes, let's create a NPM script in your `package.json` file:

```json
"build:webpack": "webpack"
```

now your package.json scripts section should look like the following:

```json title="package.json"
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "storybook": "start-storybook -p 6006 -s public",
    "build-storybook": "build-storybook -s public",
     // highlight-next-line
    "build:webpack": "webpack serve --mode development --config webpack.config.js --open"
  },
```

Let's test this is building correctly by running:

```bash
npm run build:webpack
```

If built successfully, it should open a web browser and your command prompt should output something similar:

```bash
  ...
  modules by path ./src/*.css 6.27 KiB
    ./src/index.css 2.25 KiB [built] [code generated]
    ./node_modules/css-loader/dist/cjs.js!./src/index.css 805 bytes [built] [code generated]
    ./src/App.css 2.24 KiB [built] [code generated]
    ./node_modules/css-loader/dist/cjs.js!./src/App.css 1 KiB [built] [code generated]
  modules by path ./src/*.tsx 1.54 KiB
    ./src/index.tsx 575 bytes [built] [code generated]
    ./src/App.tsx 1000 bytes [built] [code generated]
  ./src/reportWebVitals.ts 492 bytes [built] [code generated]
  ./src/logo.svg 42 bytes (javascript) 2.57 KiB (asset) [built] [code generated]
webpack 5.75.0 compiled successfully in 1755 ms
```

Now we can use TypeScript, build Storybook components, and build our project in development mode all happening simultaneously. In another post we will setup a development and production environment as the configuration differs greatly. We will follow best practices for each environment. Thanks and happy hacking!
