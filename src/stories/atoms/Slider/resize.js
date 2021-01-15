// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import Slider from '../../../components/atoms/Slider.vue';
import img1 from '../../../assets/image/1.jpg';
import img2 from '../../../assets/image/2.jpg';
import img3 from '../../../assets/image/3.jpg';


const component = () => {
  return {
    components: { Slider },

    template: `
    <div style="position: relative; width: 100%; height: calc(100vh - 18px); border: 1px solid #eee;">
      <Slider
        :images="[
          '${img1}',
          '${img2}',
          '${img3}'
        ]"
        width='100%'
        height = '100%'
        offset='100px'
      />
    </div>
    `
  }
}

export default [readme, component];
