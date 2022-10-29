<template>
  <div
    class="dee-question-wrap dee-matrix-single-choice"
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
              <el-radio
                v-model="tableData[itemRow.en_name+'#'+itemCol.en_name]"
                :option-en="itemRow.en_name+'#'+itemCol.en_name"
                :disabled="!isEditing"
                :label="itemCol.option_value"
                @click.native.prevent="clickHandle(itemCol.option_value,itemRow,itemCol)"
              >{{ '' }}</el-radio>
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
  name: 'DeeMatrixSingleChoice',
  mixins: [commonMixins],
  data() {
    return {
      tableData: {}
    }
  },
  computed: {
    /* 判断空值（即一道题是否已填）*/
    verifyValue() {
      const item = this.dimLayout
      const list = []
      item.matrix_rows.forEach(row => {
        item.matrix_cols.forEach(col => {
          const key = row.en_name + '#' + col.en_name
          list.push(key)
        })
      })
      const data = this.dimData
      const checked = list.some(v => {
        return !['', null, undefined].includes(data[v])
      })
      return checked ? 'value' : 'no_value'
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
    // 渲染渲染绑定数据
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
    // 根据绑定的对象装填需要发送的数据
    getTableData(tableData, itemRow) {
      const cols = this.dimLayout.matrix_cols
      // 只要当前行（即当前题）
      const rows = this.dimLayout.matrix_rows.filter(v => v.en_name === itemRow.en_name)
      const obj = {}
      rows.map(v => {
        cols.map(v2 => {
          const key = v.en_name + '#' + v2.en_name
          if (tableData[key]) {
            obj[key] = v2.option_value
          } else {
            obj[key] = ''
          }
        })
      })
      return obj
    },
    clickHandle(v, itemRow, itemCol) {
      const en = itemRow.en_name + '#' + itemCol.en_name
      const show_text = itemRow.name + ':' + itemCol.name
      if (!this.isEditing) return
      // 先清空对应 行的选项
      const arr = en.split('#')
      for (const k in this.tableData) {
        // 除了当前点击选项同行其他选项清空
        if (k.split('#')[0] === arr[0] && k !== en) {
          this.tableData[k] = ''
        }
      }
      this.tableData[en] = this.tableData[en] === v ? '' : v
      this.changeHandle(en, show_text, itemRow)
    },
    changeHandle(en, show_text, itemRow) {
      const valueObj = this.getTableData(this.tableData, itemRow)
      this.$emit('modify', {
        type: 'matrix_single_choice',
        value: valueObj,
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
