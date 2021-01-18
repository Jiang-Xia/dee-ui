<template>
  <div class="dee-preview-model-container clearfix">
    <template v-for="(item,index) in fieldTemp">
      <LongText
        v-if="item.type==='long_text'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
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
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
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
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
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
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
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
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
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
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
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
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
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
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
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
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
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
      type: Object,
      required: true
    },
    isEditing: {
      default: true,
      type: Boolean
    },
    // 是否实时交互  可用于控制 是否及时清空
    realTime: {
      default: true,
      type: Boolean
    },
    fieldTemp: {
      default: () => { return [] },
      type: Array,
      required: true
    },
    // 用于控制关联题的局部变量（一个模板一个变量）
    relationIds: {
      default: () => { return [] },
      type: Array
    },
    // 关联题关联了多少道题的数据和判断显示依据
    relationDict: {
      default: () => { return {} },
      type: Object
    },
    // 当前题型被多少道题关联的id list
    relationKeys: {
      default: () => { return {} },
      type: Object
    },
    customQuestionId: {
      default: () => '',
      type: [String, Number]
    }
  },
  data() {
    return {
    }
  },
  computed: {
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
    }
    // relationIds: {
    //   handler: function(n) {
    //     console.log(n)
    //   },
    //   immediate: true
    // }
  },
  methods: {
    // 控制关联题型的显示和隐藏事件回调
    changeRelationIdHandle(data) {
      this.$emit('change-id', data)
    },
    modifyHandle(data) {
      this.$emit('modify', data)
    }
  }
}
</script>
