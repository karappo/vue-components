// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import AutosizeIframe from '../../../components/atoms/AutosizeIframe.vue';
import './style.sass';

const component = () => {
  return {
    components: { AutosizeIframe },
    template: `
      <div>
        <h3>iframe</h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/gPT7lg5n2Ws" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <h3>AutosizeIframe</h3>
        <AutosizeIframe width="560" height="315" src="https://www.youtube.com/embed/gPT7lg5n2Ws" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></AutosizeIframe>
      </div>
    `
  }
}

export default [readme, component];
