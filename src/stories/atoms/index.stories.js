// /* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import Input from './Input/';
import InputExample from './Input/examples';

import Slider from './Slider/';

storiesOf('Atoms/Input', module)
  .add('Examples', withReadme(...InputExample))
  .add('Basic', withReadme(...Input));

storiesOf('Atoms/Slider', module)
  .add('Basic', withReadme(...Slider));