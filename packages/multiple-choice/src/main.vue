<template>
  <div
    class="dee-question-wrap dee-multiple-choice"
    :style="questionStyle"
    :type="dimLayout.type"
  >
    <h6 class="dee-question-heading">
      <span class="dee-question-no">{{ questionNo }}</span>
      {{ dimLayout.name }}
    </h6>
    <p v-if="dimLayout.remark" class="dee-question-remark">{{ dimLayout.remark }}</p>
    <div class="dee-control-wrap">
      <el-checkbox-group
        v-model="checkboxs"
        :max="optionMax?Number(optionMax):undefined"
        :disabled="!isEditing"
      >
        <el-checkbox
          v-for="(item,index) in dimLayout.options"
          :key="index"
          :label="item.option_value"
          :option-en="item.option_en_name"
          :disabled="exclude&&!item.is_exclude_option"
          :style="controlStyle"
          @change="(v)=>{changeCheckboxHandle(v,item)}"
        >
          <span>{{ item.option_name }}</span>
          <!-- 其他选项 -->
          <input
            v-if="item.option_other_is_editable"
            v-model="option_other_value"
            :option-en="item.option_other_en_name"
            :disabled="!isEditing"
            class="dee-input__underline"
            @click.stop=""
            @change="otherChangeHandle(item.option_value,item)"
          >
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeeMultipleChoice',
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
      checkboxs: [],
      exclude: null,
      option_other_value: ''
    }
  },
  computed: {
    controlStyle() {
      return {
        width: 100 / this.optionCount + '%',
        marginRight: this.optionCount === -1 ? '1rem' : '0'
      }
    },
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
    optionCount() {
      return this.dimLayout.line_option_count
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
            this.checkboxs.push(val)
          }
          // 其他项
          if (values.includes(val) && v.option_other_is_editable) {
            this.option_other_value = n[v.option_other_en_name]
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
        // 其他项
        if (val.includes(v.option_value) && v.option_other_is_editable) {
          obj[v.option_other_en_name] = this.option_other_value
        }
      })
      return obj
    },
    otherChangeHandle(cV, item) {
      // 选择其他项时 return
      if (!this.checkboxs.includes(cV)) return
      const obj = this.getParams(this.checkboxs)
      this.$emit('modify', {
        type: 'multiple_choice',
        value: obj
      })
    },
    changeCheckboxHandle(val, item) {
      /*  排他选项 互斥处理 */
      const isExValue = item.is_exclude_option
      if (val && isExValue) {
        this.exclude = item.option_value
        this.checkboxs = this.checkboxs.filter(v => {
          return v === item.option_value
        })
      } else if (!val && isExValue) {
        this.exclude = null
        this.checkboxs = []
      }
      if (this.exclude) {
        this.checkboxs = [this.exclude]
      }
      console.log(this.checkboxs)
      this.$emit('modify', {
        type: 'multiple_choice',
        value: this.getParams(this.checkboxs)
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
