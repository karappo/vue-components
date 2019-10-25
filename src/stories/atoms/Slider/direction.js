// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import Slider from '../../../components/atoms/Slider.vue';
import img1 from '../../../assets/img/1.jpg';
import img2 from '../../../assets/img/2.jpg';
import img3 from '../../../assets/img/3.jpg';


const component = () => {
  return {
    components: { Slider },

    template: `
    <div>
      <h2>Up(Default)</h2>
      <Slider
        :images="[
          '${img1}',
          '${img2}',
          '${img3}'
        ]"
        direction='up'
      />
      <h2>Down</h2>
      <Slider
        :images="[
          '${img1}',
          '${img2}',
          '${img3}'
        ]"
        direction='down'
      />
      <h2>Left</h2>
      <Slider
        :images="[
          '${img1}',
          '${img2}',
          '${img3}'
        ]"
        direction='left'
      />
      <h2>Right</h2>
      <Slider
        :images="[
          '${img1}',
          '${img2}',
          '${img3}'
        ]"
        direction='right'
      />
    </div>

    `
  }
}

export default [readme,
   component];
