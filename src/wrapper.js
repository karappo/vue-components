// Import vue component
import AutosizeIframe from './components/atoms/AutosizeIframe.vue';
import ExternalLink from './components/atoms/ExternalLink.vue';
import Img2X from './components/atoms/Img2X.vue';
import MailLink from './components/atoms/MailLink.vue';
import Paragraphs from './components/atoms/Paragraphs.vue';
import ScrollGuide from './components/atoms/ScrollGuide.vue';
import SectionNav from './components/atoms/SectionNav.vue';
import Slider from './components/atoms/Slider.vue';

// Declare install function executed by Vue.use()
export function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component('AutosizeIframe', AutosizeIframe);
	Vue.component('ExternalLink', ExternalLink);
	Vue.component('Img2X', Img2X);
	Vue.component('MailLink', MailLink);
	Vue.component('Paragraphs', Paragraphs);
	Vue.component('ScrollGuide', ScrollGuide);
	Vue.component('SectionNav', SectionNav);
	Vue.component('Slider', Slider);
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export {
  AutosizeIframe,
  ExternalLink,
  Img2X,
  MailLink,
  Paragraphs,
  ScrollGuide,
  SectionNav,
  Slider
};