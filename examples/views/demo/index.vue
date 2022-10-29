<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-03-31 17:35:26
 * @LastEditTime: 2021-07-29 17:15:10
 * @Description:
 * @FilePath: \dee-ui\examples\views\demo\index.vue
-->
<template>
  <div class="demo-container">
    <DeeTableSelect
      v-model="inputNames"
    >

      <SelectItem
        v-for="(item,index) of list"
        :key="index"
        v-model="item.value"
        :label="item.label"
        @input="inputchange"
      />

    </DeeTableSelect>
  </div>
</template>
<script>
import DeeTableSelect from '#/components/dee-table-select'
import SelectItem from '#/components/dee-table-select/select-item'
export default {
  components: {
    DeeTableSelect,
    SelectItem
  },
  data() {
    return {
      inputNames: 1,
      list: [{ label: 'label', value: false }, { label: 'label2', value: true }]
    }
  },
  methods: {
    inputchange() {
      console.log(this.list)
    }
  }
}
</script>
<style lang="scss" scoped>
.demo-container{
  padding: 20px;
  min-height:600px;
}
</style>
