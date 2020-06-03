(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = global || self, factory(global.Slider = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  //

  var script = Vue.extend({
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
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-0571800b_0", { source: "@keyframes appear_vertical-data-v-0571800b {\n0% {\n    height: 0%;\n}\n100% {\n    height: 100%;\n}\n}\n@keyframes appear_horizontal-data-v-0571800b {\n0% {\n    width: 0%;\n}\n100% {\n    width: 100%;\n}\n}\n@keyframes moving_up-data-v-0571800b {\n0% {\n    background-position: center 0;\n}\n100% {\n    background-position: center calc(var(--offset) * -1);\n}\n}\n@keyframes moving_down-data-v-0571800b {\n0% {\n    background-position: center calc(var(--offset) * -1);\n}\n100% {\n    background-position: center 0;\n}\n}\n@keyframes moving_left-data-v-0571800b {\n0% {\n    background-position: 0 center;\n}\n100% {\n    background-position: calc(var(--offset) * -1) center;\n}\n}\n@keyframes moving_right-data-v-0571800b {\n0% {\n    background-position: calc(var(--offset) * -1) center;\n}\n100% {\n    background-position: 0 center;\n}\n}\n.slides[data-v-0571800b] {\n  position: relative;\n  width: var(--width);\n  height: var(--height);\n}\n.slides .slide[data-v-0571800b] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  z-index: 0;\n}\n.slides .slide.active[data-v-0571800b] {\n  z-index: 2;\n  animation-duration: 1s;\n}\n.slides .slide.moving .image[data-v-0571800b] {\n  animation-duration: 5s;\n  animation-timing-function: linear;\n  animation-fill-mode: forwards;\n}\n.slides .slide.oneBefore[data-v-0571800b] {\n  z-index: 1;\n}\n.slides .slide .image[data-v-0571800b] {\n  position: absolute;\n  width: var(--width_px);\n  height: var(--height_px);\n  background-repeat: no-repeat;\n  background-position: center;\n}\n.slides[data-direction=up] .slide[data-v-0571800b],\n.slides[data-direction=up] .image[data-v-0571800b] {\n  bottom: 0;\n}\n.slides[data-direction=up] .slide.moving .image[data-v-0571800b] {\n  animation-name: moving_up-data-v-0571800b;\n}\n.slides[data-direction=down] .slide[data-v-0571800b],\n.slides[data-direction=down] .image[data-v-0571800b] {\n  top: 0;\n}\n.slides[data-direction=down] .slide.moving .image[data-v-0571800b] {\n  animation-name: moving_down-data-v-0571800b;\n}\n.slides[data-direction=left] .slide[data-v-0571800b],\n.slides[data-direction=left] .image[data-v-0571800b] {\n  right: 0;\n}\n.slides[data-direction=left] .slide.moving .image[data-v-0571800b] {\n  animation-name: moving_left-data-v-0571800b;\n}\n.slides[data-direction=right] .slide[data-v-0571800b],\n.slides[data-direction=right] .image[data-v-0571800b] {\n  left: 0;\n}\n.slides[data-direction=right] .slide.moving .image[data-v-0571800b] {\n  animation-name: moving_right-data-v-0571800b;\n}\n.slides[data-direction=up] .slide.active[data-v-0571800b], .slides[data-direction=down] .slide.active[data-v-0571800b] {\n  animation-name: appear_vertical-data-v-0571800b;\n}\n.slides[data-direction=left] .slide[data-v-0571800b],\n.slides[data-direction=left] .image[data-v-0571800b] {\n  right: 0;\n}\n.slides[data-direction=right] .slide[data-v-0571800b],\n.slides[data-direction=right] .image[data-v-0571800b] {\n  left: 0;\n}\n.slides[data-direction=left] .slide.active[data-v-0571800b], .slides[data-direction=right] .slide.active[data-v-0571800b] {\n  animation-name: appear_horizontal-data-v-0571800b;\n}\n\n/*# sourceMappingURL=Slider.vue.map */", map: {"version":3,"sources":["/Users/terada/Sites/personal-bio/vue-components/src/components/atoms/Slider.vue","Slider.vue"],"names":[],"mappings":"AAOA;AACA;IACA,UAAA;ACNE;ADOF;IACA,YAAA;ACLE;AACF;ADKA;AACA;IACA,SAAA;ACHE;ADIF;IACA,WAAA;ACFE;AACF;ADGA;AACA;IACA,6BAAA;ACDE;ADEF;IACA,oDAAA;ACAE;AACF;ADAA;AACA;IACA,oDAAA;ACEE;ADDF;IACA,6BAAA;ACGE;AACF;ADHA;AACA;IACA,6BAAA;ACKE;ADJF;IACA,oDAAA;ACME;AACF;ADNA;AACA;IACA,oDAAA;ACQE;ADPF;IACA,6BAAA;ACSE;AACF;ADNA;EACA,kBAAA;EACA,mBAAA;EACA,qBAAA;ACQA;ADPA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;EACA,UAAA;ACSA;ADRA;EACA,UAAA;EACA,sBAAA;ACUA;ADRA;EACA,sBAAA;EACA,iCAAA;EACA,6BAAA;ACUA;ADTA;EACA,UAAA;ACWA;ADVA;EACA,kBAAA;EACA,sBAAA;EACA,wBAAA;EACA,4BAAA;EACA,2BAAA;ACYA;ADVA;;EAEA,SAAA;ACYA;ADVA;EACA,yCAAA;ACYA;ADVA;;EAEA,MAAA;ACYA;ADVA;EACA,2CAAA;ACYA;ADVA;;EAEA,QAAA;ACYA;ADVA;EACA,2CAAA;ACYA;ADVA;;EAEA,OAAA;ACYA;ADVA;EACA,4CAAA;ACYA;ADTA;EACA,+CAAA;ACWA;ADTA;;EAEA,QAAA;ACWA;ADTA;;EAEA,OAAA;ACWA;ADRA;EACA,iDAAA;ACUA;;AAEA,qCAAqC","file":"Slider.vue","sourcesContent":["<template lang=\"pug\">\n.slides(:data-direction=\"direction\" :data-orientation=\"orientation\" :style=\"slidesStyle()\")\n  .slide(v-for=\"(item, index) in images\" :class=\"slideClass(index)\" :key=\"index\")\n    .image(:style=\"{ backgroundImage: `url(${item})` }\" :ref=\"`image-${index}`\")\n</template>\n\n<style lang=\"sass\" scoped>\n@keyframes appear_vertical\n  0%\n    height: 0%\n  100%\n    height: 100%\n@keyframes appear_horizontal\n  0%\n    width: 0%\n  100%\n    width: 100%\n\n@keyframes moving_up\n  0%\n    background-position: center 0\n  100%\n    background-position: center calc(var(--offset) * -1)\n@keyframes moving_down\n  0%\n    background-position: center calc(var(--offset) * -1)\n  100%\n    background-position: center 0\n@keyframes moving_left\n  0%\n    background-position: 0 center\n  100%\n    background-position: calc(var(--offset) * -1) center\n@keyframes moving_right\n  0%\n    background-position: calc(var(--offset) * -1) center\n  100%\n    background-position: 0 center\n\n// TODO スライドの数が２のときに、movingクラスがなくなることがないために、一度animationが終了すると次回activeになっても最初からアニメーションがスタートしない問題がある\n// .active > .moving のときに、keyframe=0%から再スタートできるとよい\n.slides\n  position: relative\n  width: var(--width)\n  height: var(--height)\n  .slide\n    position: absolute\n    width: 100%\n    height: 100%\n    overflow: hidden\n    z-index: 0\n    &.active\n      z-index: 2\n      animation-duration: 1s\n    &.moving\n      .image\n        animation-duration: 5s\n        animation-timing-function: linear\n        animation-fill-mode: forwards\n    &.oneBefore\n      z-index: 1\n    .image\n      position: absolute\n      width: var(--width_px)\n      height: var(--height_px)\n      background-repeat: no-repeat\n      background-position: center\n  &[data-direction=\"up\"]\n    .slide,\n    .image\n      bottom: 0\n    .slide.moving\n      .image\n        animation-name: moving_up\n  &[data-direction=\"down\"]\n    .slide,\n    .image\n      top: 0\n    .slide.moving\n      .image\n        animation-name: moving_down\n  &[data-direction=\"left\"]\n    .slide,\n    .image\n      right: 0\n    .slide.moving\n      .image\n        animation-name: moving_left\n  &[data-direction=\"right\"]\n    .slide,\n    .image\n      left: 0\n    .slide.moving\n      .image\n        animation-name: moving_right\n  &[data-direction=\"up\"],\n  &[data-direction=\"down\"]\n    .slide.active\n      animation-name: appear_vertical\n  &[data-direction=\"left\"]\n    .slide,\n    .image\n      right: 0\n  &[data-direction=\"right\"]\n    .slide,\n    .image\n      left: 0\n  &[data-direction=\"left\"],\n  &[data-direction=\"right\"]\n    .slide.active\n      animation-name: appear_horizontal\n</style>\n\n<script>\nimport Vue from 'vue'\n\nexport default Vue.extend({\n  props: {\n    images: {\n      type: Array,\n      default: () => { return [] }\n    },\n    duration: {\n      type: Number,\n      default: 3000\n    },\n    // トランジッションの方向\n    direction: {\n      type: String,\n      default: 'up',\n      validator: (v) => { return ['up', 'down', 'left', 'right'].includes(v) }\n    },\n    // 表示領域のサイズ\n    width: {\n      type: String,\n      default: '400px',\n      validator: (value) => {\n        if (!/[px|%|vw|vh]$/.test(value)) throw new Error('The prop \"width\" should be end with \"px\" or \"%\"')\n        return true\n      }\n    },\n    height: {\n      type: String,\n      default: '300px',\n      validator: (value) => {\n        if (!/[px|%|vw|vh]$/.test(value)) throw new Error('The prop \"height\" should be end with \"px\" or \"%\"')\n        return true\n      }\n    },\n    // 画像の幅（高さ）- 表示領域の幅（高さ）\n    offset: {\n      type: String,\n      default: '50px',\n      validator: (value) => {\n        if (!/px$/.test(value)) throw new Error('The prop \"offset\" should be end with \"px\"')\n        if (parseInt(value, 10) < 0) throw new Error('The prop \"offset\" must be positive')\n        return true\n      }\n    }\n  },\n  data: function () {\n    return {\n      activeIndex: 0,\n      timer: null,\n      widthInPixels: '0px',\n      heightInPixels: '0px',\n      orientation: null,\n      imageSizes: new Array(this.images.length),\n      imageSizesCompleted: false\n    }\n  },\n  computed: {\n    slideCount: function () {\n      return this.images.length\n    },\n    // DOM順序を変えずにz-indexで表示を切り替えるため、一つ前の画像のz-indexも必要\n    oneBeforeIndex: function () {\n      if (this.activeIndex === 0) {\n        return this.slideCount - 1\n      } else {\n        return this.activeIndex - 1\n      }\n    }\n  },\n  mounted: function () {\n    let rest = this.images.length\n    this.images.forEach((item, index) => {\n      let img = new Image();\n      img.onload = () => {\n        this.imageSizes[index] = {\n          width: img.width,\n          height: img.height\n        }\n        rest--\n        if (rest == 0) {\n          this.setImageBackgroundSize()\n        }\n      }\n      img.src = item\n    })\n    this.timer = setInterval(this.switchSlide, this.duration)\n    window.addEventListener('resize', this.onWindowResize)\n    this.onWindowResize()\n  },\n  beforeDestroy: function () {\n    clearInterval(this.timer)\n  },\n  methods: {\n    onWindowResize () {\n      this.widthInPixels = `${this.$el.clientWidth}px`\n      this.heightInPixels = `${this.$el.clientHeight}px`\n      this.orientation = this.getOrientation(this.$el.clientWidth, this.$el.clientHeight)\n      this.setImageBackgroundSize()\n    },\n    setImageBackgroundSize () {\n      this.images.forEach((item, index) => {\n        // offset分も加味して、必要なだけ引き伸ばしたとすると必要な幅高さが得られるかを調べる\n        // 縦方向のトランジッション\n        const imageSize = this.imageSizes[index]\n        if (imageSize) {\n          const el = this.$refs[`image-${index}`][0]\n          if (['up', 'down'].includes(this.direction)) {\n            let calcWidth = imageSize.width * ((this.$el.clientHeight + parseInt(this.offset, 10)) / imageSize.height)\n            el.style.backgroundSize = calcWidth < this.$el.clientWidth ? '100% auto' : 'auto calc(100% + var(--offset))'\n          }\n          // 横方向のトランジッション\n          else {\n            let calcHeight = imageSize.height * ((this.$el.clientWidth + parseInt(this.offset, 10)) / imageSize.width)\n            el.style.backgroundSize = calcHeight < this.$el.clientHeight ? 'auto 100%' : 'calc(100% + var(--offset)) auto'\n          }\n        }\n      })\n    },\n    slidesStyle () {\n      return {\n        '--offset': this.offset,\n        '--width': this.width,\n        '--height': this.height,\n        '--width_px': this.widthInPixels,\n        '--height_px': this.heightInPixels\n      }\n    },\n    slideClass (index) {\n      return {\n        active: this.activeIndex === index,\n        oneBefore: this.oneBeforeIndex === index,\n        moving: this.activeIndex === index || this.oneBeforeIndex === index\n      }\n    },\n    switchSlide () {\n      if (this.slideCount - 1 <= this.activeIndex) {\n        this.activeIndex = 0\n      } else {\n        this.activeIndex++\n      }\n    },\n    getOrientation (width, height) {\n      if (width && height) {\n        return (parseInt(width, 10) < parseInt(height, 10)) ? 'portrait' : 'landscape'\n      }\n    }\n  }\n})\n</script>\n","@keyframes appear_vertical {\n  0% {\n    height: 0%;\n  }\n  100% {\n    height: 100%;\n  }\n}\n@keyframes appear_horizontal {\n  0% {\n    width: 0%;\n  }\n  100% {\n    width: 100%;\n  }\n}\n@keyframes moving_up {\n  0% {\n    background-position: center 0;\n  }\n  100% {\n    background-position: center calc(var(--offset) * -1);\n  }\n}\n@keyframes moving_down {\n  0% {\n    background-position: center calc(var(--offset) * -1);\n  }\n  100% {\n    background-position: center 0;\n  }\n}\n@keyframes moving_left {\n  0% {\n    background-position: 0 center;\n  }\n  100% {\n    background-position: calc(var(--offset) * -1) center;\n  }\n}\n@keyframes moving_right {\n  0% {\n    background-position: calc(var(--offset) * -1) center;\n  }\n  100% {\n    background-position: 0 center;\n  }\n}\n.slides {\n  position: relative;\n  width: var(--width);\n  height: var(--height);\n}\n.slides .slide {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  z-index: 0;\n}\n.slides .slide.active {\n  z-index: 2;\n  animation-duration: 1s;\n}\n.slides .slide.moving .image {\n  animation-duration: 5s;\n  animation-timing-function: linear;\n  animation-fill-mode: forwards;\n}\n.slides .slide.oneBefore {\n  z-index: 1;\n}\n.slides .slide .image {\n  position: absolute;\n  width: var(--width_px);\n  height: var(--height_px);\n  background-repeat: no-repeat;\n  background-position: center;\n}\n.slides[data-direction=up] .slide,\n.slides[data-direction=up] .image {\n  bottom: 0;\n}\n.slides[data-direction=up] .slide.moving .image {\n  animation-name: moving_up;\n}\n.slides[data-direction=down] .slide,\n.slides[data-direction=down] .image {\n  top: 0;\n}\n.slides[data-direction=down] .slide.moving .image {\n  animation-name: moving_down;\n}\n.slides[data-direction=left] .slide,\n.slides[data-direction=left] .image {\n  right: 0;\n}\n.slides[data-direction=left] .slide.moving .image {\n  animation-name: moving_left;\n}\n.slides[data-direction=right] .slide,\n.slides[data-direction=right] .image {\n  left: 0;\n}\n.slides[data-direction=right] .slide.moving .image {\n  animation-name: moving_right;\n}\n.slides[data-direction=up] .slide.active, .slides[data-direction=down] .slide.active {\n  animation-name: appear_vertical;\n}\n.slides[data-direction=left] .slide,\n.slides[data-direction=left] .image {\n  right: 0;\n}\n.slides[data-direction=right] .slide,\n.slides[data-direction=right] .image {\n  left: 0;\n}\n.slides[data-direction=left] .slide.active, .slides[data-direction=right] .slide.active {\n  animation-name: appear_horizontal;\n}\n\n/*# sourceMappingURL=Slider.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-0571800b";
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

  // Import vue component

  // Declare install function executed by Vue.use()
  function install(Vue) {
  	if (install.installed) { return; }
  	install.installed = true;
  	Vue.component('Slider', __vue_component__);
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

  exports.default = __vue_component__;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
