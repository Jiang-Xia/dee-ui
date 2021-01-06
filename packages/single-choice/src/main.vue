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
import { commonMixins } from '#/mixins/question-common'
export default {
  name: 'DeeSingleChoice',
  mixins: [commonMixins],
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
      return {
        width: 100 / this.optionCount + '%',
        marginRight: this.optionCount === -1 ? '1rem' : '0'
      }
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
          }
          // 其他项
          if (v.option_other_is_editable) {
            this.option_other_value = n[v.option_other_en_name]
          }
        })
        this.calcRelation()
        // console.log(this.radio)
      }
    }
  },
  created() {
  },
  methods: {
    /*
      联动题 开始
    */
    // 获取关联题目
    calcRelation() {
      const id = this.dimLayout.id
      const ids = this.relationKeys[id]
      if (ids) {
        for (const id_ of ids) {
          const obj = this.relationDict[id_].relation_items
          const relation = this.relationDict[id_].relation
          if (this.getMultiQuestionLogic(obj, relation)) {
            this.$emit('change-id', { id: id_, type: 'add' })
          } else {
            this.$emit('change-id', { id: id_, type: 'remove' })
          }
        }
      }
    },
    // 判断选项是否存在
    isExisted(checkedVals, relationVals) {
      return checkedVals.some((v) => {
        return relationVals.includes(v)
      })
    },
    /*
     *  返回值 就是判断多题逻辑的结果
    */
    getMultiQuestionLogic(obj, relation) {
      const checkedVals = this.dimLayout.options.filter(v => v.option_value === this.radio).map(v => v.option_value)
      const boolObj = {}
      for (const k in obj) {
        const relationVals = obj[k].option_list.map(v => v.option_value)
        boolObj[k] = this.isExisted(checkedVals, relationVals)
      }
      if (relation === 'and') {
        // 有一个不为true 就返回false
        for (const k in obj) {
          if (!boolObj[k]) {
            return false
          }
        }
        return true
      } else if (relation === 'or') {
        // 有一个为true 就返回 true
        for (const k in obj) {
          if (boolObj[k]) {
            return true
          }
        }
        return false
      }
    },
    /*
      联动题 结束
    */
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
      this.calcRelation()
      // console.log(obj)
      this.$emit('modify', {
        type: 'single_choice',
        value: obj
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// .single-choice-wrap{
//   width: 100%;
// }
</style>
