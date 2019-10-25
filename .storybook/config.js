/* eslint-disable import/no-extraneous-dependencies */
import { configure, addDecorator, addParameters } from '@storybook/vue';
import { withOptions } from '@storybook/addon-options';
import { configureViewport } from '@storybook/addon-viewport';
import { withInfo } from 'storybook-addon-vue-info';
import { withKnobs } from '@storybook/addon-knobs';
import { create } from '@storybook/theming';

const req = require.context('../src/stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withInfo);
addDecorator(withKnobs);

addParameters({
  info: {
    docsInPanel: true,
  },
  options: {
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    showSearchBox: false,
    panelPosition: 'right',
    sortStoriesByKind: true,
    theme: create({
      brandTitle: 'Karappo Inc.',
      brandImage: 'https://avatars3.githubusercontent.com/u/6602228?s=200&v=4',
      brandUrl: 'TODO'
    })
  }
});

configure(loadStories, module);
