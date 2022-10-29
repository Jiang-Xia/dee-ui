<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-03-31 17:35:27
 * @LastEditTime: 2021-08-06 16:46:53
 * @Description:
 * @FilePath: \dee-ui\packages\single-dropdown\src\main.vue
-->
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
      <slot name="header" :layout="dimLayout">
        <DeeLogPopper v-if="showLog" :dim-layout="dimLayout" v-bind="$attrs" v-on="$listeners" />
      </slot>
    </div>
    <div v-if="dimLayout.remark" class="dee-question-remark" v-html="dimLayout.remark" />
    <div class="dee-control-wrap">
      <SingleDropdown
        :is-editing="isEditing"
        :dim-layout="dimLayout"
        :dim-data="dimData"
        @modify="singleHandle"
      />
    </div>
  </div>
</template>

<script>
import { commonMixins, relationMixins } from '#/mixins/question-common'
import SingleDropdown from '#/components/controls/single-dropdown'
export default {
  name: 'DeeSingleDropdown',
  components: {
    SingleDropdown
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
    }
  },
  computed: {
    /* 判断空值（即一道题是否已填）*/
    verifyValue() {
      const data = this.dimData
      // 有一个成立即返回true
      const checked = this.dimLayout.options.some(v => {
        return !['', null, undefined].includes(data[v.option_en_name])
      })
      return checked ? 'value' : 'no_value'
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        // this.$__calcRelationHandle()
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    singleHandle(data) {
      this.$emit('modify', data)
      this.$nextTick(() => {
        this.$__calcRelationHandle(false)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
