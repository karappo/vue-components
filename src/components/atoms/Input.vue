<template lang="pug">

.root
  input(:type="type"
        :name="name"
        :class="getInputClass"
        :placeholder="placeholder")

</template>

<style lang="sass" scoped>

.root
  display: flex
  border: 1px solid #d5d5d5
  margin-bottom: 15px
  border-radius: 3px

input
  outline: 0
  font-family: ProximaNova
  font-size: 13px
  padding: 10px 11px
  width: calc(100% - 22px)
  border-style: none

  &.skeunomorphism
    box-shadow: inset 0 1px 1px #999

</style>

<script>

export default {
  computed: {
    getInputClass() {
      const inputClass = [
        { skeunomorphism: this.skeunomorphism }
      ];
      return inputClass;
    },
    getInputStyle() {
      const inputStyle = {
        '--icon': `url(${this.icon}) no-repeat left center`
      };
      return inputStyle;
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: undefined
    },
    skeunomorphism: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    }
  },
  mounted() {
    if(this.$el.autofocus) {
      this.$el.focus();
    }
  }
};

</script>
