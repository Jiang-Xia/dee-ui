<template>
  <div
    class="dee-question-wrap dee-matrix-single-choice"
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
          <tr v-for="(trItem,trIndex) in dimLayout.matrix_rows" :key="trIndex">
            <td>
              {{ trItem.name }}
            </td>
            <td v-for="(raItem,raIndex) in dimLayout.matrix_cols" :key="raIndex">
              <el-radio
                v-model="tableData[trItem.en_name+'#'+raItem.en_name]"
                :option-en="trItem.en_name+'#'+raItem.en_name"
                :disabled="!isEditing"
                :label="raItem.option_value"
                @click.native.prevent="clickHandle(raItem.option_value,(trItem.en_name+'#'+raItem.en_name))"
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
    /* 判断空值（即一道题是否一填）*/
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
    clickHandle(v, en) {
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
      this.changeHandle()
    },
    changeHandle() {
      this.$emit('modify', {
        type: 'matrix_single_choice',
        value: this.tableData
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
