<template>
  <div class="dee-question-wrap dee-short-text-wrap">
    <h6 class="dee-question-heading">
      <span class="question-no">{{ index+1 }}.</span>
      {{ dimLayout.name }}
    </h6>
    <div class="dee-control-wrap">
      <el-input v-model="input" size="small" @change="changeHandle" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeeShortText',
  props: {
    dimData: {
      default: () => { return {} },
      type: Object
    },
    dimLayout: {
      default: () => { return {} },
      type: Object
    },
    index: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      input: ''
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        // console.log('============')
        // console.log(n)
        this.input = n[this.dimLayout.en_name]
      }
    }
  },
  created() {
  },
  methods: {
    getRealValue(v) {
      return v
    },
    changeHandle(v) {
      const en = this.dimLayout.en_name
      this.$emit('modify', {
        type: 'long_text',
        en: en,
        value: this.input
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// .short-text-wrap{
//   // float: left;
//   // width: 50%;
//   width: 100%;
// }
</style>
