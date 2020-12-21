<template>
  <div
    class="dee-question-wrap dee-multiple-choice-wrap"
  >
    <h6 class="dee-question-heading">
      <span class="dee-question-no">{{ questionNo }}</span>
      {{ dimLayout.name }}
    </h6>
    <p v-if="dimLayout.remark" class="dee-question-remark">{{ dimLayout.remark }}</p>
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
            <td v-for="(raItem,raIndex) in dimLayout.matrix_cols" :key="raIndex">
              <el-radio
                v-model="trItem.checked"
                :label="raItem.en_name"
                @click.native.prevent="clickHandle(trIndex,raItem.en_name)"
              >{{ '' }}</el-radio>
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
      rows: []
    }
  },
  computed: {
    questionNo() {
      const index = this.questionIndex
      return (index < 9) ? (0 + String(index + 1)) : index + 1
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
    this.rows = this.dimLayout.matrix_rows.map(v => {
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
    clickHandle(i, v) {
      this.rows[i].checked = this.rows[i].checked === v ? '' : v
      this.changeHandle(v)
    },
    changeHandle(v) {
      const en = this.dimLayout.en_name
      this.$emit('modify', {
        type: 'matrix_single_choice',
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
