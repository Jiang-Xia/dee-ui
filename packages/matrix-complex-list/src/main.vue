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
                @onConfirm="delRowHandle(rowIndex)"
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
            <td :colspan="dimLayout.matrix_cols.length+1">
              <el-button size="mini" type="text" icon="el-icon-plus" @click="addRowHandle">继续填写</el-button>
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
    /* 判断空值（即一道题是否已填）matrix-input matrix-multiple-choice matrix-single-choice 一样*/
    verifyValue() {
      const data = this.dimData
      const rowList = data[this.dimLayout.en_name] || []
      if (!rowList.length) {
        return 'no_value'
      } else {
        const checked = rowList.some(item => {
          const keys = Object.keys(item)
          // 判断所有的key value有一个为有值的
          return keys.some(v => {
            return !['', null, undefined].includes(item[v])
          })
        })
        return checked ? 'value' : 'no_value'
      }
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
    /*
     * 新增校验
     * 返回值 为当前校验的控件属性
    */
    addVerifyValue() {
      // 行内key校验 必填时并且有没有填值时 返回true
      const cb = (rowItem) => {
        const cols = this.dimLayout.matrix_cols
        for (const item of cols) {
          if (item.is_required) {
            if (item.col_type === 'short_text') {
              if (!rowItem[item.en_name]) {
                return item
              }
            } else if (item.col_type === 'single_dropdown') {
              const bool = item.options.every(v => {
                return ['', null, undefined].includes(rowItem[v.option_en_name])
              })
              if (bool) {
                return item
              }
            } else if (item.col_type === 'multiple_dropdown') {
              const bool = item.options.every(v => {
                return ['', null, undefined].includes(rowItem[v.option_en_name])
              })
              if (bool) {
                return item
              }
            }
          }
        }
      }
      // 多行校验
      for (const rowItem of this.rowList) {
        const bool = cb(rowItem)
        if (bool) {
          return bool
        }
      }
    },
    // 增加一行
    addRowHandle() {
      if (this.addVerifyValue()) {
        this.$message.warning('请先完成添加！')
        return
      }
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
