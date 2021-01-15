<template lang="pug">
div
  p(v-for="p in paragraphs" v-html="p")
</template>

<script>
// 渡されたテキストのうち改行（\n）で区切り、夫々<p></p>で囲って出力する
export default {
  props: {
    text: {
      default: 'No text',
      type: String,
      required: true
    }
  },
  computed: {
    paragraphs() {
      return this.text.split('\n')
    }
  }
}
</script>
