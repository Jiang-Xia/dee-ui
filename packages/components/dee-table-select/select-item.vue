<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-03-31 17:35:26
 * @LastEditTime: 2021-07-29 17:08:01
 * @Description:
 * @FilePath: \dee-ui\packages\components\dee-table-select\select-item.vue
-->
<template>
  <div class="xia-select-item">
    <el-checkbox v-model="value">{{ $attrs.label }}</el-checkbox>
  </div>
</template>
<script>
export default {
  name: 'SelectItem',
  //   props: {
  //     value: {
  //       default: false,
  //       type: Boolean
  //     }
  //   },
  data() {
    return {

    }
  },
  computed: {
    value: {
      get: function() {
        return this.$attrs.value
      },
      set: function(val) { this.$emit('input', val) }
    }
  },
  methods: {
    handleScroll(e) {
      // console.log(e)
    }
  }
}
</script>
<style lang="scss" scoped>
.xia-select-item{
  padding: 0 20px;
  line-height: 34px;
  &:hover{
    background-color: #f5f7fa;
  }
}
</style>
