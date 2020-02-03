// /* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import Slider from './Slider/';
import SliderDirection from './Slider/direction';
import ScrollGuide from './ScrollGuide/';
import ScrollGuideColor from './ScrollGuide/color';

storiesOf('Atoms/Slider', module)
  .add('Basic', withReadme(...Slider))
  .add('Direction', withReadme(...SliderDirection))

storiesOf('Atoms/ScrollGuide', module)
  .add('Basic', withReadme(...ScrollGuide))
  .add('Color', withReadme(...ScrollGuideColor))