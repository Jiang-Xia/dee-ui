<template>
  <div
    class="dee-question-wrap dee-multiple-choice-wrap"
    :style="questionStyle"
  >
    <h6 class="dee-question-heading">
      <span class="dee-question-no">{{ questionNo }}</span>
      {{ dimLayout.name }}
    </h6>
    <p v-if="dimLayout.remark" class="dee-question-remark">{{ dimLayout.remark }}</p>
    <div class="dee-control-wrap">
      <!-- :style="{width:100/optionCount+'%'}" -->
      <el-checkbox-group
        v-model="checkboxs"
        :max="optionMax?Number(optionMax):undefined"
        :disabled="!isEditing"
        @change="changeHandle"
      >
        <el-checkbox
          v-for="(item,index) in dimLayout.options"
          :key="index"
          :label="item.option_value"
        >
          <!-- 其他选项 -->
          <el-input
            v-if="item.option_other_is_editable"
            v-model="option_other_value"
            size="mini"
            @change="changeHandle"
          />
          <span v-else>{{ item.option_name }}</span>
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
      option_other_value: ''
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
        console.log(values)
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
        // 其他项
        if (val.includes(v.option_value) && v.option_other_is_editable) {
          obj[v.option_other_en_name] = this.option_other_value
        }
      })
      // console.log(obj)
      this.$emit('modify', {
        type: 'multiple_choice',
        en: en,
        value: obj
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
