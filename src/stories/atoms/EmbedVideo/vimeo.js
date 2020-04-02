// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import EmbedVideo from '../../../components/atoms/EmbedVideo.vue';
import './style.sass';

const component = () => {
  return {
    components: { EmbedVideo },
    template: `
      <div>
        <h3>Default</h3>
        <iframe src="https://player.vimeo.com/video/301539530?color=ffffff&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
        <h3>EmbedVideo</h3>
        <EmbedVideo src="https://player.vimeo.com/video/301539530?color=ffffff&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></EmbedVideo>
      </div>
    `
  }
}

export default [readme, component];
