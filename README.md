# Vue Components

Vue components by Karappo Inc.

[![npm](https://nodei.co/npm/@karappo-inc/vue-components.png?mini=true)](https://www.npmjs.com/package/@karappo-inc/vue-components)
[![Netlify Status](https://api.netlify.com/api/v1/badges/8d34d1a8-b9d9-427e-9cd3-837b18e0663e/deploy-status)](https://app.netlify.com/sites/karappo-vue-components/deploys)

```sh
npm install @karappo-inc/vue-components
```

## For users

```js
import {
  AutosizeIframe,
  SectionNav,
  ScrollGuide,
  Slider
} from '@karappo-inc/vue-components'
```

*[ Under construction ]*

See our [storybook](https://karappo-vue-components.netlify.app/) to know usage.

## For developers

### Notice

Don't use these syntax for IE11

- `for in` or `for of`
- Default arguments

### Project setup
```sh
yarn setup
```

#### Compiles and hot-reloads for development
```sh
yarn start
```
or
```sh
yarn serve:storybook
```

#### Compiles and minifies for production
```sh
yarn build:storybook
```

#### Lints and fixes files
```sh
yarn lint
```

#### Publish to npm registory
```sh
yarn build
npm login
npm publish --access=public .
```
