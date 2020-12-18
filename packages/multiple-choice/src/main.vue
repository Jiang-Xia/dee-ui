<template>
  <div class="dee-question-wrap dee-multiple-choice-wrap">
    <h6 class="dee-question-heading">
      <span class="question-no">{{ index+1 }}.</span>
      {{ dimLayout.name }}
    </h6>
    <div class="dee-control-wrap">
      <el-checkbox-group
        v-model="checkbox"
        class="me-checkbox-group"
        @change="changeHandle"
      >
        <el-checkbox
          v-for="(item,index) in dimLayout.options"
          :key="index"
          :label="item.option_value"
        >{{ item.option_name }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeeMultipleChoice',
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
      checkbox: []
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
        type: 'multiple_choice',
        en: en,
        value: this.checkbox
      })
    }
  }
}
</script>
<style lang="scss">
// .multiple-choice-wrap{
//   // float: left;
//   width: 100%;
// }
</style>
