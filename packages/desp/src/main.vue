<template>
  <div class="dee-question-wrap dee-desp" :type="dimLayout.type">
    <h6 class="dee-question-heading">{{ dimLayout.name||'段落描述' }}</h6>
  </div>
</template>
<script>
export default {
  name: 'DeeDesp',
  props: {
    dimData: {
      default: () => { return {} },
      type: Object
    },
    dimLayout: {
      default: () => { return {} },
      type: Object
    }
  },
  data() {
    return {
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="scss">
// .dee-desp-wrap{
//   // float: left;
//   width: 100%;
// }
</style>
