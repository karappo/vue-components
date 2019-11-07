// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import ScrollGuide from '../../../components/atoms/ScrollGuide.vue';


const component = () => {
  return {
    components: { ScrollGuide },
    template: `
      <div>
        <ScrollGuide/>
        <br>
        <ScrollGuide color="#cccccc"/>
        <br>
        <ScrollGuide color="#1EA7FD"/>
      </div>
      `
  }
}

export default [readme, component];
