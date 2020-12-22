<template>
  <div
    class="dee-question-wrap dee-long-text-wrap"
    :type="dimLayout.type"
    :question-en="dimLayout.en_name"
  >
    <h6 class="dee-question-heading">
      <span class="dee-question-no">{{ questionNo }}</span>
      {{ dimLayout.name }}
    </h6>
    <p v-if="dimLayout.remark" class="dee-question-remark">{{ dimLayout.remark }}</p>
    <div class="dee-control-wrap">
      <el-input
        v-model="textarea"
        :disabled="!isEditing"
        :row="2"
        type="textarea"
        size="small"
        :rows="dimLayout.max_line_count?dimLayout.max_line_count:2"
        @change="changeHandle"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeeLongText',
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
      textarea: ''
    }
  },
  computed: {
    questionNo() {
      const index = this.questionIndex
      return (index < 9) ? (0 + String(index + 1)) : index + 1
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
    getRealValue(v) {
      return v
    },
    changeHandle(v) {
      const en = this.dimLayout.en_name
      this.$emit('modify', {
        type: 'long_text',
        en: en,
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
