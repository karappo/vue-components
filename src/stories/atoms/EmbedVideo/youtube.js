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
        <iframe width="560" height="315" src="https://www.youtube.com/embed/yl9woQAZQhQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <h3>EmbedVideo</h3>
        <EmbedVideo width="560" height="315" src="https://www.youtube.com/embed/yl9woQAZQhQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></EmbedVideo>
      </div>
    `
  }
}

export default [readme, component];
