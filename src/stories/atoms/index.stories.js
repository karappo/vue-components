// /* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import Button from './Button/';
import ButtonExample from './Button/examples';

import ErrorMessage from './ErrorMessage/';

import Input from './Input/';
import InputExample from './Input/examples';

storiesOf('Atoms/Button', module)
  .add('Examples', withReadme(...ButtonExample))
  .add('Basic', withReadme(...Button));

storiesOf('Atoms/ErrorMessage', module)
  .add('Basic', withReadme(...ErrorMessage));

storiesOf('Atoms/Input', module)
  .add('Examples', withReadme(...InputExample))
  .add('Basic', withReadme(...Input));
