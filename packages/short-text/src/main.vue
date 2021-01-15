<template>
  <div
    class="dee-question-wrap dee-short-text"
    :type="dimLayout.type"
    :question-en="dimLayout.en_name"
    :style="questionStyle"
  >
    <h6 class="dee-question-heading">
      <span v-if="dimLayout.is_required" class="dee-question-sign">*</span>
      <span v-show="questionNo" class="dee-question-no">{{ questionNo }}</span>
      <span class="dee-question-name">{{ dimLayout.name }}</span>
    </h6>
    <div v-if="dimLayout.remark" class="dee-question-remark" v-html="dimLayout.remark" />
    <div class="dee-control-wrap">
      <!-- 文本验证 ：no_limit/number/date/time/datetime/idcard -->
      <el-input
        v-if="cType==='no_limit'||cType==='number'"
        v-model="input"
        :type="cType==='number'?cType:''"
        :maxlength="dimLayout.max_length"
        size="small"
        :disabled="!isEditing"
        @change="changeHandle"
      />
      <el-input
        v-else-if="cType==='idcard'"
        v-model="input"
        :maxlength="dimLayout.max_length"
        size="small"
        :disabled="!isEditing"
        @change="changeHandle"
      />
      <el-date-picker
        v-if="cType==='date'||cType==='datetime'"
        v-model="input"
        :editable="false"
        :type="dimLayout.text_check"
        size="small"
        :disabled="!isEditing"
        :placeholder="dimLayout.text_check==='date'?'例：2008-08-08':'例：2008-08-08 00:00:00'"
        @change="changeHandle"
      />
    </div>
  </div>
</template>

<script>
import { commonMixins } from '#/mixins/question-common'
export default {
  name: 'DeeShortText',
  mixins: [commonMixins],
  data() {
    return {
      input: ''
    }
  },
  computed: {
    cType() {
      return this.dimLayout.text_check
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        // console.log('============')
        // console.log(n)
        this.input = n[this.dimLayout.en_name]
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    // 自定义日期格式
    p(s) {
      return s < 10 ? '0' + s : s
    },
    getCustomDateFormat(val) {
      if (val instanceof Date) {
        const d = new Date(val)
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
        const type = this.cType
        if (type === 'date') {
          val = resDate
        } else if (type === 'datetime') {
          val = resDate + ' ' + resTime
        }
      }
      return val
    },
    validatorIDCard(IDCard) {
      const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
      if (!reg.test(IDCard)) {
        this.$message.warning('请输入正确的身份证号码')
      } else {
        return true
      }
    },
    changeHandle(v) {
      const type = this.cType
      if (type === 'idcard') {
        if (!this.validatorIDCard(v)) return
      } else if (type === 'date' || type === 'datetime') {
        this.input = this.getCustomDateFormat(v)
      }
      const en = this.dimLayout.en_name
      this.$emit('modify', {
        type: 'long_text',
        value: {
          [en]: this.input
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// .short-text-wrap{
//   // float: left;
//   // width: 50%;
//   width: 100%;
// }
</style>
