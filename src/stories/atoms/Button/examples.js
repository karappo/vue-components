// /* eslint-disable import/no-extraneous-dependencies */
import readme from './README.md';
import { iconOptions, propsDescription } from './_common';
import Button from '../../../components/atoms/Button.vue';

const component = () => {
  return {
    components: { Button },
    template: `
      <div>
        <Button
          text='Cancel'
          width='138px'
          height='32px'
        />
        <Button
          text='Edit'
          width='99px'
          height='32px'
          fontSize='14px'
          :round='true'
          color='black'
        />
        <Button
          text='Follow'
          width='99px'
          height='32px'
          fontSize='14px'
          :round='true'
          color='blue'
        />
        <Button
          text='Unfollow'
          width='99px'
          height='32px'
          fontSize='14px'
          :round='true'
          color='gray'
        />
        <Button
          text='+ Collect'
          width='104px'
          height='30px'
          fontSize='15px'
          color='blue'
        />
        <Button
          icon="${iconOptions.detail}"
          color='black'
          width='36px'
          height='30px'
        />
        <Button
          icon='https://drawwwers.karappo.net/files/img/icon-menu.svg'
          iconHeight='12px'
          :outline='true'
        />
        <Button
          icon='https://drawwwers.karappo.net/files/img/icon-dots.svg'
          iconHeight='4px'
        />
      </div>
    `,
    propsDescription
  };
};

export default [readme, component];
