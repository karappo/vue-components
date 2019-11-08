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
        <ScrollGuide gutterColor="rgba(0,0,0,0.1)" highlightColor="#333" textColor="rgba(0,0,0,0.1)"/>
        <br>
        <ScrollGuide gutterColor="#CCC" highlightColor="#1EA7FD" textColor="#1EA7FD"/>
      </div>
      `
  }
}

export default [readme, component];
