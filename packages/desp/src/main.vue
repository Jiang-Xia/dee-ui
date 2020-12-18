<template>
  <div class="dee-question-wrap dee-desp-wrap">
    <h6 class="dee-question-heading">{{ dimLayout.name||'段落描述' }}</h6>
  </div>
</template>
<script>
export default {
  name: 'DeeDesp',
  props: {
    dimData: {
      default: () => { return {} },
      type: Object
    },
    dimLayout: {
      default: () => { return {} },
      type: Object
    }
  },
  data() {
    return {
      input: ''
    }
  },
  watch: {
    dimData(n) {
      this.input = n.value
    }
  },
  created() {
    console.log(this.dimLayout)
  },
  methods: {
    getRealValue(v) {
      return v
    },
    clickHandle(v) {
      v = this.getRealValue(v)

      this.input = v === this.input ? '' : v
      // console.log(this.dimData.value, '!!!!!!!!!!', v)
      this.$emit('modify', {
        type: 'input',
        en: 'en',
        value: this.input,
        dim_type: 1
      })
    }
  }
}
</script>
<style lang="scss">
// .dee-desp-wrap{
//   // float: left;
//   width: 100%;
// }
</style>
