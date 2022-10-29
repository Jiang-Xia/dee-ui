<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-03-31 17:35:27
 * @LastEditTime: 2021-08-09 13:59:37
 * @Description:
 * @FilePath: \dee-ui\packages\short-text\src\main.vue
-->
<template>
  <div
    class="dee-question-wrap dee-short-text"
    :type="dimLayout.type"
    :question-en="dimLayout.en_name"
    :style="questionStyle"
    :data-value="verifyValue"
  >
    <div class="dee-question-heading">
      <span v-if="dimLayout.is_required" class="dee-question-sign">*</span>
      <span v-show="questionNo" class="dee-question-no">{{ questionNo }}</span>
      <span class="dee-question-name">{{ dimLayout.name }}</span>
      <slot name="header" :layout="dimLayout">
        <!-- 默认插槽内容 -->
        <!-- $listeners把父组件的事件传过来，子组件只要emit（‘对应事件名’） -->
        <DeeLogPopper v-if="showLog" :dim-layout="dimLayout" v-bind="$attrs" v-on="$listeners" />
      </slot>
    </div>
    <div v-if="dimLayout.remark" class="dee-question-remark" v-html="dimLayout.remark" />
    <div class="dee-control-wrap">
      <!-- 文本验证 ：no_limit/number/date/time/datetime/idcard -->
      <ShortText
        :is-editing="isEditing"
        :dim-layout="dimLayout"
        :dim-data="dimData"
        @modify="inputHandle"
      />
    </div>
  </div>
</template>

<script>
import { commonMixins, relationMixins } from '#/mixins/question-common'
import ShortText from '#/components/controls/short-text'
import * as math from 'mathjs'
// https://mathjs.org/docs/expressions/parsing.html
export default {
  name: 'DeeShortText',
  components: {
    ShortText
  },
  mixins: [commonMixins, relationMixins],
  props: {
    metaTemplate: {
      default: () => { return {} },
      type: Object
    }
  },
  data() {
    return {
      input: ''
    }
  },
  computed: {
    /* 判断空值（即一道题是否一填）*/
    verifyValue() {
      const input = this.dimData[this.dimLayout.en_name]
      return input ? 'value' : 'no_value'
    }
  },
  // mounted() {
  //   console.log(this.metaTemplate)
  // },
  methods: {
    // 判断是否需要计算赋值和计算时间差
    // 当前这道题修改的回调数据
    calculate(qdata) {
      const { calculation_keys, calculation_dict, constants_dict } = this.metaTemplate
      const type = this.dimLayout.text_check
      const dimData = this.dimData
      const id = this.dimLayout.id
      const ids = calculation_keys[id]
      if (['number', 'integer', 'date', 'datetime'].includes(type)) {
        if (ids) {
          for (const id_ of ids) {
            const params = calculation_dict[id_].params
            const rule = calculation_dict[id_].rule
            const targetId = calculation_dict[id_].id
            const targetEn = calculation_dict[id_].en_name
            const targetTextCheck = calculation_dict[id_].text_check
            const visible = { ...constants_dict }
            params.forEach(item => {
              let val = null
              if (id === item.id) {
                val = qdata.value[item.en_name]
              } else {
                val = dimData[item.en_name]
              }
              if (['date', 'datetime'].includes(type)) {
                visible[item.param_name] = val && new Date(val).getTime() / 1000
              } else {
                visible[item.param_name] = val
              }
            })
            // 计算的值
            let calValue = this.parseCalculateMathExp(rule, visible)
            // console.log(value)
            if (calValue !== undefined) {
              if (targetTextCheck === 'integer') {
                calValue = parseInt(calValue)
              }
              // 触发修改数据
              this.$emit('modify', {
                type: 'short_text',
                other: {
                  question_id: targetId
                },
                value: { [targetEn]: calValue }
              })
            }
          }
        }
      }
    },
    /**
     * @description: 解析计算数学表达式
     * @param {*} exp 数学表达式
     * @param {*} scope 根据数学表达式 所需变量
     * @return {*} 正常执行为计算值，报错返回 undefined
     */
    parseCalculateMathExp(exp, scope) {
      // console.log(exp, scope)
      try {
        const value = math.evaluate(exp, scope)
        return value
      } catch (error) {
        console.log('计算异常：', error)
      }
    },
    inputHandle(data) {
      this.$emit('modify', data)
      this.calculate(data)
      this.$nextTick(() => {
        this.$__calcRelationHandle(false)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
