<template>
  <div
    class="dee-question-wrap dee-single-choice"
    :style="questionStyle"
    :type="dimLayout.type"
    :data-value="verifyValue"
  >
    <div class="dee-question-heading">
      <span v-if="dimLayout.is_required" class="dee-question-sign">*</span>
      <span v-show="questionNo" class="dee-question-no">{{ questionNo }}</span>
      <span class="dee-question-name">{{ dimLayout.name }}</span>
    </div>
    <div v-if="dimLayout.remark" class="dee-question-remark" v-html="dimLayout.remark" />
    <div class="dee-control-wrap">
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
          :style="controlStyle"
          @click.native.prevent="clickHandle(item.option_value,item)"
        >
          <span>{{ item.option_name }}</span>
          <!-- 其他选项 -->
          <input
            v-if="item.option_other_is_editable"
            v-model="option_other_value"
            :disabled="!isEditing"
            class="dee-input__underline"
            :option-en="item.option_other_en_name"
            size="mini"
            @click.stop=""
            @change="otherChangeHandle(item.option_value,item)"
          >
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import { commonMixins, relationMixins } from '#/mixins/question-common'
import { isMobile } from '#/utils/common'
export default {
  name: 'DeeSingleChoice',
  mixins: [commonMixins, relationMixins],
  props: {
    relationDict: {
      default: () => { return {} },
      type: Object
    },
    relationKeys: {
      default: () => { return {} },
      type: Object
    }
  },
  data() {
    return {
      radio: '',
      option_en_name: '',
      option_other_value: ''
    }
  },
  computed: {
    controlStyle() {
      let obj = {}
      if (!isMobile()) {
        obj = {
          width: 100 / this.optionCount + '%',
          marginRight: this.optionCount === -1 ? '1rem' : '0'
        }
      }
      return obj
    },
    optionCount() {
      return this.dimLayout.line_option_count
    },
    /* 判断空值（即一道题是否一填）*/
    verifyValue() {
      const data = this.dimData
      const checked = this.dimLayout.options.every(v => {
        return data[v.option_en_name] === '' || data[v.option_en_name] === undefined
      })
      return checked ? 'no_value' : 'value'
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
          } else {
            this.radio = ''
          }
          // 其他项
          if (v.option_other_is_editable) {
            this.option_other_value = n[v.option_other_en_name]
          }
        })
        this.$__calcRelationHandle(this.dimLayout.id)
        // console.log(this.radio)
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    otherChangeHandle(rV, item) {
      // 选择其他项时 return
      if (this.radio !== rV) return
      const obj = this.getParams(rV, item).value
      this.$emit('modify', {
        type: 'single_choice',
        value: obj.value,
        other: {
          en_name: item.option_other_en_name,
          question_name: this.dimLayout.name,
          question_id: this.dimLayout.id,
          value: this.radio,
          show_text: this.option_other_value ? obj.show_text + this.option_other_value : obj.show_text
        }
      })
    },
    getParams(v, item) {
      const options = this.dimLayout.options
      let show_text
      const obj = {}
      options.map(oItem => {
        obj[oItem.option_en_name] = ''
        // 判断是否勾选了其他项
        if (oItem.option_other_is_editable && oItem.option_value === v) {
          obj[oItem.option_other_en_name] = this.option_other_value
        }
        if (item.option_en_name === oItem.option_en_name) {
          show_text = item.option_name
        }
      })
      obj[this.option_en_name ] = this.radio
      return {
        value: obj,
        show_text
      }
    },
    clickHandle(v, item) {
      if (!this.isEditing) return
      const en = item.option_en_name
      this.radio = v === this.radio ? '' : v
      this.option_en_name = en
      const obj = this.getParams(v, item)
      // console.log(obj)
      this.$emit('modify', {
        type: 'single_choice',
        value: obj.value,
        other: {
          en_name: en,
          question_name: this.dimLayout.name,
          question_id: this.dimLayout.id,
          value: this.radio,
          show_text: this.option_other_value ? obj.show_text + this.option_other_value : obj.show_text
        }
      })
      this.$__calcRelationHandle(this.dimLayout.id)
    }
  }
}
</script>
<style lang="scss" scoped>
// .single-choice-wrap{
//   width: 100%;
// }
</style>
