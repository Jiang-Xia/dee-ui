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
              <MultipleDropdown
                :is-editing="isEditing"
                :item-col="itemCol"
                :item-row="itemRow"
                :dim-data="dimData"
                style="width:98%;"
                size="mini"
                @modify="multipleHandle"
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
import MultipleDropdown from '#/components/matrix-controls/multiple-dropdown'

export default {
  name: 'DeeMatrixMultipleDropdown',
  components: {
    MultipleDropdown
  },
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
          col.options.forEach(v => {
            const key = row.en_name + '#' + col.en_name + '#' + v.option_en_name
            list.push(key)
          })
        })
      })
      const data = this.dimData
      const checked = list.some(v => {
        return !['', null, undefined].includes(data[v])
      })
      return checked ? 'value' : 'no_value'
    }
  },
  methods: {
    multipleHandle(data) {
      data.type = 'matrix_ multiple_dropdown'
      const obj = {
        question_id: this.dimLayout.id,
        question_name: this.dimLayout.name
      }
      data.other = { ...data.other, ...obj }
      this.$emit('modify', data)
    }
  }
}
</script>
<style lang="scss">

</style>
