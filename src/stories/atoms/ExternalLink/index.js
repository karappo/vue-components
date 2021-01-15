// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import ExternalLink from '../../../components/atoms/ExternalLink.vue';


const component = () => {
  return {
    components: { ExternalLink },
    template: `
      <div style="position: relative; width: 100%; height: calc(100vh - 18px); border: 1px solid #eee;">
        <ExternalLink href="https://karappo.net">This is external link</ExternalLink>
      </div>
      `
  }
}

export default [readme, component];
