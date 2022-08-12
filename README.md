# ⚛ React + Express – SSR Setup with TypeScript

## Features

This project has out-of-the-box support for the following things:

- General Setup

  - [x] Babel 7
  - [x] Webpack 5
  - [x] ESLint 8 (with a set of custom rules that extends Create React App, ESlint recomended, and Testing Library config with some personal flavor added)
  - [x] TypeScript (via Babel)
  - [x] Prettier
  - [ ] Jest
  - [ ] React Testing Library
  - [ ] React i18next for multi language support
  - [x] Server Side Rendering with Express
  - [x] React Fast Refresh
  - [x] CSS Modules
  - [x] PostCSS
  - [x] Precommit hooks via lint-staged + Husky
  - [ ] Optional static build without the need for Node.js on the server
  - [ ] Support for [Storybook](https://storybook.js.org/

- Libs and Dependencies

  - [x] React 18.x (latest), with Hooks!
  - [ ] React i18next for multi language support
  - [ ] Redux + Thunk middleware
  - [ ] Immer
  - [x] React Router 6
  - [x] React Helmet Async
  - [x] @loadable/component

## Installation

As a general recommendation you should create a **fork** of this project first or use GitHub's [use this template](https://github.com/finmavis/webpack-react-ssr/generate) function so you can adjust it to your own needs, add all the dependencies you need and commit everything back into your own repository.

Once you've forked the repository here on Github, clone it, `cd` into the directory and run `yarn` (or `npm install`) on your command line to install all the dependencies. You're ready to go now!

## Usage

There are npm scripts for all the relevant things. The server will always be started on port 3000 unless otherwise specified in `process.env.PORT`. You can use a `.env` file to specify env vars. If you want to use them in your client side code, don't forget to add them in `.env`.

### Noteworthy scripts:

#### `yarn start`

Starts the app in development mode: creates a new client and server dev build using webpack, starts the Express server build (for both file serving and server side pre-rendering) and keeps webpack open in watchmode. Updates the app (if possible) on change using HMR.

#### `yarn build`

Creates a new build, optimized for production. Does **not** start a dev server or anything else.

#### `yarn test`

To be added
Run all tests using jest.

#### `yarn test:update`

To be added
Update all Jest snapshots (if there are any)

#### `yarn lint`

Run ESLint for all JavaScript and TypeScript files

#### `yarn analyze`

To be added
Starts `webpack-bundle-analyzer` to give you the opportunity to analyze your bundle(s)

## Environment Variables

To be added
