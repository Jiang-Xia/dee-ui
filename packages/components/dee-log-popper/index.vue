<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-07-12 15:49:47
 * @LastEditTime: 2021-07-13 17:12:59
 * @Description:
 * @FilePath: \dee-ui\packages\components\dee-log-popper\index.vue
-->
<template>
  <!-- $atrrs 可以获取到父组件的属性
    $listeners 可以触发父组件的事件
     -->
  <el-popover
    placement="top-start"
    trigger="click"
    popper-class="dee-question-popper"
    @hide="hideHandle"
  >
    <el-scrollbar :style="{height:poperHeight}">
      <div class="dee-question-popper__content">
        <div v-for="(item,index) in contents" :key="index">
          <span class="main-color mg-r-5">{{ item.log_type_cn }}：</span>
          <span class="mg-r-10">{{ item.update_time }}</span>
          <span class="mg-r-10">{{ item.truename }}</span>
          <span>{{ item.log_content }}</span>
        </div>
        <div v-if="!contents.length" class="center">暂无记录</div>
      </div>
    </el-scrollbar>
    <span
      slot="reference"
      class="el-icon-chat-line-square dee-question-name__icon main-color"
      @click="clickHandle"
    />
  </el-popover>
</template>
<script>
export default {
  name: 'DeeLogPopper',
  props: {
    dimLayout: {
      default: () => { return {} },
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    poperHeight() {
      const num = this.contents.length
      if (!num) {
        return 42 + 'px'
      }
      let height = 24 + num * 20
      if (height > 156) {
        height = 156
      } else if (height < 60) {
        height = 60
      }
      return height + 'px'
    },
    contents() {
      const list = this.$attrs['poper-contents'] || []
      return list
    }
  },
  watch: {
  },
  methods: {
    clickHandle() {
      this.visible = !this.visible
      if (this.visible) {
        this.$emit('show-log', this.dimLayout)
      }
    },
    hideHandle() {
      this.visible = !this.visible
    }
  }
}
</script>
