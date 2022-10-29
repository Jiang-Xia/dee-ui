<template>
  <el-select
    v-model="deeSelects"
    :size="size"
    :disabled="!isEditing"
    multiple
    filterable
    placeholder=""
    popper-class="dee-select-dropdown"
  >
    <el-option
      v-for="(oItem,index) of itemCol.options"
      :key="index"
      :value="oItem.option_value"
      :label="oItem.option_name"
      @click.native="clickMultipleHandle(oItem,itemRow, itemCol)"
    >
      <span class="check" />
      <span style="margin-left: 8px">{{ oItem.option_name }}</span>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'MultipleDropdown',
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
      deeSelects: []
    }
  },
  computed: {
    optionMax() {
      return this.itemCol.option_max_choice
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
  mounted() {
    this.disableKeyDeletion()
  },

  methods: {
    // 此方法解决 多选下拉开启联想时多选控件可以通过按键删除已选选项，无法触发所需事件回调
    //  让了删除tag操作无效
    disableKeyDeletion() {
      const dom = this.$el.querySelector('.el-select__input')
      // 该事件在捕获的时候执行回调，并且阻止事件的冒泡
      dom.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          e.stopImmediatePropagation()
          e.stopPropagation()
          e.preventDefault()
          this.deeSelects = [...this.deeSelects]
        }
      }, true)
    },
    getKey(v, v2, v3) {
      return v.en_name + '#' + v2.en_name + '#' + v3.option_en_name
    },
    setTableData(n) {
      const col = this.itemCol
      const row = this.itemRow
      const arr = []
      col.options.map(v3 => {
        // 行英文名+列英文名+选项
        const key = this.getKey(row, col, v3)
        if (v3.option_value === n[key] && !arr.includes(v3.option_value)) {
          arr.push(v3.option_value)
        }
      })
      this.deeSelects = arr
    },
    clickMultipleHandle(oItem, itemRow, itemCol) {
      const val = oItem.option_value
      /*  排他选项 互斥处理 */
      const options = itemCol.options
      const deeSelects = this.deeSelects
      if (!oItem.is_exclude_option && this.optionMax && deeSelects.length > this.optionMax) {
        deeSelects.splice(deeSelects.indexOf(val), 1)
        this.$message.warning(`选项不能超过${this.optionMax}`)
        return
      }
      // 选了排他项 清空其他项的值
      if (oItem.is_exclude_option && deeSelects.includes(val)) {
        const newArr = deeSelects.filter(v => v === val)
        this.deeSelects = newArr
      } else if (!oItem.is_exclude_option && deeSelects.includes(val)) {
        //  选其他项 清除排他项的值
        options.forEach(v => {
          if (v.is_exclude_option === 1 && deeSelects.includes(v.option_value)) {
            deeSelects.splice(deeSelects.indexOf(v.option_value), 1)
          }
        })
      }
      let show_text = itemRow.name + itemCol.name + ':'
      // 提取有行英文名加选项英文名，进行传输
      const valueObj = {}
      options.forEach(v => {
        const key = itemRow.en_name + '#' + itemCol.en_name + '#' + v.option_en_name
        if (this.deeSelects.includes(v.option_value)) {
          valueObj[key] = v.option_value
          show_text += v.option_name + ','
        } else {
          valueObj[key] = ''
        }
      })
      show_text = show_text.substring(0, show_text.length - 1)
      // console.log(valueObj)
      // 当前选择的一项
      const valueKey = this.getKey(itemRow, itemCol, oItem)
      this.$emit('modify', {
        type: 'multiple_dropdown',
        value: valueObj,
        other: {
          en_name: valueKey,
          question_name: this.itemCol.name,
          question_id: this.itemCol.id,
          value: valueObj[valueKey],
          show_text: show_text
        }
      })
    }
  }
}
</script>
