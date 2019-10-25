// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import ErrorMessage from '../../../components/atoms/ErrorMessage.vue';
import { text } from '@storybook/addon-knobs';

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const component = () => {
  return {
    components: { ErrorMessage },
    template: `
      <ErrorMessage/>
    `,
    store: new Vuex.Store({
      state: {
        error: {
          // TODO: DBBのstoreにおいてtext, htmlを消す(slotとして使用するよう変更)
          text: text('Text', 'Error'),
          time: 1497706380259,
        }
      }
    })
  }
}

export default [readme, component];
