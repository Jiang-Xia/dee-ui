<template>
  <div
    class="dee-question-wrap dee-matrix-complex-list"
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
          <tr v-for="(rowItem,rowIndex) in rowList" :key="rowIndex">
            <td>
              <el-popconfirm
                confirm-button-type="text"
                title="确定删除这一行数据吗？"
                @confirm="delRowHandle(rowIndex)"
              >
                <span slot="reference" class="el-icon-delete-solid" />
              </el-popconfirm>
            </td>
            <td v-for="(itemCol,colIndex) in dimLayout.matrix_cols" :key="colIndex">
              <!-- 短文本 -->
              <ShortText
                v-if="itemCol.col_type==='short_text'"
                :is-editing="isEditing"
                :dim-layout="itemCol"
                :dim-data="rowItem"
                :row-index="rowIndex"
                style="width:98%;"
                size="mini"
                @modify="inputHandle"
              />

              <!-- 单选题 -->
              <SingleDropdown
                v-if="itemCol.col_type==='single_dropdown'"
                :is-editing="isEditing"
                :dim-layout="itemCol"
                :dim-data="rowItem"
                :row-index="rowIndex"
                style="width:98%;"
                size="mini"
                @modify="singleHandle"
              />

              <!-- 多选题 -->
              <MultipleDropdown
                v-if="itemCol.col_type==='multiple_dropdown'"
                :is-editing="isEditing"
                :dim-layout="itemCol"
                :dim-data="rowItem"
                :row-index="rowIndex"
                style="width:98%;"
                size="mini"
                @modify="multipleHandle"
              />
            </td>
          </tr>
          <!-- 增加一行 -->
          <tr>
            <td :colspan="dimLayout.matrix_cols.length+1" @click="addRowHandle">
              <el-button size="mini" type="text" icon="el-icon-plus">继续填写</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { commonMixins } from '#/mixins/question-common'
import ShortText from '#/components/controls/short-text'
import SingleDropdown from '#/components/controls/single-dropdown'
import MultipleDropdown from '#/components/controls/multiple-dropdown'

export default {
  name: 'DeeMatrixComplexList',
  components: {
    ShortText,
    SingleDropdown,
    MultipleDropdown
  },
  mixins: [commonMixins],
  data() {
    return {
      tableData: {},
      rowList: []
    }
  },
  computed: {
    /* 判断空值（即一道题是否一填）matrix-input matrix-multiple-choice matrix-single-choice 一样*/
    verifyValue() {
      // const item = this.dimLayout
      // const list = []
      // item.matrix_rows.forEach(row => {
      //   item.matrix_cols.forEach(col => {
      //     list.push([row.en_name + '#' + col.en_name])
      //   })
      // })
      // const data = this.dimData
      // const checked = list.every(v => {
      //   return data[v] === '' || data[v] === undefined
      // })
      // return checked ? 'no_value' : 'value'
      return 'no_value'
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
      this.rowList = n[this.dimLayout.en_name] || []
    },
    inputHandle(data) {
      this.emitHandle(data)
    },
    singleHandle(data) {
      this.emitHandle(data)
    },
    multipleHandle(data) {
      this.emitHandle(data)
    },
    emitHandle(data) {
      // console.log(data)
      const { rowIndex, other } = data
      this.rowList[rowIndex] = { ...this.rowList[rowIndex], ...data.value }
      const valueObj = {
        rowItem: this.rowList[rowIndex],
        rowIndex: rowIndex
      }
      this.$emit('modify', {
        type: 'matrix_complex_list',
        value: {
          [this.dimLayout.en_name]: this.rowList
        },
        row_dict: valueObj,
        question_en_name: this.dimLayout.en_name,
        other: {
          en_name: other.en_name,
          question_name: this.dimLayout.name,
          question_id: this.dimLayout.id,
          value: other.value,
          show_text: other.show_text ? other.show_text : ''
        }
      })
    },
    // 增加一行
    addRowHandle() {
      if (this.dimLayout.max_col > 0 && this.rowList.length >= this.dimLayout.max_col) {
        this.$message.warning(`最大行数为${this.dimLayout.max_col}`)
        return
      }
      this.rowList.push({})
    },
    // 删除一行
    delRowHandle(rowIndex) {
      const valueObj = {
        valueItem: this.rowList[rowIndex],
        index: rowIndex
      }
      this.$emit('modify', {
        type: 'matrix_complex_list',
        value: {
          [this.dimLayout.en_name]: this.rowList
        },
        value_dict: valueObj,
        question_en_name: this.dimLayout.en_name,
        other: {
        }
      })
      this.rowList.splice(rowIndex, 1)
    }
  }
}
</script>
<style lang="scss">
</style>
