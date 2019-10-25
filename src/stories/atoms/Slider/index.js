// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import Slider from '../../../components/atoms/Slider.vue';

const component = () => {
  return {
    components: { Slider },

    template: `
      <Slider
        :images="[
          'https://personal-bio.netlify.com/personal-bio/img/index/slides/day1/1@2x-e413bf6a.jpg',
          'https://personal-bio.netlify.com/personal-bio/img/index/slides/day1/3@2x-cb561e64.jpg',
          'https://personal-bio.netlify.com/personal-bio/img/index/slides/day1/5@2x-ef96f619.jpg',
          'https://personal-bio.netlify.com/personal-bio/img/index/slides/day1/7@2x-9ee7506f.jpg'
        ]"
        width='523px'
        height='698px'
        offset='101px'
      />
    `
  }
}

export default [readme,
   component];
