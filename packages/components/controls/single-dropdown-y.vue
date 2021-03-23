<template>
  <el-select
    v-model="select"
    clearable
    :size="size"
    :disabled="!isEditing"
    placeholder=""
    @change="changeHandle"
  >
    <el-option
      v-for="(item,index) in dimLayout.options"
      :key="index"
      :value="item.option_value"
      :label="item.option_name"
      :option-en="item.option_en_name"
    >
      <span
        class="dee-dropdown-span"
        @click="clickOptionHandle(item.option_en_name)"
      >
        {{ item.option_name }}
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
      select: '',
      option_en_name: ''
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        const options = this.dimLayout.options
        const values = options.map(v => v.option_value)
        options.map(v => {
          if (values.includes(n[v.option_en_name])) {
            this.select = n[v.option_en_name]
          } else {
            this.select = ''
          }
        })
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    clickOptionHandle(v) {
      this.option_en_name = v
    },
    changeHandle(v) {
      const options = this.dimLayout.options
      const en = this.option_en_name
      let show_text
      const obj = {}
      options.forEach(v => {
        if (v.option_en_name === en) {
          show_text = v.option_name
        }
        obj[v.option_en_name] = ''
      })
      obj[en] = this.select
      const modifyObj = {
        type: 'single_dropdown',
        value: obj,
        other: {
          en_name: en,
          question_name: this.dimLayout.name,
          question_id: this.dimLayout.id,
          value: this.select,
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
