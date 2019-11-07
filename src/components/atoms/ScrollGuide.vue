<template lang="pug">
.scroll
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
  z-index: 10
  span
    font-size: 12px
    letter-spacing: 0.05em
  i
    display: block
    width: 2px
    height: 47px
    margin-top: 18px
    background-color: rgba(255,255,255,.4)
    overflow: hidden
    position: relative
    &:before
      display: block
      content: ''
      width: 100%
      height: 100%
      background-color: rgba(255,255,255,.8)
      position: absolute
      top: 0
      left: 0
      animation: scroll 2s infinite normal
</style>
