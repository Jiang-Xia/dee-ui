<template>
  <div
    class="dee-question-wrap dee-multiple-choice"
    :style="questionStyle"
    :type="dimLayout.type"
    :data-value="verifyValue"
  >
    <div class="dee-question-heading">
      <span v-if="dimLayout.is_required" class="dee-question-sign">*</span>
      <span v-show="questionNo" class="dee-question-no">{{ questionNo }}</span>
      <span class="dee-question-name">{{ dimLayout.name }}</span>
      <slot name="header" :layout="dimLayout">
        <DeeLogPopper v-if="showLog" :dim-layout="dimLayout" v-bind="$attrs" v-on="$listeners" />
      </slot>
    </div>
    <div v-if="dimLayout.remark" class="dee-question-remark" v-html="dimLayout.remark" />
    <div class="dee-control-wrap">

      <el-checkbox
        v-for="(item,index) in dimLayout.options"
        :key="index"
        v-model="bindTableData[item.option_en_name]"
        :option-en="item.option_en_name"
        :disabled="!isEditing"
        :style="controlStyle"
        @change="(v)=>{changeCheckboxHandle(v,item)}"
      >
        <span>{{ item.option_name }}</span>
        <!-- 其他选项 -->
        <template v-if="item.option_other_is_editable">
          <OtherShortText
            :is-editing="isEditing"
            :dim-layout="item"
            :value="option_other_value"
            @modify="otherChangeHandle"
          />
        </template>
      </el-checkbox>
    </div>
  </div>
</template>

<script>
import { commonMixins, relationMixins } from '#/mixins/question-common'
import OtherShortText from '#/components/controls/other-short-text'
import { isMobile } from '#/utils/common'
export default {
  name: 'DeeMultipleChoice',
  components: { OtherShortText },
  mixins: [commonMixins, relationMixins],
  props: {
    metaTemplate: {
      default: () => { return {} },
      type: Object
    }
  },
  data() {
    return {
      checkboxs: [],
      exclude: null,
      option_other_value: '',
      bindTableData: {}
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
    optionMax() {
      return this.dimLayout.option_max_choice
    },
    /* 判断空值（即一道题是否一填）*/
    verifyValue() {
      const data = this.dimData
      const checked = this.dimLayout.options.some(v => {
        return !['', null, undefined].includes(data[v.option_en_name])
      })
      return checked ? 'value' : 'no_value'
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        this.setBindTableData(n)
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    // 渲染绑定数据
    setBindTableData(n) {
      const options = this.dimLayout.options
      const obj = {}
      options.map(v => {
        const key = v.option_en_name
        obj[key] = v.option_value === n[key]
        // 其他项
        if (v.option_other_is_editable) {
          this.option_other_value = n[v.option_other_en_name]
        }
      })
      this.bindTableData = obj
      // this.$__calcRelationHandle()
      // console.log(this.bindTableData)
    },
    // 根据绑定的对象装填需要发送的数据
    getTableData(bindTableData) {
      const options = this.dimLayout.options
      const obj = {}
      options.map(v => {
        const key = v.option_en_name
        if (bindTableData[key]) {
          obj[key] = v.option_value
        } else {
          obj[key] = ''
        }
      })
      return obj
    },
    otherChangeHandle(data) {
      this.option_other_value = data.other.value
      const { item } = data
      // 选择其他项时 return
      if (!this.bindTableData[item.option_en_name]) return
      const obj = { [item.option_other_en_name]: this.option_other_value }
      const valueObj = this.getTableData(this.bindTableData)
      this.$emit('modify', {
        type: 'multiple_choice',
        value: { ...valueObj, ...obj },
        other: {
          en_name: item.option_other_en_name,
          question_name: this.dimLayout.name,
          question_id: this.dimLayout.id,
          value: valueObj[item.option_en_name],
          show_text: this.option_other_value ? item.option_name + this.option_other_value : item.option_name
        }
      })
    },
    changeCheckboxHandle(val, oItem) {
      /*  排他选项 互斥处理 */
      const options = this.dimLayout.options
      const oItemKey = oItem.option_en_name
      const curOptions = Object.values(this.bindTableData).filter(v => v).length
      let otherObj = {}
      // 选择不是排他项时 有最多选项提示
      if (!oItem.is_exclude_option && this.optionMax && curOptions > this.optionMax) {
        this.bindTableData[oItemKey] = false
        this.$message.warning(`选项不能超过${this.optionMax}`)
        return
      }
      // 选了排他项 清空其他项的值
      if (oItem.is_exclude_option && val) {
        for (const key in this.bindTableData) {
          if (oItemKey !== key) {
            this.bindTableData[key] = false
          }
        }
      } else {
        //  选其他项 清除排他项的值
        options.forEach(v => {
          if (v.is_exclude_option === 1) {
            this.bindTableData[v.option_en_name] = false
          } else {
            // 勾选了其他这个选项 其他输入框才传
            if (this.bindTableData[v.option_en_name] && v.option_other_is_editable) {
              otherObj = { [v.option_other_en_name]: this.option_other_value }
            }
          }
        })
      }
      const valueObj = this.getTableData(this.bindTableData)
      // 其他和这个选项结合起来
      const show_text = otherObj[Object.keys(otherObj) ? Object.keys(otherObj)[0] : '']
      this.$emit('modify', {
        type: 'multiple_choice',
        value: { ...valueObj, ...otherObj },
        other: {
          en_name: oItem.option_en_name,
          question_name: this.dimLayout.name,
          question_id: this.dimLayout.id,
          value: valueObj[oItem.option_en_name],
          show_text: show_text ? oItem.option_name + show_text : oItem.option_name
        }
      })
      // 会先触发事件的回调，再改变子组件的数据
      this.$nextTick(() => {
        this.$__calcRelationHandle(false)
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
