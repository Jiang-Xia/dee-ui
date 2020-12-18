<template>
  <div class="dee-question-wrap dee-long-text-wrap" :type="dimLayout.type">
    <h6 class="dee-question-heading">
      <span class="question-no">{{ index+1 }}.</span>
      {{ dimLayout.name }}
    </h6>
    <div class="dee-control-wrap">
      <el-input v-model="textarea" :row="2" type="textarea" size="small" @change="changeHandle" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeeLongText',
  // inject: ['dimData'],
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
      textarea: ''
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        console.log('============')
        console.log(n)
        this.textarea = n[this.dimLayout.en_name]
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
        value: this.textarea
      })
    }
  }
}
</script>
<style lang="scss">
// .dee-long-text-wrap{
//   // float: left;
//   width: 100%;
// }
</style>
