<template>
  <div class="model-list-wrap">
    <p class="check-model-btn" @click.stop="isShow=!isShow">
      <el-input :value="inputNames" :placeholder="placeholder" readonly size="small" />
    </p>
    <i class="el-icon-arrow-down fr" :style="{transform: !isShow?'translateY(-50%) rotateZ(0deg)':'translateY(-50%) rotateZ(-180deg)'}" />
    <el-collapse-transition>
      <section v-show="isShow" class="table-container" @click.stop="">
        <slot />
      </section>
    </el-collapse-transition>
  </div>
</template>
<script>
export default {
  name: 'DeeTableSelect',
  props: {
    inputNames: {
      default: () => '',
      type: String
    },
    placeholder: {
      default: () => '',
      type: String
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    document.addEventListener('click', () => {
      this.isShow = false
    })
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
        min-height: 4rem;
        max-height: 10rem;
        overflow: auto;
        padding: 8px 0;
        z-index: 3333;
        top: 34px;
        left: 0;
        border:1px solid #E4E7ED;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border-radius: 5px;
    }
</style>
