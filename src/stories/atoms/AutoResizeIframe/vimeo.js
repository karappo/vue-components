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
        <iframe src="https://player.vimeo.com/video/301539530?color=ffffff&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
        <h3>AutoResizeIframe</h3>
        <AutoResizeIframe src="https://player.vimeo.com/video/301539530?color=ffffff&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></AutoResizeIframe>
      </div>
    `
  }
}

export default [readme, component];
