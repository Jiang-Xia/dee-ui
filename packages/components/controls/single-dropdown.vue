<template>
  <el-select
    v-model="select"
    clearable
    :size="size"
    :disabled="!isEditing"
    placeholder=""
    @change="changeHandle"
    @clear="clearHandle"
  >
    <el-option
      v-for="(oItem,index) of dimLayout.options"
      :key="index"
      :value="oItem.option_value"
      :label="oItem.option_name"
      :option-en="oItem.option_en_name"
    >
      <span
        class="dee-dropdown-span"
      >
        {{ oItem.option_name }}
      </span>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'SingleDropdown',
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
      type: Object,
      required: true
    },
    size: {
      default: 'small',
      type: String
    },
    // 自增型复合矩阵才用到
    rowIndex: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      select: ''
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
      const options = this.dimLayout.options
      for (const item of options) {
        // 行英文名+列英文名+选项
        // console.log(key)
        if (item.option_value === n[item.option_en_name]) {
          this.select = item.option_value
          break
        }
      }
    },
    clearHandle() {
      const { dimLayout } = this
      const options = dimLayout.options
      const valueObj = {}
      options.forEach(v => {
        // 全部清空
        valueObj[v.option_en_name] = ''
      })
      const modifyObj = {
        type: 'single_dropdown',
        value: valueObj,
        other: {
          en_name: '',
          question_name: dimLayout.name,
          question_id: dimLayout.id,
          value: '',
          show_text: ''
        }
      }
      // console.log(obj)
      this.$emit('modify', modifyObj)
    },
    changeHandle(val) {
      console.log(val)
      if (val === '' || val === null) {
        return
      }
      const { dimLayout } = this
      const options = dimLayout.options
      const oItem = options.filter(v => v.option_value === val)[0] || {}
      const show_text = oItem.option_name
      const valueKey = oItem.option_en_name
      const valueObj = {}
      // 需要先置空 再赋值
      options.forEach(v => { valueObj[v.option_en_name] = '' })
      options.forEach(v => {
        if (oItem.option_value === v.option_value) {
          console.log(v.option_value)
          valueObj[v.option_en_name] = v.option_value
        }
      })
      const modifyObj = {
        type: 'single_dropdown',
        value: valueObj,
        other: {
          en_name: oItem.option_en_name,
          question_name: dimLayout.name,
          question_id: dimLayout.id,
          value: valueObj[valueKey],
          show_text: show_text
        }
      }
      if (this.rowIndex !== null) {
        modifyObj.rowIndex = this.rowIndex
      }
      // console.log(obj)
      this.$emit('modify', modifyObj)
    }
  }
}
</script>
