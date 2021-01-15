<template lang="pug">
img(:src="_src()" :srcset="_srcset()")
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  methods: {
    _srcset() {
      const srcPath = this.imagePath(this.src)
      const src2x = this.src.replace(/\.(\w+)$/, '@2x.$1')
      const src2xPath = this.imagePath(src2x)
      return `${srcPath} 1x, ${src2xPath} 2x`
    },
    _src() {
      return this.imagePath(this.src)
    },
    imagePath(path) {
      return require(`~/assets/image/${path}`)
    }
  }
}
</script>
