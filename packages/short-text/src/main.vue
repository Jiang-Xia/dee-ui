<template>
  <div class="question-wrap short-text-wrap">
    <h6 class="question-heading">{{ dimLayout.name }}</h6>
    <div class="control-wrap">
      <el-input v-model="input" size="small" />
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
    this.input = this.dimData.value
    // console.log()
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
<style lang="scss" scoped>
.short-text-wrap{
  // float: left;
  // width: 50%;
  width: 100%;
}
</style>
