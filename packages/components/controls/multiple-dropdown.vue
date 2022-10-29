<template>
  <el-select
    ref="selectDropdown"
    v-model="deeSelects"
    :size="size"
    :disabled="!isEditing"
    :clearable="false"
    multiple
    filterable
    placeholder=""
    popper-class="dee-select-dropdown"
  >
    <el-option
      v-for="(oItem,index) of dimLayout.options"
      :key="index"
      :value="oItem.option_value"
      :label="oItem.option_name"
      @click.native="clickMultipleHandle(oItem)"
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
      deeSelects: []
    }
  },
  computed: {
    optionMax() {
      return this.dimLayout.option_max_choice
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
    // 渲染绑定数据
    setTableData(n) {
      const options = this.dimLayout.options
      const arr = []
      options.map(v => {
        const key = v.option_en_name
        if (v.option_value === n[key] && !arr.includes(v.option_value)) {
          arr.push(v.option_value)
        }
      })
      this.deeSelects = arr
    },
    clickMultipleHandle(oItem) {
      const val = oItem.option_value
      /*  排他选项 互斥处理 */
      const options = this.dimLayout.options
      if (!oItem.is_exclude_option && this.optionMax && this.deeSelects.length > this.optionMax) {
        this.deeSelects.splice(this.deeSelects.indexOf(val), 1)
        this.$message.warning(`选项不能超过${this.optionMax}`)
        return
      }
      // 选了排他项 清空其他项的值
      if (oItem.is_exclude_option && this.deeSelects.includes(val)) {
        this.deeSelects = this.deeSelects.filter(v => v === val)
      } else if (!oItem.is_exclude_option && this.deeSelects.includes(val)) {
        //  选其他项 清除排他项的值
        options.forEach(v => {
          if (v.is_exclude_option === 1 && this.deeSelects.includes(v.option_value)) {
            this.deeSelects.splice(this.deeSelects.indexOf(v.option_value), 1)
          }
        })
      }
      const valueObj = {}
      options.forEach(v => {
        if (this.deeSelects.includes(v.option_value)) {
          valueObj[v.option_en_name] = v.option_value
        } else {
          valueObj[v.option_en_name] = ''
        }
      })
      const modifyObj = {
        type: 'multiple_dropdown',
        value: valueObj,
        other: {
          en_name: oItem.option_en_name,
          question_name: this.dimLayout.name,
          question_id: this.dimLayout.id,
          value: valueObj[oItem.option_en_name],
          show_text: oItem.option_name
        }
      }
      if (this.rowIndex !== null) {
        modifyObj.rowIndex = this.rowIndex
      }
      this.$emit('modify', modifyObj)
    }
  }
}
</script>
