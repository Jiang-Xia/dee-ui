<template>
  <div>
    <div>
      {{ userAgent }}
    </div>
    <section v-for="(item,index) in group_list" :key="item.id+index">
      <h2 class="dim-heading">{{ item.name }}</h2>
      <dee-preview-model
        :field-temp="item.items"
        :relation-dict="relationDict"
        :relation-keys="relationKeys"
        :relation-ids="relationIds"
        :real-time="realTime"
        :dim-data="dimData"
        :is-editing="true"
        custom-question-id="q"
        @modify="modifyHandle"
        @change-id="changeRelationIdHandle"
      />
    </section>
  </div>
</template>
<script>
// import FieldTemp from './睡眠呼吸监测.json'
// import FieldTemp from './睡眠呼吸监测问卷2.json'
import FieldTemp from './档案信息.json'
export default {
  data() {
    return {
      previewVisible: false,
      group_list: [],
      dimData: {},
      relationDict: {},
      relationKeys: {},
      userAgent: '',
      relationIds: [],
      realTime: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const {
        group_list,
        relation_dict,
        relation_keys
      } = FieldTemp
      this.previewVisible = true
      this.group_list = group_list
      this.relationDict = relation_dict
      this.relationKeys = relation_keys
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
          // diag_lung_cancer: 1,
          diag_nasopharyngeal_cancer: 3,
          dp_cc_tumor_location: 3,
          sleep_snore: 2,
          sleep_snore_voice: 3,
          sleep_symptom_1: '',
          sleep_symptom_2: 2,
          sleep_symptom_3: '',
          sleep_symptom_4: '',
          sleep_symptom_5: 5,
          treat_diet_rw: 1,
          diag_cancer_text: '其他输入框',
          'first#complaint': '恢复',
          'enzymology_ast#one': 1,
          'follow_first#follow_h_abd_pain': 2,
          'follow_second#follow_h_abd_pain': 2,
          'follow_third#follow_h_abd_pain': 2

        }
      }, 1000)
    },
    // 总数据修改回调
    modifyHandle(data) {
      const obj = { ...this.dimData }
      for (const k in data.value) {
        obj[k] = data.value[k]
      }
      this.dimData = obj
      // console.warn('===============')
      // console.log(this.dimData)
      // console.warn('===============')
    },
    // 控制关联题显示隐藏事件回调
    changeRelationIdHandle(data) {
      const { id, type } = data
      const relationIds = [...this.relationIds]
      if (type === 'add' && !relationIds.includes(id)) {
        relationIds.push(id)
        this.relationIds = relationIds
      } else if (type === 'remove' && relationIds.includes(id)) {
        relationIds.splice(relationIds.indexOf(id), 1)
        this.relationIds = relationIds
        // 是实时交互的话，就清空
        if (this.realTime) {
          this.clearDimData(id)
        }
      }
      // console.log(data, relationIds)
    },
    // 清空dimData 触发事件和后台交互
    clearDimData(id) {
      let fieldTemp = []
      this.group_list.forEach(v => {
        v.items.forEach(v2 => {
          fieldTemp.push(v2)
        })
      })
      fieldTemp = fieldTemp.filter(v => v.exist_relation_items && v.id === id)
      const itemData = fieldTemp[0]
      const { type, matrix_rows, matrix_cols } = itemData
      const clearObj = { type }
      if (['long_text', 'short_text'].includes(type)) {
        clearObj.value = { [itemData.en_name]: '' }
      } else if (['multiple_choice', 'multiple_dropdown', 'single_choice', 'single_dropdown'].includes(type)) {
        const obj = {}
        itemData.options.forEach(v => { obj[v.option_en_name] = '' })
        clearObj.value = obj
      } else if (['matrix_multiple_choice', 'matrix_input', 'matrix_single_choice'].includes(type)) {
        const obj = {}
        matrix_rows.forEach(row => {
          matrix_cols.forEach(col => {
            obj[row.en_name + '#' + col.en_name] = ''
          })
        })
        clearObj.value = obj
      }
      this.modifyHandle(clearObj)
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
