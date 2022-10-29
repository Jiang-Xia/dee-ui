<template>
  <div class="inline-block" @click.stop="">
    <!-- 文本验证 ：no_limit/number/date/time/datetime/idcard -->
    <el-input
      v-if="cType==='no_limit'||cType==='number'"
      v-model="input"
      :type="cType==='number'?cType:''"
      :maxlength="maxLength"
      :size="size"
      :disabled="!isEditing"
      :placeholder="dimLayout.hint_text"
      @change="changeHandle"
    />
    <el-input
      v-else-if="cType==='idcard'"
      v-model="input"
      :maxlength="maxLength"
      :size="size"
      :disabled="!isEditing"
      :placeholder="dimLayout.hint_text"
      @change="changeHandle"
    />
    <el-input
      v-else-if="cType==='integer'"
      v-model="input"
      type="number"
      :maxlength="maxLength"
      :size="size"
      :disabled="!isEditing"
      :placeholder="dimLayout.hint_text"
      @change="changeHandle"
    />
    <el-date-picker
      v-if="cType==='date'||cType==='datetime'"
      v-model="input"
      :editable="true"
      :type="cType"
      :size="size"
      :disabled="!isEditing"
      :placeholder="cType==='date'?'例：2008-08-08':'例：2008-08-08 00:00:00'"
      @change="changeHandle"
    />
  </div>
</template>

<script>
export default {
  name: 'ShortText',
  props: {
    isEditing: {
      default: false,
      type: Boolean
    },
    value: {
      default: '',
      type: [String, Number]
    },
    // 当前这道题的布局数据
    dimLayout: {
      default: () => { return {} },
      type: Object,
      required: true
    },
    size: {
      default: 'mini',
      type: String
    }
  },
  data() {
    return {
      input: ''
    }
  },
  computed: {
    cType() {
      return this.dimLayout.option_other_text_check
    },
    maxLength() {
      return this.dimLayout.option_other_max_length
    }
  },
  watch: {
    value: {
      handler: function(n) {
        this.input = n
      },
      immediate: true
    }
  },
  created() {
    // console.log(this.dimLayout)
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
      } else if (type === 'number' && this.input) {
        this.input = Number(this.input)
      } else if (type === 'integer' && this.input) {
        this.input = Number(this.input)
        const reg = /^-?[0-9]\d*$/
        if (!reg.test(this.input)) {
          this.$message.warning('请输入整数')
          this.input = ''
          return
        }
      }
      const en = this.dimLayout.option_other_en_name
      const modifyObj = {
        item: this.dimLayout,
        type: 'short_text',
        value: {
          [en]: this.input
        },
        other: {
          en_name: en,
          question_name: this.dimLayout.name,
          question_id: this.dimLayout.id,
          value: this.input,
          show_text: this.input
        }
      }
      this.$emit('modify', modifyObj)
    }
  }
}
</script>
