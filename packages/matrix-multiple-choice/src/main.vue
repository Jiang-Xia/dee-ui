<template>
  <div class="dee-question-wrap dee-multiple-choice-wrap">
    <h6 class="dee-question-heading">
      <span class="dee-question-no">{{ questionNo }}</span>
      {{ dimLayout.name }}
    </h6>
    <div class="dee-control-wrap">
      <table class="dee-matrix-table">
        <thead>
          <tr class="dee-matrix__header">
            <th />
            <th v-for="(thItem,thIndex) in dimLayout.matrix_cols" :key="thIndex">{{ thItem.name }}</th>
          </tr>
        </thead>
        <tbody class="dee-matrix__body">
          <tr v-for="(trItem,trIndex) in rows" :key="trIndex">
            <td>
              {{ trItem.name }}
            </td>
            <td v-for="(raItem,raIndex) in cols" :key="raIndex">
              <el-checkbox @change="changeHandle" v-model="raItem.checked" :label="raItem.en_name">{{ '' }}</el-checkbox>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeeMatrixSingleChoice',
  props: {
    dimData: {
      default: () => { return {} },
      type: Object
    },
    dimLayout: {
      default: () => { return {} },
      type: Object
    },
    questionIndex: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      tableData: [],
      rows: [],
      cols:[]
    }
  },
  computed: {
    questionNo() {
      const index = this.questionIndex
      return (index < 9) ? (0 + String(index + 1)) : index + 1
    },
    new_matrix_cols() {
      return this.dimLayout.matrix_cols
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        // console.log('============')
      }
    }
  },
  created() {
    this.rows = this.dimLayout.matrix_rows
    this.cols = this.dimLayout.matrix_cols.map(v => {
      v.checked = ''
      // 需要重新填装 才能双向绑定
      return { ...v }
    })
    console.log(this.dimLayout.matrix_rows)
  },
  methods: {
    getRealValue(v) {
      return v
    },
    changeHandle(v) {
      const en = this.dimLayout.en_name
      this.$emit('modify', {
        type: 'matrix_multiple_choice',
        en: en,
        value: this.checkboxs
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
