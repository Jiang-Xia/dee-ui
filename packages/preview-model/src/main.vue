<template>
  <div class="dee-preview-model-container clearfix">
    <template v-for="(item,index) in fieldTemp">
      <LongText
        v-if="item.type==='long_text'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="'q'+item.id+'-'+item.pid"
        :key="String('LongText_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <ShortText
        v-if="item.type==='short_text'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="'q'+item.id+'-'+item.pid"
        :key="String('ShortText_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <MultipleChoice
        v-if="item.type==='multiple_choice'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="'q'+item.id+'-'+item.pid"
        :key="String('MultipleChoice_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :relation-dict="relationDict"
        :relation-keys="relationKeys"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
        @change-id="changeRelationIdHandle"
      />
      <MultipleDropdown
        v-if="item.type==='multiple_dropdown'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="'q'+item.id+'-'+item.pid"
        :key="String('LongText_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <SingleChoice
        v-if="item.type==='single_choice'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="'q'+item.id+'-'+item.pid"
        :key="String('SingleChoice_'+index)"
        id-editing
        :dim-layout="item"
        :dim-data="dimData"
        :relation-dict="relationDict"
        :relation-keys="relationKeys"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
        @change-id="changeRelationIdHandle"
      />
      <SingleDropdown
        v-if="item.type==='single_dropdown'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="'q'+item.id+'-'+item.pid"
        :key="String('SingleDropdown_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <MatrixMultipleChoice
        v-if="item.type==='matrix_multiple_choice'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="'q'+item.id+'-'+item.pid"
        :key="String('MatrixMultipleChoice_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <MatrixInput
        v-if="item.type==='matrix_input'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="'q'+item.id+'-'+item.pid"
        :key="String('MatrixInput_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <MatrixSingleChoice
        v-if="item.type==='matrix_single_choice'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="'q'+item.id+'-'+item.pid"
        :key="String('MatrixSingleChoice_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <Desp
        v-if="item.type==='desp'"
        :key="String('LongText_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
    </template>
  </div>
</template>

<script>
import LongText from '#/long-text'
import ShortText from '#/short-text'
import MultipleChoice from '#/multiple-choice'
import MultipleDropdown from '#/multiple-dropdown'
import SingleChoice from '#/single-choice'
import SingleDropdown from '#/single-dropdown'
import Desp from '#/desp'
import MatrixMultipleChoice from '#/matrix-multiple-choice'
import MatrixInput from '#/matrix-input'
import MatrixSingleChoice from '#/matrix-single-choice'
export default {
  name: 'DeePreviewModel',
  components: {
    ShortText,
    LongText,
    MultipleChoice,
    MultipleDropdown,
    SingleChoice,
    SingleDropdown,
    Desp,
    MatrixMultipleChoice,
    MatrixInput,
    MatrixSingleChoice
  },
  props: {
    dimData: {
      default: () => { return {} },
      type: Object
    },
    isEditing: {
      default: true,
      type: Boolean
    },
    fieldTemp: {
      default: () => { return [] },
      type: Array,
      required: true
    },
    // 被关联题型的数据  只有单项选择题和多项选择题才需要
    relationList: {
      default: () => { return [] },
      type: Array
    },
    relationDict: {
      default: () => { return {} },
      type: Object
    },
    relationKeys: {
      default: () => { return {} },
      type: Object
    }
  },
  data() {
    return {
      // 用于控制关联题的显示和隐藏
      relationIds: []
    }
  },
  watch: {
    dimData: {
      handler: function(n) {
        // console.log(n)
      },
      immediate: true
    },

    fieldTemp: {
      handler: function(n) {
        // console.log(n)
      },
      immediate: true
    },
    relationIds: {
      handler: function(n) {
        console.log('=============', n)
      }
    }
  },
  mounted() {
    // const dom = document.querySelector('#q19-12')
    // dom.style.display = 'block'
    // console.log(dom)
  },
  methods: {
    getRelationData(item) {
      const arr = ['multiple_choice', 'single_choice']
      let list = []
      if (arr.includes(item.type)) {
        list = this.relationList.filter(v => {
          return item.id === v.id
        })
      }
      if (list.length) {
        return list[0]
      }
    },
    changeRelationIdHandle({ id, type }) {
      // console.log(id, type)
      if (type === 'add' && !this.relationIds.includes(id)) {
        this.relationIds.push(id)
      } else if (type === 'remove' && this.relationIds.includes(id)) {
        this.relationIds.splice(this.relationIds.indexOf(id), 1)
      }
      // console.log('=============', this.relationIds)
    },
    modifyHandle(data) {
      this.$emit('modify', data)
      // console.log('=============')
      // console.log(data)
      // console.log('=============')
    }
  }
}
</script>
