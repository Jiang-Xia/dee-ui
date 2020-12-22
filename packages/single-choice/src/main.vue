<template>
  <div
    class="dee-question-wrap dee-single-choice-wrap"
    :style="questionStyle"
    :type="dimLayout.type"
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
        :disabled="!isEditing"
      >
        <el-radio
          v-for="(item,index) in dimLayout.options"
          :key="index"
          :label="item.option_value"
          :disabled="!isEditing"
          :option-en="item.option_en_name"
          @click.native.prevent="clickHandle(item.option_value,item)"
        >
          <span>{{ item.option_name }}</span>
          <!-- 其他选项 -->
          <el-input
            v-if="item.option_other_is_editable"
            v-model="option_other_value"
            :option-en="item.option_other_en_name"
            size="mini"
            @change="(v)=>{
              changeHandle(v,item.option_value,item)
            }"
          />
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeeSingleChoice',
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
      radio: '',
      option_en_name: ''
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
          if (values.includes(n[v.option_en_name])) {
            this.radio = n[v.option_en_name]
          }
        })
        // console.log(this.radio)
      }
    }
  },
  created() {
  },
  methods: {
    getRealValue(v) {
      return v
    },
    changeHandle(v, rV, item) {
      if (this.radio !== rV) return
    },
    clickHandle(v, item) {
      if (!this.isEditing) return
      const options = this.dimLayout.options
      const en = item.option_en_name
      this.radio = v === this.radio ? '' : v
      this.option_en_name = en
      const obj = {}
      options.forEach(v => {
        obj[v.option_en_name] = ''
      })
      obj[this.option_en_name ] = this.radio
      // console.log(obj)
      this.$emit('modify', {
        type: 'single_choice',
        en: en,
        value: obj
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
