// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import Img2X from '../../../components/atoms/Img2X.vue';

const component = () => {
  return {
    components: { Img2X },
    template: `
      <div>
        TODO
      </div>
      `
  }
}

export default [readme, component];
