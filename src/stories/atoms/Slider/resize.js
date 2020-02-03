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
      <Slider
        :images="[
          '${img1}',
          '${img2}',
          '${img3}'
        ]"
        width='100%'
        height = '50vh'
        offset='100px'
      />
    `
  }
}

export default [readme, component];
