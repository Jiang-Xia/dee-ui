<template>
  <div
    class="dee-question-wrap dee-multiple-dropdown-wrap"
    :style="questionStyle"
  >
    <h6 class="dee-question-heading">
      <span class="dee-question-no">{{ questionNo }}</span>
      {{ dimLayout.name }}
    </h6>
    <p v-if="dimLayout.remark" class="dee-question-remark">{{ dimLayout.remark }}</p>
    <div class="dee-control-wrap">
      <el-select
        v-model="select"
        clearable
        size="small"
        :disabled="!isEditing"
        @change="changeHandle"
      >
        <el-option
          v-for="(item,index) in dimLayout.options"
          :key="index"
          :value="item.option_value"
          :label="item.option_name"
        >
          <span
            class="dee-dropdown-span"
            @click="clickOptionHandle(item.option_en_name)"
          >
            {{ item.option_name }}
          </span>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeeSingleDropdown',
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
      select: '',
      option_en_name: ''
    }
  },
  computed: {
    questionStyle() {
      const layout = this.dimLayout
      const obj = {}
      if (layout.row_behavior === 1) {
        obj.clear = 'both'
      } else if (layout.row_behavior === 2) {
        obj.clear = 'both'
        obj.width = '100%'
      }
      return obj
    },
    questionNo() {
      const index = this.questionIndex
      return (index < 9) ? (0 + String(index + 1)) : index + 1
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
          }
        })
      }
    }
  },
  created() {
  },
  methods: {
    getRealValue(v) {
      return v
    },
    clickOptionHandle(v) {
      this.option_en_name = v
    },
    changeHandle(v) {
      const options = this.dimLayout.options
      const en = this.option_en_name
      const obj = {}
      options.forEach(v => {
        obj[v.option_en_name] = ''
      })
      obj[en] = this.select
      console.log(obj)
      this.$emit('modify', {
        type: 'single_dropdown',
        en: en,
        value: obj
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  // .multiple-dropdown-wrap{
  //   // float: left;
  //   // width: 50%;
  //   width: 100%;
  // }
</style>
