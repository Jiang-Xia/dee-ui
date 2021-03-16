<template>
  <div
    class="dee-question-wrap dee-matrix-input"
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
              <el-input
                v-if="itemCol.text_check==='no_limit'||itemCol.text_check==='number'"
                v-model="tableData[itemRow.en_name+'#'+itemCol.en_name]"
                :type="itemCol.text_check==='number'?itemCol.text_check:''"
                :maxlength="itemCol.max_length"
                size="mini"
                style="width:98%;"
                :disabled="!isEditing"
                :option-en="itemRow.en_name+'#'+itemCol.en_name"
                @change="changeHandle(itemRow,itemCol)"
              />
              <el-date-picker
                v-if="itemCol.text_check==='date'||itemCol.text_check==='datetime'"
                v-model="tableData[itemRow.en_name+'#'+itemCol.en_name]"
                :option-en="itemRow.en_name+'#'+itemCol.en_name"
                :editable="false"
                :type="itemCol.text_check"
                size="mini"
                :style="{width:itemCol.text_check==='date'?'8rem':'11rem'}"
                :disabled="!isEditing"
                :placeholder="itemCol.text_check==='date'?'例：2008-08-08':'例：2008-08-08 00:00:00'"
                @change="changeHandle(itemRow,itemCol)"
              />
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
  name: 'DeeMatrixInput',
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
    setTableData(n) {
      const cols = this.dimLayout.matrix_cols
      const rows = this.dimLayout.matrix_rows
      const obj = {}
      rows.map(v => {
        cols.map(v2 => {
          obj[v.en_name + '#' + v2.en_name] = n[v.en_name + '#' + v2.en_name]
        })
      })
      this.tableData = obj
      // console.log(obj)
    },
    changeHandle(itemRow, itemCol) {
      const show_text = itemRow.name + itemCol.name + ':' + this.tableData[en]
      const en = itemRow.en_name + '#' + itemCol.en_name
      this.$emit('modify', {
        type: 'matrix_input',
        value: this.tableData,
        other: {
          en_name: en,
          question_name: this.dimLayout.name,
          question_id: this.dimLayout.id,
          value: this.tableData[en],
          show_text
        }
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
