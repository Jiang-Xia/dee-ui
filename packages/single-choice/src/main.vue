<template>
  <div
    class="dee-question-wrap dee-single-choice-wrap"
    :style="{
      width:dimLayout.options.length<=4?'50%':'100%'
    }"
  >
    <h6 class="dee-question-heading">
      <span class="dee-question-no">{{ questionNo }}</span>
      {{ dimLayout.name }}
    </h6>
    <p v-if="dimLayout.remark" class="dee-question-remark">{{ dimLayout.remark }}</p>
    <div class="dee-control-wrap">
      <!-- :style="{width:100/optionCount+'%'}" -->
      <el-radio-group
        v-model="radio"
      >
        <el-radio
          v-for="(item,index) in dimLayout.options"
          :key="index"
          :label="item.option_value"
          @click.native.prevent="clickHandle(item.option_value)"
        >{{ item.option_name }}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeeSingleChoice',
  props: {
    dimData: {
      default: () => { return {} },
      type: Object
    },
    dimLayout: {
      default: () => { return {} },
      type: Object
    },
    questionIndex: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      radio: ''
    }
  },
  computed: {
    optionCount() {
      return this.dimLayout.line_option_count
    },
    questionNo() {
      const index = this.questionIndex
      return (index < 9) ? (0 + String(index + 1)) : index + 1
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        // console.log('============')
        // console.log(n)
        this.radio = n[this.dimLayout.en_name]
      }
    }
  },
  created() {
  },
  methods: {
    getRealValue(v) {
      return v
    },
    clickHandle(v) {
      const en = this.dimLayout.en_name
      this.radio = v === this.radio ? '' : v
      this.$emit('modify', {
        type: 'single_choice',
        en: en,
        value: this.radio
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// .single-choice-wrap{
//   width: 100%;
// }
</style>
