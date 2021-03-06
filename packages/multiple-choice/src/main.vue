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
        <input
          v-if="item.option_other_is_editable"
          v-model="option_other_value"
          :option-en="item.option_other_en_name"
          :disabled="!isEditing"
          class="dee-input__underline"
          @click.stop=""
          @change="otherChangeHandle(item)"
        >
      </el-checkbox>
    </div>
  </div>
</template>

<script>
import { commonMixins, relationMixins } from '#/mixins/question-common'
import { isMobile } from '#/utils/common'
export default {
  name: 'DeeMultipleChoice',
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
      const checked = this.dimLayout.options.every(v => {
        return data[v.option_en_name] === '' || data[v.option_en_name] === undefined
      })
      return checked ? 'no_value' : 'value'
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
      this.$__calcRelationHandle()
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
    otherChangeHandle(item) {
      // 选择其他项时 return
      if (!this.bindTableData[item.option_en_name]) return
      const obj = { [item.option_other_en_name]: this.option_other_value }
      const valueObj = this.getTableData(this.bindTableData)
      this.$emit('modify', {
        type: 'multiple_choice',
        value: { ...valueObj, ...obj }
      })
    },
    changeCheckboxHandle(val, oItem) {
      /*  排他选项 互斥处理 */
      const options = this.dimLayout.options
      const oItemKey = oItem.option_en_name
      const curOptions = Object.values(this.bindTableData).filter(v => v).length
      let otherObj
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
      this.$emit('modify', {
        type: 'multiple_choice',
        value: { ...valueObj, ...otherObj }
      })
      this.$__calcRelationHandle()
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
