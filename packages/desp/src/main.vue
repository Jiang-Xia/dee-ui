<template>
  <div class="dee-question-wrap dee-desp" :type="dimLayout.type">
    <h6 class="dee-question-heading">{{ dimLayout.name||'段落描述' }}</h6>
  </div>
</template>
<script>
export default {
  name: 'DeeDesp',
  props: {
    dimLayout: {
      default: () => { return {} },
      type: Object
    }
  }
}
</script>
<style lang="scss">
// .dee-desp-wrap{
//   // float: left;
//   width: 100%;
// }
</style>
