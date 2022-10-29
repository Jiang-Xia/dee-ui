<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-03-31 17:35:27
 * @LastEditTime: 2021-07-13 09:39:41
 * @Description:
 * @FilePath: \dee-ui\packages\matrix-input\src\main.vue
-->
<template>
  <div
    class="dee-question-wrap dee-matrix-input"
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
          <tr v-for="(itemRow,rowIndex) in dimLayout.matrix_rows" :key="rowIndex">
            <td>
              {{ itemRow.name }}
            </td>
            <td v-for="(itemCol,colIndex) in dimLayout.matrix_cols" :key="colIndex">
              <ShortText
                :is-editing="isEditing"
                :item-col="itemCol"
                :item-row="itemRow"
                :dim-data="dimData"
                size="mini"
                @modify="inputHandle"
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

export default {
  name: 'DeeMatrixInput',
  components: {
    ShortText
  },
  mixins: [commonMixins],
  data() {
    return {
      tableData: {}
    }
  },
  computed: {
    /* 判断空值（即一道题是否已填）matrix-input matrix-multiple-choice matrix-single-choice 一样*/
    verifyValue() {
      const item = this.dimLayout
      const list = []
      item.matrix_rows.forEach(row => {
        item.matrix_cols.forEach(col => {
          list.push([row.en_name + '#' + col.en_name])
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
    inputHandle(data) {
      data.type = 'matrix_input'
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
