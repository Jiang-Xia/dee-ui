<template>
  <el-select
    v-model="select"
    :size="size"
    :disabled="!isEditing"
    placeholder=""
    :option-en="itemRow.en_name+'#'+itemCol.en_name"
  >
    <el-option
      v-for="(oItem,index) of itemCol.options"
      :key="index"
      :value="oItem.option_value"
      :label="oItem.option_name"
      @click.native="clickSingleHandle(oItem,itemRow, itemCol)"
    />
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
    itemCol: {
      default: () => { return {} },
      type: Object,
      required: true
    },
    itemRow: {
      default: () => { return {} },
      type: Object,
      required: true
    },
    size: {
      default: 'small',
      type: String
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
    getKey(v, v2, v3) {
      return v.en_name + '#' + v2.en_name + '#' + v3.option_en_name
    },
    setTableData(n) {
      const col = this.itemCol
      const row = this.itemRow
      for (const item of col.options) {
        // 行英文名+列英文名+选项
        const key = this.getKey(row, col, item)
        // console.log(key)
        if (item.option_value === n[key]) {
          this.select = item.option_value
          break
        }
      }
    },
    // 会先触发change 在触发click
    clickSingleHandle(oItem, itemRow, itemCol) {
      const valueKey = this.getKey(itemRow, itemCol, oItem)
      const options = itemCol.options
      const show_text = itemRow.name + itemCol.name + ':' + oItem.option_name
      const valueObj = {}
      options.forEach(v => {
        // 需要先置空 再赋值
        valueObj[this.getKey(itemRow, itemCol, v)] = ''
        if (oItem.option_value === v.option_value) {
          valueObj[valueKey] = v.option_value
        }
      })
      // console.log(valueObj)
      // 当前选择的一项
      this.$emit('modify', {
        type: 'single_dropdown',
        value: valueObj,
        other: {
          en_name: valueKey,
          question_name: itemCol.name,
          question_id: itemCol.id,
          value: valueObj[valueKey],
          show_text: show_text
        }
      })
    }
  }
}
</script>
