<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-03-31 17:35:26
 * @LastEditTime: 2021-08-06 18:05:53
 * @Description:
 * @FilePath: \dee-ui\packages\long-text\src\main.vue
-->
<template>
  <div
    class="dee-question-wrap dee-long-text"
    :type="dimLayout.type"
    :question-en="dimLayout.en_name"
    :data-value="verifyValue"
  >
    <div class="dee-question-heading">
      <span v-if="dimLayout.is_required" class="dee-question-sign">*</span>
      <span v-show="questionNo" class="dee-question-no">{{ questionNo }}</span>
      <span class="dee-question-name">{{ dimLayout.name }}</span>
      <slot name="header" :layout="dimLayout">
        <DeeLogPopper v-if="showLog" :dim-layout="dimLayout" v-bind="$attrs" v-on="$listeners" />
      </slot>
    </div>
    <div v-if="dimLayout.remark" class="dee-question-remark" v-html="dimLayout.remark" />
    <div class="dee-control-wrap">
      <el-input
        v-model="textarea"
        :disabled="!isEditing"
        type="textarea"
        size="small"
        :rows="dimLayout.max_line_count?dimLayout.max_line_count:2"
        @change="changeHandle"
      />
    </div>
  </div>
</template>

<script>
import { commonMixins, relationMixins } from '#/mixins/question-common'
export default {
  name: 'DeeLongText',
  mixins: [commonMixins, relationMixins],
  props: {
    metaTemplate: {
      default: () => { return {} },
      type: Object
    }
  },
  data() {
    return {
      textarea: ''
    }
  },
  computed: {
    /* 判断空值（即一道题是否一填）*/
    verifyValue() {
      return this.textarea ? 'value' : 'no_value'
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        // console.log('============')
        // console.log(n)
        this.textarea = n[this.dimLayout.en_name]
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    changeHandle(v) {
      const en = this.dimLayout.en_name
      this.$emit('modify', {
        type: 'long_text',
        value: {
          [en]: this.textarea
        },
        other: {
          en_name: en,
          question_name: this.dimLayout.name,
          question_id: this.dimLayout.id,
          value: this.textarea,
          show_text: this.textarea
        }
      })
      this.$nextTick(() => {
        this.$__calcRelationHandle(false)
      })
    }
  }
}
</script>
<style lang="scss">

</style>
