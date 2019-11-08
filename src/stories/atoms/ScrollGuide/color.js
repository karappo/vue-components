// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import ScrollGuide from '../../../components/atoms/ScrollGuide.vue';


const component = () => {
  return {
    components: { ScrollGuide },
    template: `
      <div style="position: relative; width: 100%; height: calc(100vh - 18px); border: 1px solid #eee;">
        <ScrollGuide gutterColor="rgba(0,0,0,0.1)" highlightColor="#1EA7FD" textColor="#1EA7FD"/>
      </div>
      `
  }
}

export default [readme, component];
