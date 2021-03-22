<template>
  <div
    class="dee-question-wrap dee-multiple-dropdown"
    :style="questionStyle"
    :type="dimLayout.type"
    :data-value="verifyValue"
  >
    <div class="dee-question-heading">
      <span v-if="dimLayout.is_required" class="dee-question-sign">*</span>
      <span v-show="questionNo" class="dee-question-no">{{ questionNo }}</span>
      <span class="dee-question-name">{{ dimLayout.name }}</span>
    </div>
    <div v-if="dimLayout.remark" class="dee-question-remark" v-html="dimLayout.remark" />
    <div class="dee-control-wrap">
      <MultipleDropdown
        :is-editing="isEditing"
        :dim-layout="dimLayout"
        :dim-data="dimData"
        @modify="multipleHandle"
      />
    </div>
  </div>
</template>

<script>
import { commonMixins } from '#/mixins/question-common'
import MultipleDropdown from '#/components/controls/multiple-dropdown'
export default {
  name: 'DeeMultipleDropdown',
  components: {
    MultipleDropdown
  },
  mixins: [commonMixins],
  data() {
    return {
    }
  },
  computed: {
    /* 判断空值（即一道题是否一填）*/
    verifyValue() {
      const data = this.dimData
      const checked = this.dimLayout.options.every(v => {
        return data[v.option_en_name] === '' || data[v.option_en_name] === undefined
      })
      return checked ? 'no_value' : 'value'
    }
  },
  methods: {
    multipleHandle(data) {
      this.$emit('modify', data)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
