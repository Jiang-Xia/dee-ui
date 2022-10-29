<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-08-04 16:14:49
 * @LastEditTime: 2021-08-04 17:11:36
 * @Description: 图片查看器
 * @FilePath: \dee-ui\packages\components\img-look\main.vue
-->
<template>
  <div v-if="show" class="img-look">
    <img :src="src" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      src: ''
    }
  },
  methods: {
    showImgLook({ dom }) {
      this.show = true
      this.src = dom.getAttribute('src')
      this.$nextTick(() => {
        this.$el.addEventListener('click', () => {
          this.show = false
        })
      })
    },
    hideImgLook() {
      this.show = false
    },
    destoryImgLook() {
      this.$destroy()
    }
  }
}
</script>

<style lang='scss'>
.img-look{
    position:fixed;
    left:0;
    top:0;
    z-index:1000;
    height:100%;
    width:100%;
    img{
      position:fixed;
      left:50%;
      top:50%;
      max-height: 80%;
      transform: translate(-50%,-50%);
      border-radius: 3px;
    }
}
</style>
