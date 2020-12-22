<template>
  <div class="dee-question-wrap dee-multiple-choice-wrap">
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
          <tr v-for="(trItem,trIndex) in dimLayout.matrix_rows" :key="trIndex">
            <td>
              {{ trItem.name }}
            </td>
            <td v-for="(raItem,raIndex) in dimLayout.matrix_cols" :key="raIndex">
              <el-input
                v-model="tableData[trItem.en_name+'#'+raItem.en_name]"
                :option-en="trItem.en_name+'#'+raItem.en_name"
                :disabled="!isEditing"
                size="mini"
                style="width:98%;"
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
export default {
  name: 'DeeMatrixSingleChoice',
  props: {
    isEditing: {
      default: false,
      type: Boolean
    },
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
      tableData: {}
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
      immediate: true
    }
  },
  created() {
  },
  methods: {
    getRealValue(v) {
      return v
    },
    changeHandle() {
      this.$emit('modify', {
        type: 'matrix_input',
        en: '',
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
