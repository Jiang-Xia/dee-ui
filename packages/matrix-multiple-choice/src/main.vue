<template>
  <div class="dee-question-wrap dee-matrix-multiple-choice">
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
              <el-checkbox
                v-model="tableData[trItem.en_name+'#'+raItem.en_name]"
                :option-en="trItem.en_name+'#'+raItem.en_name"
                :disabled="!isEditing||!!(excludeObj[trItem.en_name]&&!raItem.is_exclude_option)"
                false-label=""
                :true-label="raItem.option_value"
                @change="(v)=>{changeCheckboxHandle(v,raItem,trItem)}"
              >{{ '' }}</el-checkbox>
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
      tableData: {},
      excludeObj: {}
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
    changeCheckboxHandle(val, raItem, trItem) {
      /*  排他选项 互斥处理 */
      const isExValue = raItem.is_exclude_option
      if (val && isExValue) {
        this.excludeObj[trItem.en_name] = 1
        for (const k in this.tableData) {
          const arr = k.split('#')
          if (arr[0] === trItem.en_name && arr[1] !== raItem.en_name) {
            this.tableData[k] = ''
          }
        }
      } else if (!val && isExValue) {
        this.excludeObj[trItem.en_name] = ''
      }
      // console.log(!!(this.excludeObj[trItem.en_name] && !raItem.is_exclude_option))
      // console.log(this.excludeObj)
      this.changeHandle()
    },
    changeHandle() {
      this.$emit('modify', {
        type: 'matrix_multiple_choice',
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
