<template lang="pug">
.scroll_guide_wrap
  .scroll_guide(:style="styles" @click="click")
    span {{ text }}
    i
</template>

<style lang="sass" scoped>
@keyframes scroll_guide_animation
  0%
    transform: translate3d(0, -100%, 0)
  15%
    transform: translate3d(0, -98%, 0)
  85%
    transform: translate3d(0, 98%, 0)
  100%
    transform: translate3d(0, 100%, 0)

.scroll_guide_wrap
  width: 100%
  bottom: 0
  position: absolute
  display: flex
.scroll_guide
  width: auto
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  margin: 0 auto
  padding: 20px 20px 0 20px
  cursor: pointer
  span
    font-size: 12px
    letter-spacing: 0.05em
    color: var(--text-color)
  i
    display: block
    width: 2px
    height: 47px
    margin-top: 18px
    background-color: var(--gutter-color)
    overflow: hidden
    position: relative
    &:before
      display: block
      content: ''
      width: 100%
      height: 100%
      background-color: var(--highlight-color)
      position: absolute
      top: 0
      left: 0
      animation: scroll_guide_animation 2s infinite normal
</style>

<script>
import Vue from 'vue'
import { isValidColor } from '@karappo-inc/util'
export default Vue.extend({
  props: {
    gutterColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.1)',
      validator: (value) => {
        if (!isValidColor(value)) throw new Error('The prop "gutterColor" should be valid color')
        return true
      }
    },
    highlightColor: {
      type: String,
      default: 'black',
      validator: (value) => {
        if (!isValidColor(value)) throw new Error('The prop "highlightColor" should be valid color')
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
      validator: (value) => {
        if (!isValidColor(value)) throw new Error('The prop "textColor" should be valid color')
        return true
      }
    }
  },
  computed: {
    styles () {
      return {
        '--gutter-color': this.gutterColor,
        '--highlight-color': this.highlightColor,
        '--text-color': this.textColor
      }
    }
  },
  methods: {
    click(e) {
      this.$emit('click', e)
    }
  }
})
</script>