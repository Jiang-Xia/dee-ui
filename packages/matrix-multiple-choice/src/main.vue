<template>
  <div class="dee-question-wrap dee-matrix-multiple-choice">
    <h6 class="dee-question-heading">
      <span v-if="dimLayout.is_required" class="dee-question-sign">*</span>
      <span v-show="questionNo" class="dee-question-no">{{ questionNo }}</span>
      <span class="dee-question-name">{{ dimLayout.name }}</span>

    </h6>
    <div v-if="dimLayout.remark" class="dee-question-remark" v-html="dimLayout.remark" />
    <div class="dee-control-wrap">
      <table class="dee-matrix-table">
        <thead>
          <tr class="dee-matrix__header">
            <th />
            <th v-for="(thItem,thIndex) in dimLayout.matrix_cols" :key="thIndex">{{ thItem.name }}</th>
          </tr>
        </thead>
        <tbody class="dee-matrix__body">
          <tr v-for="(itemRow,trIndex) in dimLayout.matrix_rows" :key="trIndex">
            <td>
              {{ itemRow.name }}
            </td>
            <td v-for="(itemCol,raIndex) in dimLayout.matrix_cols" :key="raIndex">
              <el-checkbox
                v-model="bindTableData[itemRow.en_name+'#'+itemCol.en_name]"
                :option-en="itemRow.en_name+'#'+itemCol.en_name"
                :disabled="!isEditing"
                @change="(v)=>{changeCheckboxHandle(v,itemRow,itemCol)}"
              >{{ '' }}</el-checkbox>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { commonMixins } from '#/mixins/question-common'
export default {
  name: 'DeeMatrixMultipleChoice',
  mixins: [commonMixins],
  data() {
    return {
      bindTableData: {}
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
      const cols = this.dimLayout.matrix_cols
      const rows = this.dimLayout.matrix_rows
      const obj = {}
      rows.map(v => {
        cols.map(v2 => {
          const key = v.en_name + '#' + v2.en_name
          obj[key] = v2.option_value === n[key]
        })
      })
      this.bindTableData = obj
    },
    // 根据绑定的对象装填需要发送的数据
    getTableData(bindTableData) {
      const cols = this.dimLayout.matrix_cols
      const rows = this.dimLayout.matrix_rows
      const obj = {}
      rows.map(v => {
        cols.map(v2 => {
          const key = v.en_name + '#' + v2.en_name
          if (bindTableData[key]) {
            obj[key] = v2.option_value
          } else {
            obj[key] = ''
          }
        })
      })
      return obj
    },
    changeCheckboxHandle(val, itemRow, itemCol) {
      const cols = this.dimLayout.matrix_cols
      const tableKey = itemRow.en_name + '#' + itemCol.en_name
      for (const key in this.bindTableData) {
        // 判断这一行的所有列
        if (itemRow.en_name === key.split('#')[0]) {
          // 勾选并且开启排他
          if (itemCol.is_exclude_option === 1 && val) {
            // 选了排他项 清空其他项的值
            this.bindTableData[key] = false
            this.bindTableData[tableKey] = true
          } else if (itemCol.is_exclude_option !== 1) {
            // 选其他项 清除排他项的值
            cols.forEach(item => {
              if (item.is_exclude_option === 1) {
                this.bindTableData[itemRow.en_name + '#' + item.en_name] = false
              }
            })
          }
        }
      }
      this.changeHandle()
    },
    changeHandle() {
      const valueObj = this.getTableData(this.bindTableData)
      this.$emit('modify', {
        type: 'matrix_multiple_choice',
        value: valueObj
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
