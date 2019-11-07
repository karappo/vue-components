// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import ScrollGuide from '../../../components/atoms/ScrollGuide.vue';


const component = () => {
  return {
    components: { ScrollGuide },
    template: `
      <ScrollGuide/>
    `
  }
}

export default [readme,
   component];
