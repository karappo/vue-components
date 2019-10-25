// /* eslint-disable import/no-extraneous-dependencies */
import readme from './README.md';
import { propsDescription } from './_common';
import Input from '../../../components/atoms/Input.vue';

const component = () => {
  return {
    components: { Input },
    template: `
      <div>
        <Input />
        <Input
          placeholder='Placeholder'
        />
        <Input
          type='password'
          placeholder='Password'
        />
      </div>
    `,
    propsDescription
  }
}

export default [readme, component];
