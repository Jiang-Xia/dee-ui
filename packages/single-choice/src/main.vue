<template>
  <div
    class="dee-question-wrap dee-single-choice"
    :style="questionStyle"
    :type="dimLayout.type"
  >
    <h6 class="dee-question-heading">
      <span v-if="dimLayout.is_required" class="dee-question-sign">*</span>
      <span v-show="questionNo" class="dee-question-no">{{ questionNo }}</span>
      <span class="dee-question-name">{{ dimLayout.name }}</span>
    </h6>
    <div v-if="dimLayout.remark" class="dee-question-remark" v-html="dimLayout.remark" />
    <div class="dee-control-wrap">
      <el-radio-group
        v-model="radio"
        :disabled="!isEditing"
      >
        <el-radio
          v-for="(item,index) in dimLayout.options"
          :key="index"
          :label="item.option_value"
          :disabled="!isEditing"
          :option-en="item.option_en_name"
          :style="controlStyle"
          @click.native.prevent="clickHandle(item.option_value,item)"
        >
          <span>{{ item.option_name }}</span>
          <!-- 其他选项 -->
          <input
            v-if="item.option_other_is_editable"
            v-model="option_other_value"
            :disabled="!isEditing"
            class="dee-input__underline"
            :option-en="item.option_other_en_name"
            size="mini"
            @click.stop=""
            @change="otherChangeHandle(item.option_value,item)"
          >
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import { commonMixins, relationMixins } from '#/mixins/question-common'
import { isMobile } from '#/utils/common'
export default {
  name: 'DeeSingleChoice',
  mixins: [commonMixins, relationMixins],
  props: {
    relationDict: {
      default: () => { return {} },
      type: Object
    },
    relationKeys: {
      default: () => { return {} },
      type: Object
    }
  },
  data() {
    return {
      radio: '',
      option_en_name: '',
      option_other_value: ''
    }
  },
  computed: {
    controlStyle() {
      let obj = {}
      if (!isMobile()) {
        obj = {
          width: 100 / this.optionCount + '%',
          marginRight: this.optionCount === -1 ? '1rem' : '0'
        }
      }
      return obj
    },
    optionCount() {
      return this.dimLayout.line_option_count
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        const options = this.dimLayout.options
        const values = options.map(v => v.option_value)
        options.map(v => {
          if (values.includes(n[v.option_en_name])) {
            this.radio = n[v.option_en_name]
          } else {
            this.radio = ''
          }
          // 其他项
          if (v.option_other_is_editable) {
            this.option_other_value = n[v.option_other_en_name]
          }
        })
        this.$__calcRelationHandle()
        // console.log(this.radio)
      }
    }
  },
  created() {
  },
  methods: {
    otherChangeHandle(rV, item) {
      // 选择其他项时 return
      if (this.radio !== rV) return
      const obj = this.getParams(rV, item)
      this.$emit('modify', {
        type: 'single_choice',
        value: obj
      })
    },
    getParams(v, item) {
      const options = this.dimLayout.options
      const obj = {}
      options.map(oItem => {
        obj[oItem.option_en_name] = ''
        // 判断是否勾选了其他项
        if (oItem.option_other_is_editable && oItem.option_value === v) {
          obj[oItem.option_other_en_name] = this.option_other_value
        }
      })
      obj[this.option_en_name ] = this.radio
      return obj
    },
    clickHandle(v, item) {
      if (!this.isEditing) return
      const en = item.option_en_name
      this.radio = v === this.radio ? '' : v
      this.option_en_name = en
      const obj = this.getParams(v, item)
      // console.log(obj)
      this.$emit('modify', {
        type: 'single_choice',
        value: obj
      })
      this.$__calcRelationHandle()
    }
  }
}
</script>
<style lang="scss" scoped>
// .single-choice-wrap{
//   width: 100%;
// }
</style>
