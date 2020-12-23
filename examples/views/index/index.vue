<template>
  <div>
    <div>
      {{ userAgent }}
    </div>
    <section v-for="(item,index) in group_list" :key="item.id+index">
      <h2 class="dim-heading">{{ item.name }}</h2>
      <dee-preview-model
        :field-temp="item.items"
        :dim-data="dimData"
        :is-editing="true"
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
      dimData: {},
      userAgent: this.$isMobile()
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
      // console.log(group_list)
      setTimeout(() => {
        this.dimData = {
          pat_name: '江夏',
          pat_work: '程序汪',
          pat_sex: 2,
          hnow_first: '没有哦',
          symptom_thin: 2,
          diag_intestinal_polyposis: 1,
          diag_fap: 2,
          diag_ibd: 3,
          diag_lung_cancer: 1,
          diag_nasopharyngeal_cancer: 3,
          dp_cc_tumor_location: 3,
          sleep_snore: 2,
          sleep_snore_voice: 3,
          sleep_symptom_1: '',
          sleep_symptom_2: '',
          sleep_symptom_3: '',
          sleep_symptom_4: '',
          sleep_symptom_5: 5,
          sleep_symptom_other: '其他输入框',
          'first#complaint': '恢复',
          'enzymology_ast#one': 1,
          'follow_first#follow_h_abd_pain': 2,
          'follow_second#follow_h_abd_pain': 2,
          'follow_third#follow_h_abd_pain': 2

        }
      }, 1000)
    },
    modifyHandle(data) {
      console.warn('===============')
      console.log(data)
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
    margin-left: -0.5rem;
  }
</style>
