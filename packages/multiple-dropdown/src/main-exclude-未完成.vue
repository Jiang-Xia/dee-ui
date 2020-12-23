<template>
  <div
    class="dee-question-wrap dee-multiple-dropdown"
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
        @remove-tag="removeTagHandle"
      >
        <el-option
          v-for="(item,index) in dimLayout.options"
          :key="index"
          :value="item.option_value"
          :label="item.option_name"
          :option-en="item.option_en_name"
          :disabled="exclude&&!item.is_exclude_option"
        >
          <span
            class="dee-dropdown-span"
            @click="clickOptionHandle(item)"
          >
            {{ item.option_name }}
          </span>
        </el-option>
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
      selects: [],
      exclude: null
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
    // 传参
    getParams(val) {
      const options = this.dimLayout.options
      const obj = {}
      options.forEach(v => {
        if (val.includes(v.option_value)) {
          obj[v.option_en_name] = v.option_value
        } else {
          obj[v.option_en_name] = ''
        }
      })
      return obj
    },
    removeTagHandle(val) {
      const options = this.dimLayout.options.filter(v => v.option_value === val)
      const isExValue = options[0] && options[0].is_exclude_option
      if (isExValue) {
        this.exclude = null
      }
    },
    clickOptionHandle(item) {
      const val = item.option_value
      /*  排他选项 互斥处理 */
      const isExValue = item.is_exclude_option
      if (isExValue) {
        this.exclude = item.option_value
      } else if (isExValue && this.selects.includes(val)) {
        this.exclude = null
        this.selects = this.selects.filter(v => {
          return v !== val
        })
      }
      this.changeHandle()
    },
    changeHandle() {
      this.$emit('modify', {
        type: 'multiple_dropdown',
        value: this.getParams(this.selects)
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
