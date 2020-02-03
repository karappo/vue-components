<template lang="pug">
.scroll(:style="styles")
  span SCROLL
  i
</template>

<style lang="sass" scoped>
@keyframes scroll
  0%
    transform: translate3d(0, -100%, 0)
  15%
    transform: translate3d(0, -98%, 0)
  85%
    transform: translate3d(0, 98%, 0)
  100%
    transform: translate3d(0, 100%, 0)

.scroll
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  position: absolute
  width: 60px
  bottom: 0
  left: calc(50% - 30px)
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
      animation: scroll 2s infinite normal
</style>

<script>
import Vue from 'vue'
const hexToRgb = (hex) => {
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return res ? `rgb(${parseInt(res[1], 16)},${parseInt(res[2], 16)},${parseInt(res[3], 16)})` : null
}
const isValidColor = (color) => {
  color = color.toLowerCase().replace(/\s/g, '') // Normalization
  // Create test elements and assign styles
  const s = document.createElement('div').style
  s.color = color
  const computed = s.color.replace(/\s/g, '') // Normalization
  // First compare with "rgba()". If color is Hex, change to rgb and compare
  return  computed == color || computed == hexToRgb(color)
}
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
  }
})
</script>