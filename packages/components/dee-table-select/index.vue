<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-03-31 17:35:26
 * @LastEditTime: 2021-07-29 17:58:45
 * @Description:
 * @FilePath: \dee-ui\packages\components\dee-table-select\index.vue
-->
<template>
  <div class="model-list-wrap">
    <p class="check-model-btn" @click.stop="isShow=!isShow">
      <el-input
        v-model="value"
        :placeholder="placeholder"
        size="small"
      />
      <span class="xia-tags">
        <span class="xia-tags" />
      </span>
    </p>
    <i class="el-icon-arrow-down fr" :style="{transform: !isShow?'translateY(-50%) rotateZ(0deg)':'translateY(-50%) rotateZ(-180deg)'}" />
    <transition name="el-fade-in-linear">
      <section v-show="isShow" class="table-container" :style="{height:height}" @click.stop="">
        <el-scrollbar class="xia-scrollbar">
          <slot />
        </el-scrollbar>
      </section>
    </transition>
  </div>
</template>
<script>
// 未使用
export default {
  name: 'DeeTableSelect',
  components: {
  },
  props: {
    placeholder: {
      default: () => '',
      type: String
    },
    height: {
      default: () => '2rem',
      type: String
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    value: {
      get: function() { return this.$attrs.value },
      set: function(val) { this.$emit('input', val) }
    },
    tags() {
      const list = this.$slots.default.filter(v => v.data.model)
      return list
    }
  },
  mounted() {
    document.addEventListener('click', () => {
      this.isShow = false
    })
  },
  methods: {
    handleScroll(e) {
      // console.log(e)
    }
  }
}
</script>
<style lang="scss" scoped>
    .model-list-wrap{
        position: relative;
    }
    .check-model-btn{
        width: 100%;
        height: 32px;
        color: #909399;
    }
    .el-icon-arrow-down{
        transition: transform  .3s;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.5rem;
        background-color: #fff;
        color: #c0c4cc;
    }
    .table-container{
        width: 100%;
        position: absolute;
        background-color: #fff;
        min-height: 5rem;
        max-height: 20rem;
        // overflow: auto;
        padding: 8px 0;
        z-index: 3333;
        top: 34px;
        left: 0;
        border:1px solid #E4E7ED;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border-radius: 5px;
        .xia-scrollbar{
          height: 100%;
        }
    }
</style>
