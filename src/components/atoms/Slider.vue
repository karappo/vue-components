<template lang="pug">
.slides(:data-direction="direction" :data-orientation="orientation" :style="slidesStyle()")
  .slide(v-for="(item, index) in images" :class="slideClass(index)" :key="index")
    .image(:style="{ backgroundImage: `url(${item})` }" :ref="`image-${index}`")
</template>

<style lang="sass" scoped>
@keyframes appear_vertical
  0%
    height: 0%
  100%
    height: 100%
@keyframes appear_horizontal
  0%
    width: 0%
  100%
    width: 100%

@keyframes moving_up
  0%
    background-position: center 0
  100%
    background-position: center calc(var(--offset) * -1)
@keyframes moving_down
  0%
    background-position: center calc(var(--offset) * -1)
  100%
    background-position: center 0
@keyframes moving_left
  0%
    background-position: 0 center
  100%
    background-position: calc(var(--offset) * -1) center
@keyframes moving_right
  0%
    background-position: calc(var(--offset) * -1) center
  100%
    background-position: 0 center

// TODO スライドの数が２のときに、movingクラスがなくなることがないために、一度animationが終了すると次回activeになっても最初からアニメーションがスタートしない問題がある
// .active > .moving のときに、keyframe=0%から再スタートできるとよい
.slides
  position: relative
  width: var(--width)
  height: var(--height)
  .slide
    position: absolute
    width: 100%
    height: 100%
    overflow: hidden
    z-index: 0
    &.active
      z-index: 2
      animation-duration: 1s
    &.moving
      .image
        animation-duration: 5s
        animation-timing-function: linear
        animation-fill-mode: forwards
    &.oneBefore
      z-index: 1
    .image
      position: absolute
      width: var(--width_px)
      height: var(--height_px)
      background-repeat: no-repeat
      background-position: center
  &[data-direction="up"]
    .slide,
    .image
      bottom: 0
    .slide.moving
      .image
        animation-name: moving_up
  &[data-direction="down"]
    .slide,
    .image
      top: 0
    .slide.moving
      .image
        animation-name: moving_down
  &[data-direction="left"]
    .slide,
    .image
      right: 0
    .slide.moving
      .image
        animation-name: moving_left
  &[data-direction="right"]
    .slide,
    .image
      left: 0
    .slide.moving
      .image
        animation-name: moving_right
  &[data-direction="up"],
  &[data-direction="down"]
    .slide.active
      animation-name: appear_vertical
  &[data-direction="left"]
    .slide,
    .image
      right: 0
  &[data-direction="right"]
    .slide,
    .image
      left: 0
  &[data-direction="left"],
  &[data-direction="right"]
    .slide.active
      animation-name: appear_horizontal
</style>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    images: {
      type: Array,
      default: () => { return [] }
    },
    duration: {
      type: Number,
      default: 3000
    },
    // トランジッションの方向
    direction: {
      type: String,
      default: 'up',
      validator: (v) => { return ['up', 'down', 'left', 'right'].includes(v) }
    },
    // 表示領域のサイズ
    width: {
      type: String,
      default: '400px',
      validator: (value) => {
        if (!/[px|%|vw|vh]$/.test(value)) throw new Error('The prop "width" should be end with "px" or "%"')
        return true
      }
    },
    height: {
      type: String,
      default: '300px',
      validator: (value) => {
        if (!/[px|%|vw|vh]$/.test(value)) throw new Error('The prop "height" should be end with "px" or "%"')
        return true
      }
    },
    // 画像の幅（高さ）- 表示領域の幅（高さ）
    offset: {
      type: String,
      default: '50px',
      validator: (value) => {
        if (!/px$/.test(value)) throw new Error('The prop "offset" should be end with "px"')
        if (parseInt(value, 10) < 0) throw new Error('The prop "offset" must be positive')
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
    this.images.forEach((item, index) => {
      let img = new Image();
      img.onload = () => {
        this.imageSizes[index] = {
          width: img.width,
          height: img.height
        }
      }
      img.src = item
    })
    this.timer = setInterval(this.switchSlide, this.duration)
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()
  },
  beforeDestroy: function () {
    clearInterval(this.timer)
  },
  methods: {
    onWindowResize () {
      this.widthInPixels = `${this.$el.clientWidth}px`
      this.heightInPixels = `${this.$el.clientHeight}px`
      this.orientation = this.getOrientation(this.$el.clientWidth, this.$el.clientHeight)
      this.setImageBackgroundSize()
    },
    setImageBackgroundSize () {
      this.images.forEach((item, index) => {
        // offset分も加味して、必要なだけ引き伸ばしたとすると必要な幅高さが得られるかを調べる
        // 縦方向のトランジッション
        const el = this.$refs[`image-${index}`][0]
        if (['up', 'down'].includes(this.direction)) {
          let calcWidth = item.width * ((this.$el.clientHeight + parseInt(this.offset, 10)) / item.height)
          el.style.backgroundSize = calcWidth < this.$el.clientWidth ? '100% auto' : 'auto calc(100% + var(--offset))'
        }
        // 横方向のトランジッション
        else {
          let calcHeight = item.height * ((this.$el.clientWidth + parseInt(this.offset, 10)) / item.width)
          el.style.backgroundSize = calcHeight < this.$el.clientHeight ? 'auto 100%' : 'calc(100% + var(--offset)) auto'
        }
      })
    },
    slidesStyle () {
      return {
        '--offset': this.offset,
        '--width': this.width,
        '--height': this.height,
        '--width_px': this.widthInPixels,
        '--height_px': this.heightInPixels
      }
    },
    slideClass (index) {
      return {
        active: this.activeIndex === index,
        oneBefore: this.oneBeforeIndex === index,
        moving: this.activeIndex === index || this.oneBeforeIndex === index
      }
    },
    switchSlide () {
      if (this.slideCount - 1 <= this.activeIndex) {
        this.activeIndex = 0
      } else {
        this.activeIndex++
      }
    },
    getOrientation (width, height) {
      if (width && height) {
        return (parseInt(width, 10) < parseInt(height, 10)) ? 'portrait' : 'landscape'
      }
    }
  }
})
</script>
