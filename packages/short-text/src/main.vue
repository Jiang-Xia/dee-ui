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
import { commonMixins } from '#/mixins/question-common'
import ShortText from '#/components/controls/short-text'
export default {
  name: 'DeeShortText',
  components: {
    ShortText
  },
  mixins: [commonMixins],
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
  methods: {
    inputHandle(data) {
      this.$emit('modify', data)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
