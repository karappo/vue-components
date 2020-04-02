<template lang="pug">
iframe(:style="style()")
</template>

<style lang="sass" scoped>
iframe
  height: var(--height)
</style>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
  },
  data () {
    return {
      initWidth: null,
      initHeight: null,
      width: null,
      height: null
    }
  },
  computed: {
  },
  mounted () {
    // 念の為読み込み時の幅と高さを覚えておく
    this.width = this.initWidth = this.$el.getAttribute('width')
    this.height = this.initHeight = this.$el.getAttribute('height')
  },
  created () {
    window.addEventListener('resize', this.onResize);
  },
  destroyed () {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize () {
      if (this.width !== this.$el.clientWidth) {
        this.width = this.$el.clientWidth
        this.height = this.width * (this.initHeight / this.initWidth)
      }
    },
    style () {
      return {
        '--height': `${this.height}px`
      }
    }
  }
})
</script>
