// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import { iconOptions, propsDescription } from './_common';
import Input from '../../../components/atoms/Input.vue';
import { select, boolean } from '@storybook/addon-knobs';

const component = () => {
  return {
    components: { Input },
    template: `
      <Input
        :skeunomorphism="${boolean('Skeunomorphis', true)}"
        icon="${select('Icon', iconOptions, iconOptions.none)}"
      />
    `,
    propsDescription
  }
}

export default [readme, component];
