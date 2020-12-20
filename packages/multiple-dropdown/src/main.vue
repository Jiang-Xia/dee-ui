<template>
  <div class="dee-question-wrap dee-multiple-dropdown-wrap">
    <h6 class="dee-question-heading">
      <span class="dee-question-no">{{ questionNo }}</span>
      {{ dimLayout.name }}
    </h6>
    <div class="dee-control-wrap">
      <el-select
        v-model="selects"
        size="small"
        multiple
        collapse-tags
        @change="changeHandle"
      >
        <el-option
          v-for="(item,index) in dimLayout.options"
          :key="index"
          :value="item.option_value"
          :label="item.option_name"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeeMultipleDropdown',
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
      selects: []
    }
  },
  computed: {
    questionNo() {
      const index = this.questionIndex
      return (index < 9) ? (0 + String(index + 1)) : index + 1
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        console.log('============')
        console.log(n)
        this.selects = n[this.dimLayout.en_name]
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
        type: 'multiple_dropdown',
        en: en,
        value: this.selects,
        dim_type: 1
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// .multiple-dropdown-wrap{
//   // float: left;
//   // width: 50%;
//   width: 100%;
// }
</style>
