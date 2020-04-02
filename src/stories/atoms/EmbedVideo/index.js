// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import EmbedVideo from '../../../components/atoms/EmbedVideo.vue';
import './style.sass';

const component = () => {
  return {
    components: { EmbedVideo },
    template: `
      <div>
        <h2>Youtube</h2>
        <EmbedVideo width="560" height="315" src="https://www.youtube.com/embed/yl9woQAZQhQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></EmbedVideo>
        <h2>Vimeo</h2>
        <!-- <b>はデフォルトでも勝手にリサイズしてくれるので、このコンポーネントを使う必要はありません！</b> -->
        <EmbedVideo src="https://player.vimeo.com/video/301539530?color=ffffff&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></EmbedVideo>
      </div>
    `
  }
}

export default [readme, component];
