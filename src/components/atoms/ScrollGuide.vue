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
  span
    font-size: 12px
    letter-spacing: 0.05em
    color: var(--color)
  i
    display: block
    width: 2px
    height: 47px
    margin-top: 18px
    background-color: rgba(var(--color-hex), .4)
    overflow: hidden
    position: relative
    &:before
      display: block
      content: ''
      width: 100%
      height: 100%
      background-color: rgba(var(--color-hex), .8)
      position: absolute
      top: 0
      left: 0
      animation: scroll 2s infinite normal
</style>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    color: {
      type: String,
      default: '#000000'
    }
  },
  computed: {
    styles () {
      return {
        '--color': this.color,
        '--color-hex': this.hexToRgb(this.color)
      }
    }
  },
  methods: {
    hexToRgb: (hex) => {
      var res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return res ? `${parseInt(res[1], 16)}, ${parseInt(res[2], 16)}, ${parseInt(res[3], 16)}` : null;
    }
  }
})
</script>