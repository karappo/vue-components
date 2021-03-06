(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('@karappo-inc/util')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', '@karappo-inc/util'], factory) :
  (global = global || self, factory(global.KarappoVueComponents = {}, global.Vue, global.util));
}(this, (function (exports, Vue, util) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  //

  var script = Vue.extend({
    props: {
    },
    data: function data () {
      return {
        initWidth: null,
        initHeight: null,
        width: null,
        height: null
      }
    },
    computed: {
    },
    mounted: function mounted () {
      // 念の為読み込み時の幅と高さを覚えておく
      this.initWidth = this.$el.getAttribute('width');
      this.initHeight = this.$el.getAttribute('height');
      this.onResize();
    },
    created: function created () {
      window.addEventListener('resize', this.onResize);
    },
    destroyed: function destroyed () {
      window.removeEventListener('resize', this.onResize);
    },
    methods: {
      onResize: function onResize () {
        if (this.width !== this.$el.clientWidth) {
          this.width = this.$el.clientWidth;
          this.height = this.width * (this.initHeight / this.initWidth);
        }
      },
      style: function style () {
        return {
          '--height': ((this.height) + "px")
        }
      }
    }
  });

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("iframe", { style: _vm.style() })
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-ea67c8e0_0", { source: "iframe[data-v-ea67c8e0] {\n  height: var(--height);\n}\n\n/*# sourceMappingURL=AutosizeIframe.vue.map */", map: {"version":3,"sources":["/Users/terada/Sites/vue-components/src/components/atoms/AutosizeIframe.vue","AutosizeIframe.vue"],"names":[],"mappings":"AAKA;EACA,qBAAA;ACJA;;AAEA,6CAA6C","file":"AutosizeIframe.vue","sourcesContent":["<template lang=\"pug\">\niframe(:style=\"style()\")\n</template>\n\n<style lang=\"sass\" scoped>\niframe\n  height: var(--height)\n</style>\n\n<script>\nimport Vue from 'vue'\n\nexport default Vue.extend({\n  props: {\n  },\n  data () {\n    return {\n      initWidth: null,\n      initHeight: null,\n      width: null,\n      height: null\n    }\n  },\n  computed: {\n  },\n  mounted () {\n    // 念の為読み込み時の幅と高さを覚えておく\n    this.initWidth = this.$el.getAttribute('width')\n    this.initHeight = this.$el.getAttribute('height')\n    this.onResize()\n  },\n  created () {\n    window.addEventListener('resize', this.onResize);\n  },\n  destroyed () {\n    window.removeEventListener('resize', this.onResize);\n  },\n  methods: {\n    onResize () {\n      if (this.width !== this.$el.clientWidth) {\n        this.width = this.$el.clientWidth\n        this.height = this.width * (this.initHeight / this.initWidth)\n      }\n    },\n    style () {\n      return {\n        '--height': `${this.height}px`\n      }\n    }\n  }\n})\n</script>\n","iframe {\n  height: var(--height);\n}\n\n/*# sourceMappingURL=AutosizeIframe.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-ea67c8e0";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //

  var script$1 = {
    props: {
      href: {
        type: String,
        required: true
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "a",
      { attrs: { href: _vm.href, target: "_blank", rel: "noopener noreferrer" } },
      [_vm._t("default")],
      2
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    var __vue_inject_styles__$1 = undefined;
    /* scoped */
    var __vue_scope_id__$1 = undefined;
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  //
  //
  //
  //

  var script$2 = {
    props: {
      src: {
        type: String,
        required: true
      }
    },
    methods: {
      _srcset: function _srcset() {
        var srcPath = this.imagePath(this.src);
        var src2x = this.src.replace(/\.(\w+)$/, '@2x.$1');
        var src2xPath = this.imagePath(src2x);
        return (srcPath + " 1x, " + src2xPath + " 2x")
      },
      _src: function _src() {
        return this.imagePath(this.src)
      },
      imagePath: function imagePath(path) {
        return commonjsRequire()
      }
    }
  };

  /* script */
  var __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("img", { attrs: { src: _vm._src(), srcset: _vm._srcset() } })
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    var __vue_inject_styles__$2 = undefined;
    /* scoped */
    var __vue_scope_id__$2 = undefined;
    /* module identifier */
    var __vue_module_identifier__$2 = undefined;
    /* functional template */
    var __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  //
  //
  //

  var script$3 = {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    data: function data() {
      return {
        html: this.to.replace(
          '@',
          '@<span style="display: none;">Anti Spam</span>'
        )
      }
    }
  };

  /* script */
  var __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("a", {
      attrs: {
        href: "mailto:" + _vm.to,
        target: "_blank",
        rel: "noopener noreferrer"
      },
      domProps: { innerHTML: _vm._s(_vm.html) }
    })
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;

    /* style */
    var __vue_inject_styles__$3 = undefined;
    /* scoped */
    var __vue_scope_id__$3 = undefined;
    /* module identifier */
    var __vue_module_identifier__$3 = undefined;
    /* functional template */
    var __vue_is_functional_template__$3 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //

  // 渡されたテキストのうち改行（\n）で区切り、夫々<p></p>で囲って出力する
  var script$4 = {
    props: {
      text: {
        default: 'No text',
        type: String,
        required: true
      }
    },
    computed: {
      paragraphs: function paragraphs() {
        return this.text.split('\n')
      }
    }
  };

  /* script */
  var __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      _vm._l(_vm.paragraphs, function(p) {
        return _c("p", { domProps: { innerHTML: _vm._s(p) } })
      }),
      0
    )
  };
  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;

    /* style */
    var __vue_inject_styles__$4 = undefined;
    /* scoped */
    var __vue_scope_id__$4 = undefined;
    /* module identifier */
    var __vue_module_identifier__$4 = undefined;
    /* functional template */
    var __vue_is_functional_template__$4 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$5 = Vue.extend({
    props: {
      gutterColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0.1)',
        validator: function (value) {
          if (!util.isValidColor(value)) { throw new Error('The prop "gutterColor" should be valid color') }
          return true
        }
      },
      highlightColor: {
        type: String,
        default: 'black',
        validator: function (value) {
          if (!util.isValidColor(value)) { throw new Error('The prop "highlightColor" should be valid color') }
          return true
        }
      },
      text: {
        type: String,
        default: 'SCROLL'
      },
      textColor: {
        type: String,
        default: 'black',
        validator: function (value) {
          if (!util.isValidColor(value)) { throw new Error('The prop "textColor" should be valid color') }
          return true
        }
      }
    },
    computed: {
      styles: function styles () {
        return {
          '--gutter-color': this.gutterColor,
          '--highlight-color': this.highlightColor,
          '--text-color': this.textColor
        }
      }
    },
    methods: {
      click: function click(e) {
        this.$emit('click', e);
      }
    }
  });

  /* script */
  var __vue_script__$5 = script$5;

  /* template */
  var __vue_render__$5 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "scroll_guide_wrap" }, [
      _c(
        "div",
        {
          staticClass: "scroll_guide",
          style: _vm.styles,
          on: { click: _vm.click }
        },
        [_c("span", [_vm._v(_vm._s(_vm.text))]), _c("i")]
      )
    ])
  };
  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;

    /* style */
    var __vue_inject_styles__$5 = function (inject) {
      if (!inject) { return }
      inject("data-v-362d96bb_0", { source: "@keyframes scroll_guide_animation-data-v-362d96bb {\n0% {\n    transform: translate3d(0, -100%, 0);\n}\n15% {\n    transform: translate3d(0, -98%, 0);\n}\n85% {\n    transform: translate3d(0, 98%, 0);\n}\n100% {\n    transform: translate3d(0, 100%, 0);\n}\n}\n.scroll_guide_wrap[data-v-362d96bb] {\n  width: 100%;\n  bottom: 0;\n  position: absolute;\n  display: flex;\n}\n.scroll_guide[data-v-362d96bb] {\n  width: auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  margin: 0 auto;\n  padding: 20px 20px 0 20px;\n  cursor: pointer;\n}\n.scroll_guide span[data-v-362d96bb] {\n  font-size: 12px;\n  letter-spacing: 0.05em;\n  color: var(--text-color);\n}\n.scroll_guide i[data-v-362d96bb] {\n  display: block;\n  width: 2px;\n  height: 47px;\n  margin-top: 18px;\n  background-color: var(--gutter-color);\n  overflow: hidden;\n  position: relative;\n}\n.scroll_guide i[data-v-362d96bb]:before {\n  display: block;\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  background-color: var(--highlight-color);\n  position: absolute;\n  top: 0;\n  left: 0;\n  animation: scroll_guide_animation-data-v-362d96bb 2s infinite normal;\n}\n\n/*# sourceMappingURL=ScrollGuide.vue.map */", map: {"version":3,"sources":["/Users/terada/Sites/vue-components/src/components/atoms/ScrollGuide.vue","ScrollGuide.vue"],"names":[],"mappings":"AAQA;AACA;IACA,mCAAA;ACPE;ADQF;IACA,kCAAA;ACNE;ADOF;IACA,iCAAA;ACLE;ADMF;IACA,kCAAA;ACJE;AACF;ADKA;EACA,WAAA;EACA,SAAA;EACA,kBAAA;EACA,aAAA;ACHA;ADIA;EACA,WAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,sBAAA;EACA,cAAA;EACA,yBAAA;EACA,eAAA;ACDA;ADEA;EACA,eAAA;EACA,sBAAA;EACA,wBAAA;ACAA;ADCA;EACA,cAAA;EACA,UAAA;EACA,YAAA;EACA,gBAAA;EACA,qCAAA;EACA,gBAAA;EACA,kBAAA;ACCA;ADAA;EACA,cAAA;EACA,WAAA;EACA,WAAA;EACA,YAAA;EACA,wCAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,oEAAA;ACEA;;AAEA,0CAA0C","file":"ScrollGuide.vue","sourcesContent":["<template lang=\"pug\">\n.scroll_guide_wrap\n  .scroll_guide(:style=\"styles\" @click=\"click\")\n    span {{ text }}\n    i\n</template>\n\n<style lang=\"sass\" scoped>\n@keyframes scroll_guide_animation\n  0%\n    transform: translate3d(0, -100%, 0)\n  15%\n    transform: translate3d(0, -98%, 0)\n  85%\n    transform: translate3d(0, 98%, 0)\n  100%\n    transform: translate3d(0, 100%, 0)\n\n.scroll_guide_wrap\n  width: 100%\n  bottom: 0\n  position: absolute\n  display: flex\n.scroll_guide\n  width: auto\n  display: flex\n  justify-content: center\n  align-items: center\n  flex-direction: column\n  margin: 0 auto\n  padding: 20px 20px 0 20px\n  cursor: pointer\n  span\n    font-size: 12px\n    letter-spacing: 0.05em\n    color: var(--text-color)\n  i\n    display: block\n    width: 2px\n    height: 47px\n    margin-top: 18px\n    background-color: var(--gutter-color)\n    overflow: hidden\n    position: relative\n    &:before\n      display: block\n      content: ''\n      width: 100%\n      height: 100%\n      background-color: var(--highlight-color)\n      position: absolute\n      top: 0\n      left: 0\n      animation: scroll_guide_animation 2s infinite normal\n</style>\n\n<script>\nimport Vue from 'vue'\nimport { isValidColor } from '@karappo-inc/util'\nexport default Vue.extend({\n  props: {\n    gutterColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.1)',\n      validator: (value) => {\n        if (!isValidColor(value)) throw new Error('The prop \"gutterColor\" should be valid color')\n        return true\n      }\n    },\n    highlightColor: {\n      type: String,\n      default: 'black',\n      validator: (value) => {\n        if (!isValidColor(value)) throw new Error('The prop \"highlightColor\" should be valid color')\n        return true\n      }\n    },\n    text: {\n      type: String,\n      default: 'SCROLL'\n    },\n    textColor: {\n      type: String,\n      default: 'black',\n      validator: (value) => {\n        if (!isValidColor(value)) throw new Error('The prop \"textColor\" should be valid color')\n        return true\n      }\n    }\n  },\n  computed: {\n    styles () {\n      return {\n        '--gutter-color': this.gutterColor,\n        '--highlight-color': this.highlightColor,\n        '--text-color': this.textColor\n      }\n    }\n  },\n  methods: {\n    click(e) {\n      this.$emit('click', e)\n    }\n  }\n})\n</script>","@keyframes scroll_guide_animation {\n  0% {\n    transform: translate3d(0, -100%, 0);\n  }\n  15% {\n    transform: translate3d(0, -98%, 0);\n  }\n  85% {\n    transform: translate3d(0, 98%, 0);\n  }\n  100% {\n    transform: translate3d(0, 100%, 0);\n  }\n}\n.scroll_guide_wrap {\n  width: 100%;\n  bottom: 0;\n  position: absolute;\n  display: flex;\n}\n\n.scroll_guide {\n  width: auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  margin: 0 auto;\n  padding: 20px 20px 0 20px;\n  cursor: pointer;\n}\n.scroll_guide span {\n  font-size: 12px;\n  letter-spacing: 0.05em;\n  color: var(--text-color);\n}\n.scroll_guide i {\n  display: block;\n  width: 2px;\n  height: 47px;\n  margin-top: 18px;\n  background-color: var(--gutter-color);\n  overflow: hidden;\n  position: relative;\n}\n.scroll_guide i:before {\n  display: block;\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  background-color: var(--highlight-color);\n  position: absolute;\n  top: 0;\n  left: 0;\n  animation: scroll_guide_animation 2s infinite normal;\n}\n\n/*# sourceMappingURL=ScrollGuide.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$5 = "data-v-362d96bb";
    /* module identifier */
    var __vue_module_identifier__$5 = undefined;
    /* functional template */
    var __vue_is_functional_template__$5 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      false,
      createInjector,
      undefined,
      undefined
    );

  //

  var script$6 = Vue.extend({
    props: {
      links: {
        type: Array,
        default: function () { return [] }
      }
    },
    data: function () {
      return {
        tooltipText: '',
        tooltipY: null,
        targets: [] // リンク先の一覧
      }
    },
    mounted: function () {
      window.addEventListener('scroll', this.onScroll);
      this.targets = this.links.map(function (item) { return item.target }).reverse();
    },
    methods: {
      showTooltip: function showTooltip (e) {
        this.tooltipText = e.target.dataset.tooltip;
        this.tooltipY = (e.target.getBoundingClientRect().top - 10) + "px";
      },
      hideTooltip: function hideTooltip () {
        this.tooltipY = null;
      },
      onScroll: function onScroll () {
        var this$1 = this;

        this.$el.querySelectorAll('a').forEach(function (el) { el.classList.remove('current');});
        // 後ろから順にチェックしていく
        this.targets.forEach(function (item) {
          var target = document.querySelector(item);
          var targetTop = window.pageYOffset + target.getBoundingClientRect().top - document.querySelector('header').getBoundingClientRect().height;
          if (targetTop <= window.scrollY) {
            this$1.$el.querySelector(("a[href='" + item + "']")).classList.add('current');
            return true
          }
        });
      }
    }
  });

  /* script */
  var __vue_script__$6 = script$6;

  /* template */
  var __vue_render__$6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "section_nav" }, [
      _vm.tooltipY
        ? _c("div", { staticClass: "tooltip", style: { top: _vm.tooltipY } }, [
            _c(
              "svg",
              { attrs: { width: "8", height: "9", viewBox: "0 0 8 9" } },
              [
                _c("path", {
                  attrs: {
                    "data-name": "多角形",
                    d: "M4.5,0,9,8H0Z",
                    transform: "translate(8) rotate(90)"
                  }
                })
              ]
            ),
            _c("span", [_vm._v(_vm._s(_vm.tooltipText))])
          ])
        : _vm._e(),
      _c("div", { staticClass: "wrap" }, [
        _c(
          "nav",
          _vm._l(_vm.links, function(item) {
            return _c("a", {
              attrs: { href: item.target, "data-tooltip": item.title },
              on: { mouseover: _vm.showTooltip, mouseleave: _vm.hideTooltip }
            })
          }),
          0
        )
      ])
    ])
  };
  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;

    /* style */
    var __vue_inject_styles__$6 = function (inject) {
      if (!inject) { return }
      inject("data-v-2b01fd58_0", { source: ".section_nav[data-v-2b01fd58] {\n  z-index: 100;\n  position: fixed;\n  top: 0;\n  right: 32px;\n}\n.wrap[data-v-2b01fd58] {\n  right: 32px;\n  top: 0;\n  height: 100vh;\n  position: fixed;\n}\nnav[data-v-2b01fd58] {\n  position: absolute;\n  right: 0;\n  top: 50%;\n  height: 100%;\n  transform: translate(-50%, 0);\n}\na[data-v-2b01fd58] {\n  text-decoration: none;\n  display: block;\n  width: 8px;\n  height: 8px;\n  border-radius: 5px;\n  background-color: white;\n  border: 1px solid #A8A8A8;\n}\na[data-v-2b01fd58]:not(:first-child) {\n  margin-top: 9px;\n}\na.current[data-v-2b01fd58] {\n  background-color: #2E43F0;\n  border-color: #2E43F0;\n}\n.tooltip[data-v-2b01fd58] {\n  background-color: black;\n  padding: 10px 14px 9px;\n  border-radius: 2px;\n  font-size: 11px;\n  font-weight: 900;\n  line-height: 1em;\n  position: relative;\n  margin-right: 5px;\n  right: 25px;\n  display: inline-block;\n  color: white;\n}\n.tooltip svg[data-v-2b01fd58] {\n  position: absolute;\n  right: -8px;\n  top: calc(50% - 4.5px);\n}\n\n/*# sourceMappingURL=SectionNav.vue.map */", map: {"version":3,"sources":["/Users/terada/Sites/vue-components/src/components/atoms/SectionNav.vue","SectionNav.vue"],"names":[],"mappings":"AAYA;EACA,YAAA;EACA,eAAA;EACA,MAAA;EACA,WAAA;ACXA;ADYA;EACA,WAAA;EACA,MAAA;EACA,aAAA;EACA,eAAA;ACTA;ADUA;EACA,kBAAA;EACA,QAAA;EACA,QAAA;EACA,YAAA;EACA,6BAAA;ACPA;ADQA;EACA,qBAAA;EACA,cAAA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;EACA,uBAAA;EACA,yBAAA;ACLA;ADMA;EACA,eAAA;ACJA;ADKA;EACA,yBAAA;EACA,qBAAA;ACHA;ADIA;EACA,uBAAA;EACA,sBAAA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,gBAAA;EACA,kBAAA;EACA,iBAAA;EACA,WAAA;EACA,qBAAA;EACA,YAAA;ACDA;ADEA;EACA,kBAAA;EACA,WAAA;EACA,sBAAA;ACAA;;AAEA,yCAAyC","file":"SectionNav.vue","sourcesContent":["<template lang=\"pug\">\n.section_nav\n  .tooltip(v-if=\"tooltipY\" :style=\"{top: tooltipY}\")\n    svg(width=\"8\" height=\"9\" viewBox=\"0 0 8 9\")\n      path(data-name=\"多角形\" d=\"M4.5,0,9,8H0Z\" transform=\"translate(8) rotate(90)\")\n    span {{ tooltipText }}\n  .wrap\n    nav\n      a(v-for=\"item in links\" :href=\"item.target\" @mouseover=\"showTooltip\" @mouseleave=\"hideTooltip\" :data-tooltip=\"item.title\")\n</template>\n\n<style lang=\"sass\" scoped>\n.section_nav\n  z-index: 100\n  position: fixed\n  top: 0\n  right: 32px\n.wrap\n  right: 32px\n  top: 0\n  height: 100vh\n  position: fixed\nnav\n  position: absolute\n  right: 0\n  top: 50%\n  height: 100%\n  transform: translate(-50%, 0)\na\n  text-decoration: none\n  display: block\n  width: 8px\n  height: 8px\n  border-radius: 5px\n  background-color: white\n  border: 1px solid #A8A8A8\n  &:not(:first-child)\n    margin-top: 9px\n  &.current\n    background-color: #2E43F0\n    border-color: #2E43F0\n.tooltip\n  background-color: black\n  padding: 10px 14px 9px\n  border-radius: 2px\n  font-size: 11px\n  font-weight: 900\n  line-height: 1em\n  position: relative\n  margin-right: 5px\n  right: 25px\n  display: inline-block\n  color: white\n  svg\n    position: absolute\n    right: -8px\n    top: calc(50% - 4.5px)\n</style>\n\n<script>\nimport Vue from 'vue'\n\nexport default Vue.extend({\n  props: {\n    links: {\n      type: Array,\n      default: () => { return [] }\n    }\n  },\n  data: () => {\n    return {\n      tooltipText: '',\n      tooltipY: null,\n      targets: [] // リンク先の一覧\n    }\n  },\n  mounted: function () {\n    window.addEventListener('scroll', this.onScroll)\n    this.targets = this.links.map((item) => { return item.target }).reverse()\n  },\n  methods: {\n    showTooltip (e) {\n      this.tooltipText = e.target.dataset.tooltip\n      this.tooltipY = `${e.target.getBoundingClientRect().top - 10}px`\n    },\n    hideTooltip () {\n      this.tooltipY = null\n    },\n    onScroll () {\n      this.$el.querySelectorAll('a').forEach((el) => { el.classList.remove('current')})\n      // 後ろから順にチェックしていく\n      this.targets.forEach((item) => {\n        const target = document.querySelector(item)\n        const targetTop = window.pageYOffset + target.getBoundingClientRect().top - document.querySelector('header').getBoundingClientRect().height\n        if (targetTop <= window.scrollY) {\n          this.$el.querySelector(`a[href='${item}']`).classList.add('current')\n          return true\n        }\n      })\n    }\n  }\n})\n</script>\n",".section_nav {\n  z-index: 100;\n  position: fixed;\n  top: 0;\n  right: 32px;\n}\n\n.wrap {\n  right: 32px;\n  top: 0;\n  height: 100vh;\n  position: fixed;\n}\n\nnav {\n  position: absolute;\n  right: 0;\n  top: 50%;\n  height: 100%;\n  transform: translate(-50%, 0);\n}\n\na {\n  text-decoration: none;\n  display: block;\n  width: 8px;\n  height: 8px;\n  border-radius: 5px;\n  background-color: white;\n  border: 1px solid #A8A8A8;\n}\na:not(:first-child) {\n  margin-top: 9px;\n}\na.current {\n  background-color: #2E43F0;\n  border-color: #2E43F0;\n}\n\n.tooltip {\n  background-color: black;\n  padding: 10px 14px 9px;\n  border-radius: 2px;\n  font-size: 11px;\n  font-weight: 900;\n  line-height: 1em;\n  position: relative;\n  margin-right: 5px;\n  right: 25px;\n  display: inline-block;\n  color: white;\n}\n.tooltip svg {\n  position: absolute;\n  right: -8px;\n  top: calc(50% - 4.5px);\n}\n\n/*# sourceMappingURL=SectionNav.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$6 = "data-v-2b01fd58";
    /* module identifier */
    var __vue_module_identifier__$6 = undefined;
    /* functional template */
    var __vue_is_functional_template__$6 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      false,
      createInjector,
      undefined,
      undefined
    );

  //

  var script$7 = Vue.extend({
    props: {
      images: {
        type: Array,
        default: function () { return [] }
      },
      duration: {
        type: Number,
        default: 3000
      },
      // トランジッションの方向
      direction: {
        type: String,
        default: 'up',
        validator: function (v) { return ['up', 'down', 'left', 'right'].includes(v) }
      },
      // 表示領域のサイズ
      width: {
        type: String,
        default: '400px',
        validator: function (value) {
          if (!/[px|%|vw|vh]$/.test(value)) { throw new Error('The prop "width" should be end with "px" or "%"') }
          return true
        }
      },
      height: {
        type: String,
        default: '300px',
        validator: function (value) {
          if (!/[px|%|vw|vh]$/.test(value)) { throw new Error('The prop "height" should be end with "px" or "%"') }
          return true
        }
      },
      // 画像の幅（高さ）- 表示領域の幅（高さ）
      offset: {
        type: String,
        default: '50px',
        validator: function (value) {
          if (!/px$/.test(value)) { throw new Error('The prop "offset" should be end with "px"') }
          if (parseInt(value, 10) < 0) { throw new Error('The prop "offset" must be positive') }
          return true
        }
      }
    },
    data: function () {
      return {
        activeIndex: 0,
        timer: null,
        widthInPixels: '0px',
        heightInPixels: '0px',
        orientation: null,
        imageSizes: new Array(this.images.length),
        imageSizesCompleted: false
      }
    },
    computed: {
      slideCount: function () {
        return this.images.length
      },
      // DOM順序を変えずにz-indexで表示を切り替えるため、一つ前の画像のz-indexも必要
      oneBeforeIndex: function () {
        if (this.activeIndex === 0) {
          return this.slideCount - 1
        } else {
          return this.activeIndex - 1
        }
      }
    },
    mounted: function () {
      var this$1 = this;

      var rest = this.images.length;
      this.images.forEach(function (item, index) {
        var img = new Image();
        img.onload = function () {
          this$1.imageSizes[index] = {
            width: img.width,
            height: img.height
          };
          rest--;
          if (rest == 0) {
            this$1.setImageBackgroundSize();
          }
        };
        img.src = item;
      });
      this.timer = setInterval(this.switchSlide, this.duration);
      window.addEventListener('resize', this.onWindowResize);
      this.onWindowResize();
    },
    beforeDestroy: function () {
      clearInterval(this.timer);
    },
    methods: {
      onWindowResize: function onWindowResize () {
        this.widthInPixels = (this.$el.clientWidth) + "px";
        this.heightInPixels = (this.$el.clientHeight) + "px";
        this.orientation = this.getOrientation(this.$el.clientWidth, this.$el.clientHeight);
        this.setImageBackgroundSize();
      },
      setImageBackgroundSize: function setImageBackgroundSize () {
        var this$1 = this;

        this.images.forEach(function (item, index) {
          // offset分も加味して、必要なだけ引き伸ばしたとすると必要な幅高さが得られるかを調べる
          // 縦方向のトランジッション
          var imageSize = this$1.imageSizes[index];
          if (imageSize) {
            var el = this$1.$refs[("image-" + index)][0];
            if (['up', 'down'].includes(this$1.direction)) {
              var calcWidth = imageSize.width * ((this$1.$el.clientHeight + parseInt(this$1.offset, 10)) / imageSize.height);
              el.style.backgroundSize = calcWidth < this$1.$el.clientWidth ? '100% auto' : 'auto calc(100% + var(--offset))';
            }
            // 横方向のトランジッション
            else {
              var calcHeight = imageSize.height * ((this$1.$el.clientWidth + parseInt(this$1.offset, 10)) / imageSize.width);
              el.style.backgroundSize = calcHeight < this$1.$el.clientHeight ? 'auto 100%' : 'calc(100% + var(--offset)) auto';
            }
          }
        });
      },
      slidesStyle: function slidesStyle () {
        return {
          '--offset': this.offset,
          '--width': this.width,
          '--height': this.height,
          '--width_px': this.widthInPixels,
          '--height_px': this.heightInPixels
        }
      },
      slideClass: function slideClass (index) {
        return {
          active: this.activeIndex === index,
          oneBefore: this.oneBeforeIndex === index,
          moving: this.activeIndex === index || this.oneBeforeIndex === index
        }
      },
      switchSlide: function switchSlide () {
        if (this.slideCount - 1 <= this.activeIndex) {
          this.activeIndex = 0;
        } else {
          this.activeIndex++;
        }
      },
      getOrientation: function getOrientation (width, height) {
        if (width && height) {
          return (parseInt(width, 10) < parseInt(height, 10)) ? 'portrait' : 'landscape'
        }
      }
    }
  });

  /* script */
  var __vue_script__$7 = script$7;

  /* template */
  var __vue_render__$7 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "slides",
        style: _vm.slidesStyle(),
        attrs: {
          "data-direction": _vm.direction,
          "data-orientation": _vm.orientation
        }
      },
      _vm._l(_vm.images, function(item, index) {
        return _c(
          "div",
          { key: index, staticClass: "slide", class: _vm.slideClass(index) },
          [
            _c("div", {
              ref: "image-" + index,
              refInFor: true,
              staticClass: "image",
              style: { backgroundImage: "url(" + item + ")" }
            })
          ]
        )
      }),
      0
    )
  };
  var __vue_staticRenderFns__$7 = [];
  __vue_render__$7._withStripped = true;

    /* style */
    var __vue_inject_styles__$7 = function (inject) {
      if (!inject) { return }
      inject("data-v-7c87db41_0", { source: "@keyframes appear_vertical-data-v-7c87db41 {\n0% {\n    height: 0%;\n}\n100% {\n    height: 100%;\n}\n}\n@keyframes appear_horizontal-data-v-7c87db41 {\n0% {\n    width: 0%;\n}\n100% {\n    width: 100%;\n}\n}\n@keyframes moving_up-data-v-7c87db41 {\n0% {\n    background-position: center 0;\n}\n100% {\n    background-position: center calc(var(--offset) * -1);\n}\n}\n@keyframes moving_down-data-v-7c87db41 {\n0% {\n    background-position: center calc(var(--offset) * -1);\n}\n100% {\n    background-position: center 0;\n}\n}\n@keyframes moving_left-data-v-7c87db41 {\n0% {\n    background-position: 0 center;\n}\n100% {\n    background-position: calc(var(--offset) * -1) center;\n}\n}\n@keyframes moving_right-data-v-7c87db41 {\n0% {\n    background-position: calc(var(--offset) * -1) center;\n}\n100% {\n    background-position: 0 center;\n}\n}\n.slides[data-v-7c87db41] {\n  position: relative;\n  width: var(--width);\n  height: var(--height);\n}\n.slides .slide[data-v-7c87db41] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  z-index: 0;\n}\n.slides .slide.active[data-v-7c87db41] {\n  z-index: 2;\n  animation-duration: 1s;\n}\n.slides .slide.moving .image[data-v-7c87db41] {\n  animation-duration: 5s;\n  animation-timing-function: linear;\n  animation-fill-mode: forwards;\n}\n.slides .slide.oneBefore[data-v-7c87db41] {\n  z-index: 1;\n}\n.slides .slide .image[data-v-7c87db41] {\n  position: absolute;\n  width: var(--width_px);\n  height: var(--height_px);\n  background-repeat: no-repeat;\n  background-position: center;\n}\n.slides[data-direction=up] .slide[data-v-7c87db41],\n.slides[data-direction=up] .image[data-v-7c87db41] {\n  bottom: 0;\n}\n.slides[data-direction=up] .slide.moving .image[data-v-7c87db41] {\n  animation-name: moving_up-data-v-7c87db41;\n}\n.slides[data-direction=down] .slide[data-v-7c87db41],\n.slides[data-direction=down] .image[data-v-7c87db41] {\n  top: 0;\n}\n.slides[data-direction=down] .slide.moving .image[data-v-7c87db41] {\n  animation-name: moving_down-data-v-7c87db41;\n}\n.slides[data-direction=left] .slide[data-v-7c87db41],\n.slides[data-direction=left] .image[data-v-7c87db41] {\n  right: 0;\n}\n.slides[data-direction=left] .slide.moving .image[data-v-7c87db41] {\n  animation-name: moving_left-data-v-7c87db41;\n}\n.slides[data-direction=right] .slide[data-v-7c87db41],\n.slides[data-direction=right] .image[data-v-7c87db41] {\n  left: 0;\n}\n.slides[data-direction=right] .slide.moving .image[data-v-7c87db41] {\n  animation-name: moving_right-data-v-7c87db41;\n}\n.slides[data-direction=up] .slide.active[data-v-7c87db41], .slides[data-direction=down] .slide.active[data-v-7c87db41] {\n  animation-name: appear_vertical-data-v-7c87db41;\n}\n.slides[data-direction=left] .slide[data-v-7c87db41],\n.slides[data-direction=left] .image[data-v-7c87db41] {\n  right: 0;\n}\n.slides[data-direction=right] .slide[data-v-7c87db41],\n.slides[data-direction=right] .image[data-v-7c87db41] {\n  left: 0;\n}\n.slides[data-direction=left] .slide.active[data-v-7c87db41], .slides[data-direction=right] .slide.active[data-v-7c87db41] {\n  animation-name: appear_horizontal-data-v-7c87db41;\n}\n\n/*# sourceMappingURL=Slider.vue.map */", map: {"version":3,"sources":["/Users/terada/Sites/vue-components/src/components/atoms/Slider.vue","Slider.vue"],"names":[],"mappings":"AAOA;AACA;IACA,UAAA;ACNE;ADOF;IACA,YAAA;ACLE;AACF;ADKA;AACA;IACA,SAAA;ACHE;ADIF;IACA,WAAA;ACFE;AACF;ADGA;AACA;IACA,6BAAA;ACDE;ADEF;IACA,oDAAA;ACAE;AACF;ADAA;AACA;IACA,oDAAA;ACEE;ADDF;IACA,6BAAA;ACGE;AACF;ADHA;AACA;IACA,6BAAA;ACKE;ADJF;IACA,oDAAA;ACME;AACF;ADNA;AACA;IACA,oDAAA;ACQE;ADPF;IACA,6BAAA;ACSE;AACF;ADNA;EACA,kBAAA;EACA,mBAAA;EACA,qBAAA;ACQA;ADPA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;EACA,UAAA;ACSA;ADRA;EACA,UAAA;EACA,sBAAA;ACUA;ADRA;EACA,sBAAA;EACA,iCAAA;EACA,6BAAA;ACUA;ADTA;EACA,UAAA;ACWA;ADVA;EACA,kBAAA;EACA,sBAAA;EACA,wBAAA;EACA,4BAAA;EACA,2BAAA;ACYA;ADVA;;EAEA,SAAA;ACYA;ADVA;EACA,yCAAA;ACYA;ADVA;;EAEA,MAAA;ACYA;ADVA;EACA,2CAAA;ACYA;ADVA;;EAEA,QAAA;ACYA;ADVA;EACA,2CAAA;ACYA;ADVA;;EAEA,OAAA;ACYA;ADVA;EACA,4CAAA;ACYA;ADTA;EACA,+CAAA;ACWA;ADTA;;EAEA,QAAA;ACWA;ADTA;;EAEA,OAAA;ACWA;ADRA;EACA,iDAAA;ACUA;;AAEA,qCAAqC","file":"Slider.vue","sourcesContent":["<template lang=\"pug\">\n.slides(:data-direction=\"direction\" :data-orientation=\"orientation\" :style=\"slidesStyle()\")\n  .slide(v-for=\"(item, index) in images\" :class=\"slideClass(index)\" :key=\"index\")\n    .image(:style=\"{ backgroundImage: `url(${item})` }\" :ref=\"`image-${index}`\")\n</template>\n\n<style lang=\"sass\" scoped>\n@keyframes appear_vertical\n  0%\n    height: 0%\n  100%\n    height: 100%\n@keyframes appear_horizontal\n  0%\n    width: 0%\n  100%\n    width: 100%\n\n@keyframes moving_up\n  0%\n    background-position: center 0\n  100%\n    background-position: center calc(var(--offset) * -1)\n@keyframes moving_down\n  0%\n    background-position: center calc(var(--offset) * -1)\n  100%\n    background-position: center 0\n@keyframes moving_left\n  0%\n    background-position: 0 center\n  100%\n    background-position: calc(var(--offset) * -1) center\n@keyframes moving_right\n  0%\n    background-position: calc(var(--offset) * -1) center\n  100%\n    background-position: 0 center\n\n// TODO スライドの数が２のときに、movingクラスがなくなることがないために、一度animationが終了すると次回activeになっても最初からアニメーションがスタートしない問題がある\n// .active > .moving のときに、keyframe=0%から再スタートできるとよい\n.slides\n  position: relative\n  width: var(--width)\n  height: var(--height)\n  .slide\n    position: absolute\n    width: 100%\n    height: 100%\n    overflow: hidden\n    z-index: 0\n    &.active\n      z-index: 2\n      animation-duration: 1s\n    &.moving\n      .image\n        animation-duration: 5s\n        animation-timing-function: linear\n        animation-fill-mode: forwards\n    &.oneBefore\n      z-index: 1\n    .image\n      position: absolute\n      width: var(--width_px)\n      height: var(--height_px)\n      background-repeat: no-repeat\n      background-position: center\n  &[data-direction=\"up\"]\n    .slide,\n    .image\n      bottom: 0\n    .slide.moving\n      .image\n        animation-name: moving_up\n  &[data-direction=\"down\"]\n    .slide,\n    .image\n      top: 0\n    .slide.moving\n      .image\n        animation-name: moving_down\n  &[data-direction=\"left\"]\n    .slide,\n    .image\n      right: 0\n    .slide.moving\n      .image\n        animation-name: moving_left\n  &[data-direction=\"right\"]\n    .slide,\n    .image\n      left: 0\n    .slide.moving\n      .image\n        animation-name: moving_right\n  &[data-direction=\"up\"],\n  &[data-direction=\"down\"]\n    .slide.active\n      animation-name: appear_vertical\n  &[data-direction=\"left\"]\n    .slide,\n    .image\n      right: 0\n  &[data-direction=\"right\"]\n    .slide,\n    .image\n      left: 0\n  &[data-direction=\"left\"],\n  &[data-direction=\"right\"]\n    .slide.active\n      animation-name: appear_horizontal\n</style>\n\n<script>\nimport Vue from 'vue'\n\nexport default Vue.extend({\n  props: {\n    images: {\n      type: Array,\n      default: () => { return [] }\n    },\n    duration: {\n      type: Number,\n      default: 3000\n    },\n    // トランジッションの方向\n    direction: {\n      type: String,\n      default: 'up',\n      validator: (v) => { return ['up', 'down', 'left', 'right'].includes(v) }\n    },\n    // 表示領域のサイズ\n    width: {\n      type: String,\n      default: '400px',\n      validator: (value) => {\n        if (!/[px|%|vw|vh]$/.test(value)) throw new Error('The prop \"width\" should be end with \"px\" or \"%\"')\n        return true\n      }\n    },\n    height: {\n      type: String,\n      default: '300px',\n      validator: (value) => {\n        if (!/[px|%|vw|vh]$/.test(value)) throw new Error('The prop \"height\" should be end with \"px\" or \"%\"')\n        return true\n      }\n    },\n    // 画像の幅（高さ）- 表示領域の幅（高さ）\n    offset: {\n      type: String,\n      default: '50px',\n      validator: (value) => {\n        if (!/px$/.test(value)) throw new Error('The prop \"offset\" should be end with \"px\"')\n        if (parseInt(value, 10) < 0) throw new Error('The prop \"offset\" must be positive')\n        return true\n      }\n    }\n  },\n  data: function () {\n    return {\n      activeIndex: 0,\n      timer: null,\n      widthInPixels: '0px',\n      heightInPixels: '0px',\n      orientation: null,\n      imageSizes: new Array(this.images.length),\n      imageSizesCompleted: false\n    }\n  },\n  computed: {\n    slideCount: function () {\n      return this.images.length\n    },\n    // DOM順序を変えずにz-indexで表示を切り替えるため、一つ前の画像のz-indexも必要\n    oneBeforeIndex: function () {\n      if (this.activeIndex === 0) {\n        return this.slideCount - 1\n      } else {\n        return this.activeIndex - 1\n      }\n    }\n  },\n  mounted: function () {\n    let rest = this.images.length\n    this.images.forEach((item, index) => {\n      let img = new Image();\n      img.onload = () => {\n        this.imageSizes[index] = {\n          width: img.width,\n          height: img.height\n        }\n        rest--\n        if (rest == 0) {\n          this.setImageBackgroundSize()\n        }\n      }\n      img.src = item\n    })\n    this.timer = setInterval(this.switchSlide, this.duration)\n    window.addEventListener('resize', this.onWindowResize)\n    this.onWindowResize()\n  },\n  beforeDestroy: function () {\n    clearInterval(this.timer)\n  },\n  methods: {\n    onWindowResize () {\n      this.widthInPixels = `${this.$el.clientWidth}px`\n      this.heightInPixels = `${this.$el.clientHeight}px`\n      this.orientation = this.getOrientation(this.$el.clientWidth, this.$el.clientHeight)\n      this.setImageBackgroundSize()\n    },\n    setImageBackgroundSize () {\n      this.images.forEach((item, index) => {\n        // offset分も加味して、必要なだけ引き伸ばしたとすると必要な幅高さが得られるかを調べる\n        // 縦方向のトランジッション\n        const imageSize = this.imageSizes[index]\n        if (imageSize) {\n          const el = this.$refs[`image-${index}`][0]\n          if (['up', 'down'].includes(this.direction)) {\n            let calcWidth = imageSize.width * ((this.$el.clientHeight + parseInt(this.offset, 10)) / imageSize.height)\n            el.style.backgroundSize = calcWidth < this.$el.clientWidth ? '100% auto' : 'auto calc(100% + var(--offset))'\n          }\n          // 横方向のトランジッション\n          else {\n            let calcHeight = imageSize.height * ((this.$el.clientWidth + parseInt(this.offset, 10)) / imageSize.width)\n            el.style.backgroundSize = calcHeight < this.$el.clientHeight ? 'auto 100%' : 'calc(100% + var(--offset)) auto'\n          }\n        }\n      })\n    },\n    slidesStyle () {\n      return {\n        '--offset': this.offset,\n        '--width': this.width,\n        '--height': this.height,\n        '--width_px': this.widthInPixels,\n        '--height_px': this.heightInPixels\n      }\n    },\n    slideClass (index) {\n      return {\n        active: this.activeIndex === index,\n        oneBefore: this.oneBeforeIndex === index,\n        moving: this.activeIndex === index || this.oneBeforeIndex === index\n      }\n    },\n    switchSlide () {\n      if (this.slideCount - 1 <= this.activeIndex) {\n        this.activeIndex = 0\n      } else {\n        this.activeIndex++\n      }\n    },\n    getOrientation (width, height) {\n      if (width && height) {\n        return (parseInt(width, 10) < parseInt(height, 10)) ? 'portrait' : 'landscape'\n      }\n    }\n  }\n})\n</script>\n","@keyframes appear_vertical {\n  0% {\n    height: 0%;\n  }\n  100% {\n    height: 100%;\n  }\n}\n@keyframes appear_horizontal {\n  0% {\n    width: 0%;\n  }\n  100% {\n    width: 100%;\n  }\n}\n@keyframes moving_up {\n  0% {\n    background-position: center 0;\n  }\n  100% {\n    background-position: center calc(var(--offset) * -1);\n  }\n}\n@keyframes moving_down {\n  0% {\n    background-position: center calc(var(--offset) * -1);\n  }\n  100% {\n    background-position: center 0;\n  }\n}\n@keyframes moving_left {\n  0% {\n    background-position: 0 center;\n  }\n  100% {\n    background-position: calc(var(--offset) * -1) center;\n  }\n}\n@keyframes moving_right {\n  0% {\n    background-position: calc(var(--offset) * -1) center;\n  }\n  100% {\n    background-position: 0 center;\n  }\n}\n.slides {\n  position: relative;\n  width: var(--width);\n  height: var(--height);\n}\n.slides .slide {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  z-index: 0;\n}\n.slides .slide.active {\n  z-index: 2;\n  animation-duration: 1s;\n}\n.slides .slide.moving .image {\n  animation-duration: 5s;\n  animation-timing-function: linear;\n  animation-fill-mode: forwards;\n}\n.slides .slide.oneBefore {\n  z-index: 1;\n}\n.slides .slide .image {\n  position: absolute;\n  width: var(--width_px);\n  height: var(--height_px);\n  background-repeat: no-repeat;\n  background-position: center;\n}\n.slides[data-direction=up] .slide,\n.slides[data-direction=up] .image {\n  bottom: 0;\n}\n.slides[data-direction=up] .slide.moving .image {\n  animation-name: moving_up;\n}\n.slides[data-direction=down] .slide,\n.slides[data-direction=down] .image {\n  top: 0;\n}\n.slides[data-direction=down] .slide.moving .image {\n  animation-name: moving_down;\n}\n.slides[data-direction=left] .slide,\n.slides[data-direction=left] .image {\n  right: 0;\n}\n.slides[data-direction=left] .slide.moving .image {\n  animation-name: moving_left;\n}\n.slides[data-direction=right] .slide,\n.slides[data-direction=right] .image {\n  left: 0;\n}\n.slides[data-direction=right] .slide.moving .image {\n  animation-name: moving_right;\n}\n.slides[data-direction=up] .slide.active, .slides[data-direction=down] .slide.active {\n  animation-name: appear_vertical;\n}\n.slides[data-direction=left] .slide,\n.slides[data-direction=left] .image {\n  right: 0;\n}\n.slides[data-direction=right] .slide,\n.slides[data-direction=right] .image {\n  left: 0;\n}\n.slides[data-direction=left] .slide.active, .slides[data-direction=right] .slide.active {\n  animation-name: appear_horizontal;\n}\n\n/*# sourceMappingURL=Slider.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$7 = "data-v-7c87db41";
    /* module identifier */
    var __vue_module_identifier__$7 = undefined;
    /* functional template */
    var __vue_is_functional_template__$7 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Import vue component

  // Declare install function executed by Vue.use()
  function install(Vue) {
  	if (install.installed) { return; }
  	install.installed = true;
  	Vue.component('AutosizeIframe', __vue_component__);
  	Vue.component('ExternalLink', __vue_component__$1);
  	Vue.component('Img2X', __vue_component__$2);
  	Vue.component('MailLink', __vue_component__$3);
  	Vue.component('Paragraphs', __vue_component__$4);
  	Vue.component('ScrollGuide', __vue_component__$5);
  	Vue.component('SectionNav', __vue_component__$6);
  	Vue.component('Slider', __vue_component__$7);
  }

  // Create module definition for Vue.use()
  var plugin = {
  	install: install,
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
  	GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
  	GlobalVue = global.Vue;
  }
  if (GlobalVue) {
  	GlobalVue.use(plugin);
  }

  exports.AutosizeIframe = __vue_component__;
  exports.ExternalLink = __vue_component__$1;
  exports.Img2X = __vue_component__$2;
  exports.MailLink = __vue_component__$3;
  exports.Paragraphs = __vue_component__$4;
  exports.ScrollGuide = __vue_component__$5;
  exports.SectionNav = __vue_component__$6;
  exports.Slider = __vue_component__$7;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
