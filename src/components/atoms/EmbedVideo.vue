<template lang="pug">
iframe(v-resize:debounce="onResize")
</template>

<style lang="sass" scoped>
</style>

<script>
import Vue from 'vue'
import resize from 'vue-resize-directive'

export default Vue.extend({
  directives: {
    resize,
  },
  props: {
  },
  data () {
    return {
      width: null,
      height: null
    }
  },
  computed: {
  },
  mounted () {
    this.width = this.$el.getAttribute('width')
    this.height = this.$el.getAttribute('height')
  },
  beforeDestroy () {
  },
  methods: {
    onResize: function () {
      console.log('onResize')
    }
  }
})
</script>
