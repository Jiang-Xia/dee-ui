<template>
  <div>
    <section v-for="(item,index) in group_list" :key="item.id+index">
      <h2 class="dim-heading">{{ item.name }}</h2>
      <dee-preview-model
        :field-temp="item.items"
        :dim-data="dimData"
        @modify="modifyHandle"
      />
    </section>
  </div>
</template>
<script>
import FieldTemp from './睡眠呼吸监测.json'
export default {
  data() {
    return {
      previewVisible: false,
      group_list: [],
      dimData: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { group_list } = FieldTemp
      this.previewVisible = true
      this.group_list = group_list
      group_list.forEach((v, i) => {
        v.items.forEach((v2, i2) => {
          if (v2.type === 'long_text') {
            console.log('==============', v2)
          } else {
            // console.log('--------------', v2)
          }
        })
      })
      // console.log(group_list)
      setTimeout(() => {
        this.dimData = {
          pat_name: '江夏',
          pat_work: '程序汪',
          pat_sex: 2,
          sleep_snore: 2,
          sleep_snore_voice: 3,
          sleep_symptom_1: '',
          sleep_symptom_2: '',
          sleep_symptom_3: '',
          sleep_symptom_4: '',
          sleep_symptom_5: 5,
          sleep_symptom_other: '其他输入框',
          'scale_epworth_1#never': 1,
          'scale_epworth_2#few': 2,
          'scale_epworth_4#sometime': 3,
          'scale_epworth_3#often': 4

        }
      }, 1000)
    },
    modifyHandle(data) {
      console.warn('===============')
      console.info('----提交数据中----')
      console.log(data)
      console.info('----提交数据中----')
      console.warn('===============')
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/scss/_mixins";
.dim-heading{
    margin-top: 1rem;
    font-weight: 600;
    font-size: 17px;
    color: $main-color;
    // text-indent: 1em;
  }
</style>
