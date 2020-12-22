<template>
  <div
    class="dee-question-wrap dee-multiple-dropdown-wrap"
    :style="questionStyle"
    :type="dimLayout.type"
  >
    <h6 class="dee-question-heading">
      <span class="dee-question-no">{{ questionNo }}</span>
      {{ dimLayout.name }}
    </h6>
    <p v-if="dimLayout.remark" class="dee-question-remark">{{ dimLayout.remark }}</p>
    <div class="dee-control-wrap">
      <!-- collapse-tags -->
      <el-select
        v-model="selects"
        size="small"
        multiple
        :disabled="!isEditing"
        :multiple-limit="optionMax?Number(optionMax):0"
        @change="changeHandle"
      >
        <el-option
          v-for="(item,index) in dimLayout.options"
          :key="index"
          :value="item.option_value"
          :label="item.option_name"
          :option-en="item.option_en_name"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeeMultipleDropdown',
  props: {
    isEditing: {
      default: false,
      type: Boolean
    },
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
    questionStyle() {
      const layout = this.dimLayout
      const obj = {}
      if (layout.row_behavior === 1) {
        obj.clear = 'both'
      } else if (layout.row_behavior === 2) {
        obj.clear = 'both'
        obj.width = '100%'
      }
      return obj
    },
    optionMax() {
      return this.dimLayout.option_max_choice
    },
    questionNo() {
      const index = this.questionIndex
      return (index < 9) ? (0 + String(index + 1)) : index + 1
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        const options = this.dimLayout.options
        const values = options.map(v => v.option_value)
        options.map(v => {
          const val = n[v.option_en_name]
          if (values.includes(val)) {
            this.selects.push(val)
          }
        })
      }
    }
  },
  created() {
  },
  methods: {
    getRealValue(v) {
      return v
    },
    changeHandle(val) {
      const en = this.dimLayout.en_name
      const options = this.dimLayout.options
      const obj = {}
      options.forEach(v => {
        if (val.includes(v.option_value)) {
          obj[v.option_en_name] = v.option_value
        } else {
          obj[v.option_en_name] = ''
        }
      })
      this.$emit('modify', {
        type: 'multiple_dropdown',
        en: en,
        value: obj,
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
