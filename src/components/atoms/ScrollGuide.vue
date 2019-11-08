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

export default Vue.extend({
  props: {
    gutterColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.1)'
    },
    highlightColor: {
      type: String,
      default: 'black'
    },
    textColor: {
      type: String,
      default: '#000000'
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