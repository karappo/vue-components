<template lang="pug">
a(:href="`mailto:${to}`" target="_blank" rel="noopener noreferrer" v-html="html")
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      html: this.to.replace(
        '@',
        '@<span style="display: none;">Anti Spam</span>'
      )
    }
  }
}
</script>
