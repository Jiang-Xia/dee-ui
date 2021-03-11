<template>
  <div
    class="dee-question-wrap dee-multiple-dropdown"
    :style="questionStyle"
    :type="dimLayout.type"
    :data-value="verifyValue"
  >
    <div class="dee-question-heading">
      <span v-if="dimLayout.is_required" class="dee-question-sign">*</span>
      <span v-show="questionNo" class="dee-question-no">{{ questionNo }}</span>
      <span class="dee-question-name">{{ dimLayout.name }}</span>

    </div>
    <div v-if="dimLayout.remark" class="dee-question-remark" v-html="dimLayout.remark" />
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
    </div>
  </div>
</template>

<script>
import { commonMixins } from '#/mixins/question-common'
export default {
  name: 'DeeSingleDropdown',
  mixins: [commonMixins],
  data() {
    return {
      select: '',
      option_en_name: ''
    }
  },
  computed: {
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
      const obj = {}
      options.forEach(v => {
        obj[v.option_en_name] = ''
      })
      obj[en] = this.select
      // console.log(obj)
      this.$emit('modify', {
        type: 'single_dropdown',
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
