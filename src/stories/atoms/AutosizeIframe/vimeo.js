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
        <iframe src="https://player.vimeo.com/video/301539530?color=ffffff&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
        <h3>AutosizeIframe</h3>
        <AutosizeIframe src="https://player.vimeo.com/video/301539530?color=ffffff&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></AutosizeIframe>
      </div>
    `
  }
}

export default [readme, component];
