<template>
  <el-select
    v-model="deeSelects"
    :size="size"
    multiple
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
    //   return this.dimLayout.option_max_choice
      return 2
    },
    /* 判断空值（即一道题是否一填）*/
    verifyValue() {
      const data = this.dimData
      const checked = this.dimLayout.options.every(v => {
        return data[v.option_en_name] === '' || data[v.option_en_name] === undefined
      })
      return checked ? 'no_value' : 'value'
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        this.setBindTableData(n)
      },
      immediate: true
    }
  },
  methods: {
    // 渲染绑定数据
    setBindTableData(n) {
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
