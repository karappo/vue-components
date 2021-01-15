// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import MailLink from '../../../components/atoms/MailLink.vue';


const component = () => {
  return {
    components: { MailLink },
    template: `
      <div>
        <MailLink to="hello@example.com">hello@example.com</MailLink>
      </div>
      `
  }
}

export default [readme, component];
