<template>
  <div
    class="dee-question-wrap dee-matrix-complex"
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
              <!-- 短文本 -->
              <ShortText
                v-if="itemCol.col_type==='short_text'"
                :is-editing="isEditing"
                :item-col="itemCol"
                :item-row="itemRow"
                :dim-data="dimData"
                style="width:98%;"
                size="mini"
                @modify="inputHandle"
              />
              <!-- 单选题 -->
              <SingleDropdown
                v-else-if="itemCol.col_type==='single_dropdown'"
                :is-editing="isEditing"
                :item-col="itemCol"
                :item-row="itemRow"
                :dim-data="dimData"
                style="width:98%;"
                size="mini"
                @modify="singleHandle"
              />
              <!-- 多选题 -->
              <MultipleDropdown
                v-else-if="itemCol.col_type==='multiple_dropdown'"
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
import ShortText from '#/components/matrix-controls/short-text'
import SingleDropdown from '#/components/matrix-controls/single-dropdown'
import MultipleDropdown from '#/components/matrix-controls/multiple-dropdown'

export default {
  name: 'DeeMatrixComplex',
  components: {
    ShortText,
    SingleDropdown,
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
  created() {
  },
  methods: {
    getKey(v, v2, v3) {
      return v.en_name + '#' + v2.en_name + '#' + v3.option_en_name
    },
    inputHandle(data) {
      data.type = 'matrix_complex'
      const obj = {
        question_id: this.dimLayout.id,
        question_name: this.dimLayout.name
      }
      data.other = { ...data.other, ...obj }
      this.$emit('modify', data)
    },
    singleHandle(data) {
      data.type = 'matrix_complex'
      const obj = {
        question_id: this.dimLayout.id,
        question_name: this.dimLayout.name
      }
      data.other = { ...data.other, ...obj }
      this.$emit('modify', data)
    },
    multipleHandle(data) {
      data.type = 'matrix_complex'
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
