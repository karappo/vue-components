<template lang="pug">
.section-nav
  .tooltip(v-if="tooltipY" :style="{top: tooltipY}")
    svg(width="8" height="9" viewBox="0 0 8 9")
      path(data-name="多角形" d="M4.5,0,9,8H0Z" transform="translate(8) rotate(90)")
    span {{ tooltipText }}
  .wrap
    nav
      a(v-for="item in links" :href="item.target" @mouseover="showTooltip" @mouseleave="hideTooltip" :data-tooltip="item.title")
</template>

<style lang="sass" scoped>
.section-nav
  z-index: 100
  position: fixed
  top: 0
  right: 32px
.wrap
  right: 32px
  top: 0
  height: 100vh
  position: fixed
nav
  position: absolute
  right: 0
  top: 50%
  height: 100%
  transform: translate(-50%, 0)
a
  text-decoration: none
  display: block
  width: 8px
  height: 8px
  border-radius: 5px
  background-color: white
  border: 1px solid #A8A8A8
  &:not(:first-child)
    margin-top: 9px
  &.current
    background-color: #2E43F0
    border-color: #2E43F0
.tooltip
  background-color: black
  padding: 10px 14px 9px
  border-radius: 2px
  font-size: 11px
  font-weight: 900
  line-height: 1em
  position: relative
  margin-right: 5px
  right: 25px
  display: inline-block
  color: white
  svg
    position: absolute
    right: -8px
    top: calc(50% - 4.5px)
</style>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    links: {
      type: Array,
      default: () => { return [] }
    }
  },
  data: () => {
    return {
      tooltipText: '',
      tooltipY: null,
      targets: [] // リンク先の一覧
    }
  },
  mounted: function () {
    window.addEventListener('scroll', this.onScroll)
    this.targets = this.links.map((item) => { return item.target }).reverse()
  },
  methods: {
    showTooltip (e) {
      this.tooltipText = e.target.dataset.tooltip
      this.tooltipY = `${e.target.getBoundingClientRect().top - 10}px`
    },
    hideTooltip () {
      this.tooltipY = null
    },
    onScroll () {
      this.$el.querySelectorAll('a').forEach((el) => { el.classList.remove('current')})
      // 後ろから順にチェックしていく
      for (const i in this.targets) {
        const target = document.querySelector(this.targets[i])
        const targetTop = window.pageYOffset + target.getBoundingClientRect().top - document.querySelector('header').getBoundingClientRect().height
        if (targetTop <= window.scrollY) {
          this.$el.querySelector(`a[href='${this.targets[i]}']`).classList.add('current')
          break
        }
      }
    }
  }
})
</script>
