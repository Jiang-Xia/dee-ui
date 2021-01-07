<template>
  <div class="dee-question-wrap dee-matrix-input">
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
          <tr v-for="(trItem,trIndex) in dimLayout.matrix_rows" :key="trIndex">
            <td>
              {{ trItem.name }}
            </td>
            <td v-for="(raItem,raIndex) in dimLayout.matrix_cols" :key="raIndex">
              <el-input
                v-if="raItem.text_check==='no_limit'||raItem.text_check==='number'"
                v-model="tableData[trItem.en_name+'#'+raItem.en_name]"
                :type="raItem.text_check==='number'?raItem.text_check:''"
                :maxlength="raItem.max_length"
                size="mini"
                style="width:98%;"
                :disabled="!isEditing"
                :option-en="trItem.en_name+'#'+raItem.en_name"
                @change="changeHandle"
              />
              <el-date-picker
                v-if="raItem.text_check==='date'||raItem.text_check==='datetime'"
                v-model="tableData[trItem.en_name+'#'+raItem.en_name]"
                :option-en="trItem.en_name+'#'+raItem.en_name"
                :editable="false"
                :type="raItem.text_check"
                size="mini"
                :style="{width:raItem.text_check==='date'?'8rem':'11rem'}"
                :disabled="!isEditing"
                :placeholder="raItem.text_check==='date'?'例：2008-08-08':'例：2008-08-08 00:00:00'"
                @change="changeHandle"
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
          obj[v.en_name + '#' + v2.en_name] = n[v.en_name + '#' + v2.en_name] || ''
        })
      })
      this.tableData = obj
      // console.log(obj)
    },
    changeHandle() {
      this.$emit('modify', {
        type: 'matrix_input',
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
