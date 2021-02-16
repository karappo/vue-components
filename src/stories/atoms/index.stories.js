// /* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import AutosizeIframeVimeo from './AutosizeIframe/vimeo';
import AutosizeIframeYoutube from './AutosizeIframe/youtube';
import ExternalLink from './ExternalLink/';
// import Img2X from './Img2X/'; // TODO
import MailLink from './MailLink/';
import Paragraphs from './Paragraphs/';
// import SectionNav from './SectionNav/'; // TODO
import ScrollGuide from './ScrollGuide/';
import ScrollGuideColor from './ScrollGuide/color';
import ScrollGuideText from './ScrollGuide/text';
import Slider from './Slider/';
import SliderDirection from './Slider/direction';
import SliderResize from './Slider/resize';

storiesOf('Atoms/AutosizeIframe', module)
  .add('Youtube', withReadme(...AutosizeIframeYoutube))
  .add('Vimeo', withReadme(...AutosizeIframeVimeo))
storiesOf('Atoms/ExternalLink', module)
  .add('Basic', withReadme(...ExternalLink))
// TODO
// storiesOf('Atoms/Img2X', module)
//   .add('Basic', withReadme(...Img2X))
storiesOf('Atoms/MailLink', module)
  .add('Basic', withReadme(...MailLink))
storiesOf('Atoms/Paragraphs', module)
  .add('Basic', withReadme(...Paragraphs))
// TODO
// storiesOf('Atoms/SectionNav', module)
//   .add('Basic', withReadme(...SectionNav))
storiesOf('Atoms/ScrollGuide', module)
  .add('Basic', withReadme(...ScrollGuide))
  .add('Text', withReadme(...ScrollGuideText))
  .add('Color', withReadme(...ScrollGuideColor))
storiesOf('Atoms/Slider', module)
  .add('Basic', withReadme(...Slider))
  .add('Direction', withReadme(...SliderDirection))
  .add('Resize', withReadme(...SliderResize))
