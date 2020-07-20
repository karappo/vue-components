// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import ScrollGuide from '../../../components/atoms/ScrollGuide.vue';


const component = () => {
  return {
    components: { ScrollGuide },
    template: `
      <div style="position: relative; width: 100%; height: calc(100vh - 18px); border: 1px solid #eee;">
        <ScrollGuide text="Please scroll!" />
      </div>
      `
  }
}

export default [readme, component];
