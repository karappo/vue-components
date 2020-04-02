// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import AutoResizeIframe from '../../../components/atoms/AutoResizeIframe.vue';
import './style.sass';

const component = () => {
  return {
    components: { AutoResizeIframe },
    template: `
      <div>
        <h3>iframe</h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/gPT7lg5n2Ws" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <h3>AutoResizeIframe</h3>
        <AutoResizeIframe width="560" height="315" src="https://www.youtube.com/embed/gPT7lg5n2Ws" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></AutoResizeIframe>
      </div>
    `
  }
}

export default [readme, component];
