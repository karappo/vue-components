<template lang="pug">
.scroll SCROLL
</template>

<style lang="sass" scoped>
.scroll
  font-size: 12px
  letter-spacing: 0.05em
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  z-index: 10
  &:after
    content: ''
    display: block
    width: 2px
    height: 47px
    margin-top: 18px
    background-color: white
</style>
