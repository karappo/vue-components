// /* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import { themes } from '@storybook/theming';

import Slider from './Slider/';
import SliderDirection from './Slider/direction';
import ScrollGuide from './ScrollGuide/';

storiesOf('Atoms/Slider', module)
  .add('Basic', withReadme(...Slider))
  .add('Direction', withReadme(...SliderDirection))

storiesOf('Atoms/ScrollGuide', module)
  // .addParameters({ options: { theme: themes.dark } })
  .add('Basic', withReadme(...ScrollGuide))