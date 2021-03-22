<template>
  <div
    class="dee-question-wrap dee-matrix-single-dropdown"
    :data-value="verifyValue"
  >
    <div class="dee-question-heading">
      <span v-if="dimLayout.is_required" class="dee-question-sign">*</span>
      <span v-show="questionNo" class="dee-question-no">{{ questionNo }}</span>
      <span class="dee-question-name">{{ dimLayout.name }}</span>

    </div>
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
          <tr v-for="(itemRow,rowIndex) in dimLayout.matrix_rows" :key="rowIndex">
            <td>
              {{ itemRow.name }}
            </td>
            <td v-for="(itemCol,colIndex) in dimLayout.matrix_cols" :key="colIndex">
              <el-select
                v-if="itemCol.col_type==='single_dropdown'"
                v-model="tableData[itemRow.en_name+'#'+itemCol.en_name]"
                size="mini"
                style="width:98%;"
                :disabled="!isEditing"
                placeholder=""
                :option-en="itemRow.en_name+'#'+itemCol.en_name"
              >
                <el-option
                  v-for="(oItem,index) of itemCol.options"
                  :key="index"
                  :value="oItem.option_value"
                  :label="oItem.option_name"
                  @click.native="clickSingleHandle(oItem,itemRow, itemCol)"
                />
              </el-select>
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
  name: 'DeeMatrixSingleDropdown',
  mixins: [commonMixins],
  data() {
    return {
      tableData: {}
    }
  },
  computed: {
    /* 判断空值（即一道题是否一填）matrix-input matrix-multiple-choice matrix-single-choice 一样*/
    verifyValue() {
      const item = this.dimLayout
      const list = []
      item.matrix_rows.forEach(row => {
        item.matrix_cols.forEach(col => {
          list.push([row.en_name + '#' + col.en_name])
        })
      })
      const data = this.dimData
      const checked = list.every(v => {
        return data[v] === '' || data[v] === undefined
      })
      return checked ? 'no_value' : 'value'
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        this.setTableData(n)
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    getKey(v, v2, v3) {
      return v.en_name + '#' + v2.en_name + '#' + v3.option_en_name
    },
    setTableData(n) {
      const cols = this.dimLayout.matrix_cols
      const rows = this.dimLayout.matrix_rows
      const obj = {}
      rows.map(v => {
        cols.map(v2 => {
          v2.options.map(v3 => {
            // 行英文名+列英文名+选项
            const key = this.getKey(v, v2, v3)
            if (v3.option_value === n[key]) {
              // 不用else 用则会取值最后一个了
              obj[v.en_name + '#' + v2.en_name] = v3.option_value
            }
          })
        })
      })
      this.tableData = obj
      // console.log(obj)
    },
    clickSingleHandle(oItem, itemRow, itemCol) {
      const modelKey = itemRow.en_name + '#' + itemCol.en_name
      const options = itemCol.options
      let show_text = itemRow.name + itemCol.name + ':'
      // 提取有行英文名加选项英文名，进行传输
      const valueObj = {}
      options.forEach(v => {
        const key = itemRow.en_name + '#' + itemCol.en_name + '#' + v.option_en_name
        if (this.tableData[modelKey] === v.option_value) {
          valueObj[key] = v.option_value
          show_text += v.option_name + ','
        }
      })
      show_text = show_text.substring(0, show_text.length - 1)
      // 当前选择的一项
      const valueKey = itemRow.en_name + '#' + itemCol.en_name + '#' + oItem.option_en_name
      // console.log(valueObj, valueKey)
      // return
      this.$emit('modify', {
        type: 'matrix_single_dropdown',
        value: valueObj,
        other: {
          en_name: valueKey,
          question_name: this.dimLayout.name,
          question_id: this.dimLayout.id,
          value: valueObj[valueKey],
          show_text: show_text
        }
      })
    }
  }
}
</script>
<style lang="scss">

</style>
