<template>
  <div
    class="dee-question-wrap dee-multiple-choice"
    :style="questionStyle"
    :type="dimLayout.type"
  >
    <h6 class="dee-question-heading">
      <span v-if="dimLayout.is_required" class="dee-question-sign">*</span>
      <span v-show="questionNo" class="dee-question-no">{{ questionNo }}</span>
      <span class="dee-question-name">{{ dimLayout.name }}</span>

    </h6>
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
import { commonMixins } from '#/mixins/question-common'
export default {
  name: 'DeeMultipleChoice',
  mixins: [commonMixins],
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
      tableData: {},
      bindTableData: {}
    }
  },
  computed: {
    controlStyle() {
      return {
        width: 100 / this.optionCount + '%',
        marginRight: this.optionCount === -1 ? '1rem' : '0'
      }
    },
    optionCount() {
      return this.dimLayout.line_option_count
    },
    optionMax() {
      return this.dimLayout.option_max_choice
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        const options = this.dimLayout.options
        const obj = {}
        options.map(v => {
          const key = v.option_en_name
          obj[key] = v.option_value === n[key]
          this.tableData[key] = n[key] || ''
          // 其他项
          if (v.option_other_is_editable) {
            this.option_other_value = n[v.option_other_en_name]
          }
        })
        this.bindTableData = obj
        this.calcRelation()
        // console.log(this.bindTableData, this.tableData)
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    /*
      联动题 开始
    */
    // 获取关联题目
    calcRelation() {
      const id = this.dimLayout.id
      const ids = this.relationKeys[id]
      if (ids) {
        for (const id_ of ids) {
          const obj = this.relationDict[id_].relation_items
          const relation = this.relationDict[id_].relation
          if (this.getMultiQuestionLogic(obj, relation)) {
            this.$emit('change-id', { id: id_, type: 'add' })
          } else {
            this.$emit('change-id', { id: id_, type: 'remove' })
          }
        }
      }
    },
    // 判断选项是否存在选中
    isExisted(relation_item, bindTableData) {
      const { any_or_all, checked_or_unchecked, option_list } = relation_item
      let options = this.dimLayout.options
      const relationVals = option_list.map(v => v.option_value)
      if (checked_or_unchecked === 'checked') {
        options = options.filter(v => bindTableData[v.option_en_name])
        const checkedVals = options.map(v => v.option_value)
        if (any_or_all === 'any') {
          return this.anyCB(checkedVals, relationVals)
        } else if (any_or_all === 'all') {
          return this.allCB(checkedVals, relationVals)
        }
      } else if (checked_or_unchecked === 'unchecked') {
        options = options.filter(v => !bindTableData[v.option_en_name])
        const unCheckedVals = options.map(v => v.option_value)
        if (any_or_all === 'any') {
          return this.anyCB(unCheckedVals, relationVals)
        } else if (any_or_all === 'all') {
          return this.allCB(unCheckedVals, relationVals)
        }
      }
    },
    anyCB(Vals, relationVals) {
      return Vals.some((v) => {
        return relationVals.includes(v)
      })
    },
    allCB(Vals, relationVals) {
      // 符合的每一项都要在不选中的数组里
      return relationVals.every((v) => {
        return Vals.includes(v)
      })
    },
    /*
     *  返回值 就是判断多题逻辑的结果
    */
    getMultiQuestionLogic(obj, relation) {
      const boolObj = {}
      for (const k in obj) {
        boolObj[k] = this.isExisted(obj[k], this.bindTableData)
      }
      if (relation === 'and') {
        for (const k in obj) {
          if (!boolObj[k]) {
            return false
          }
        }
        return true
      } else if (relation === 'or') {
        for (const k in obj) {
          if (boolObj[k]) {
            return true
          }
        }
        return false
      }
    },
    /*
      联动题 结束
    */
    otherChangeHandle(item) {
      // 选择其他项时 return
      if (!this.bindTableData[item.option_en_name]) return
      const obj = { [item.option_en_name]: this.option_other_value }
      this.$emit('modify', {
        type: 'multiple_choice',
        value: { ...this.tableData, ...obj }
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
            this.bindTableData[key] = ''
            this.tableData[key] = ''
          }
        }
      } else {
        //  选其他项 清除排他项的值
        options.forEach(v => {
          if (v.is_exclude_option === 1) {
            this.bindTableData[v.option_en_name] = false
            this.tableData[v.option_en_name] = ''
          } else {
            // 勾选了其他这个选项 其他输入框才传
            if (this.bindTableData[v.option_en_name] && v.option_other_is_editable) {
              otherObj = { [v.option_other_en_name]: this.option_other_value }
            }
          }
        })
      }
      this.tableData[oItemKey] = val ? oItem.option_value : ''
      this.calcRelation()
      this.$emit('modify', {
        type: 'multiple_choice',
        value: { ...this.tableData, ...otherObj }
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
