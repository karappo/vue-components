// /* eslint-disable import/no-extraneous-dependencies */
import readme from './README.md';
import { iconOptions, colorOptions, propsDescription } from './_common';
import Button from '../../../components/atoms/Button.vue';
import { text, select, boolean } from '@storybook/addon-knobs';

const component = () => {
  return {
    components: { Button },
    template: `
      <Button width="${text('Width', '')}"
              height="${text('Width', '')}"
              text="${text('Text', 'Edit')}"
              icon="${select('Icon', iconOptions, '')}"
              iconWidth="${text('Icon Width', '')}"
              iconHeight="${text('Icon Height', '')}"
              :disabled="${boolean('Disabled', false)}"
              href="${text('href', '')}"
              :outline="${boolean('Outline Style', false)}"
              :round="${boolean('Round', false)}"
              color="${select('Color', colorOptions, colorOptions.gray)}"
      />
    `,
    propsDescription
  };
};

export default [readme, component];
