<template>
  <div
    class="dee-question-wrap dee-long-text"
    :type="dimLayout.type"
    :question-en="dimLayout.en_name"
  >
    <h6 class="dee-question-heading">
      <span v-if="dimLayout.is_required" class="dee-question-sign">*</span>
      <span v-show="questionNo" class="dee-question-no">{{ questionNo }}</span>
      <span class="dee-question-name">{{ dimLayout.name }}</span>
    </h6>
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
import { commonMixins } from '#/mixins/question-common'
export default {
  name: 'DeeLongText',
  mixins: [commonMixins],
  data() {
    return {
      textarea: ''
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        // console.log('============')
        // console.log(n)
        this.textarea = n[this.dimLayout.en_name]
      }
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
        }
      })
    }
  }
}
</script>
<style lang="scss">
// .dee-long-text-wrap{
//   // float: left;
//   width: 100%;
// }
</style>
