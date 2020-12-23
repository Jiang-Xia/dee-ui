<template>
  <div
    class="dee-question-wrap dee-multiple-dropdown"
    :style="questionStyle"
    :type="dimLayout.type"
  >
    <h6 class="dee-question-heading">
      <span class="dee-question-no">{{ questionNo }}</span>
      {{ dimLayout.name }}
    </h6>
    <p v-if="dimLayout.remark" class="dee-question-remark">{{ dimLayout.remark }}</p>
    <div class="dee-control-wrap">
      <!-- collapse-tags -->
      <el-select
        v-model="selects"
        size="small"
        multiple
        :disabled="!isEditing"
        :multiple-limit="optionMax?Number(optionMax):0"
        @change="changeHandle"
      >
        <el-option
          v-for="(item,index) in dimLayout.options"
          :key="index"
          :value="item.option_value"
          :label="item.option_name"
          :option-en="item.option_en_name"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
import { commonMixins } from '#/mixins/question-common'

export default {
  name: 'DeeMultipleDropdown',
  mixins: [commonMixins],
  data() {
    return {
      selects: []
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
        const options = this.dimLayout.options
        const values = options.map(v => v.option_value)
        options.map(v => {
          const val = n[v.option_en_name]
          if (values.includes(val)) {
            this.selects.push(val)
          }
        })
      }
    }
  },
  created() {
  },
  methods: {
    // 传参
    getParams(val) {
      const options = this.dimLayout.options
      const obj = {}
      options.forEach(v => {
        if (val.includes(v.option_value)) {
          obj[v.option_en_name] = v.option_value
        } else {
          obj[v.option_en_name] = ''
        }
      })
      return obj
    },
    changeHandle(val) {
      this.$emit('modify', {
        type: 'multiple_dropdown',
        value: this.getParams(this.selects)
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
