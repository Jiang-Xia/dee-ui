<template>
  <div
    class="dee-question-wrap dee-matrix-multiple-dropdown"
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
              <DeeTableSelect class="dee-dropdown-wrap" :input-names="inputNames" :height="itemCol.options.length*1.8+'rem'">
                <div v-for="(oItem,index) in itemCol.options" :key="index" class="dee-dropdown-item">
                  <el-checkbox
                    v-model="bindTableData[oItem.option_en_name]"
                    :option-en="oItem.option_en_name"
                    :disabled="!isEditing"
                    @change="(v)=>{changeCheckboxHandle(v,oItem)}"
                  >
                    <span>{{ oItem.option_name }}</span>
                  </el-checkbox>
                </div>
              </DeeTableSelect>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { commonMixins } from '#/mixins/question-common'
import DeeTableSelect from '#/components/dee-table-select'

export default {
  name: 'DeeMatrixMultipleDropdown',
  components: {
    DeeTableSelect
  },
  mixins: [commonMixins],
  data() {
    return {
      tableData: {},
      inputNames: '',
      bindTableData: {}
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
        type: 'matrix_multiple_dropdown',
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
