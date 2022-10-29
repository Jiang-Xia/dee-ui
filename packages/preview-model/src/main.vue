<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-03-31 17:35:27
 * @LastEditTime: 2021-08-06 19:16:13
 * @Description: 所有题型模板
 * @FilePath: \dee-ui\packages\preview-model\src\main.vue
-->
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
        :poper-contents="poperContents"
        :meta-template="metaTemplate"
        @modify="modifyHandle"
        @show-log="showLogHandle"
        @change-id="changeRelationIdHandle"
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
        :poper-contents="poperContents"
        :meta-template="metaTemplate"
        @modify="modifyHandle"
        @show-log="showLogHandle"
        @change-id="changeRelationIdHandle"
      />
      <MultipleChoice
        v-if="item.type==='multiple_choice'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MultipleChoice_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        :poper-contents="poperContents"
        :meta-template="metaTemplate"
        @modify="modifyHandle"
        @show-log="showLogHandle"
        @change-id="changeRelationIdHandle"
      />
      <MultipleDropdown
        v-if="item.type==='multiple_dropdown'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MultipleDropdown_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        :poper-contents="poperContents"
        :meta-template="metaTemplate"
        @modify="modifyHandle"
        @change-id="changeRelationIdHandle"
        @show-log="showLogHandle"
      />
      <SingleChoice
        v-if="item.type==='single_choice'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('SingleChoice_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        :poper-contents="poperContents"
        :meta-template="metaTemplate"
        @modify="modifyHandle"
        @change-id="changeRelationIdHandle"
        @show-log="showLogHandle"
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
        :poper-contents="poperContents"
        :meta-template="metaTemplate"
        @modify="modifyHandle"
        @change-id="changeRelationIdHandle"
        @show-log="showLogHandle"
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
        :poper-contents="poperContents"
        @modify="modifyHandle"
        @show-log="showLogHandle"
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
        :poper-contents="poperContents"
        @modify="modifyHandle"
        @show-log="showLogHandle"
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
        :poper-contents="poperContents"
        @modify="modifyHandle"
        @show-log="showLogHandle"
      />
      <Desp
        v-if="item.type==='desp'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :key="String('Desp_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        :poper-contents="poperContents"
        @modify="modifyHandle"
      />
      <!-- 新增四种题型 -->
      <MatrixSingleDropdown
        v-if="item.type==='matrix_single_dropdown'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MatrixSingleDropdown_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        :poper-contents="poperContents"
        @modify="modifyHandle"
        @show-log="showLogHandle"
      />
      <MatrixMultipleDropdown
        v-if="item.type==='matrix_multiple_dropdown'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MatrixMultipleDropdown_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        :poper-contents="poperContents"
        @modify="modifyHandle"
        @show-log="showLogHandle"
      />
      <MatrixComplexList
        v-if="item.type==='matrix_complex_list'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MatrixComplexList_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        :poper-contents="poperContents"
        @modify="modifyHandle"
      />
      <MatrixComplex
        v-if="item.type==='matrix_complex'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MatrixComplex_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        :poper-contents="poperContents"
        @modify="modifyHandle"
        @show-log="showLogHandle"
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

import MatrixSingleDropdown from '#/matrix-single-dropdown'
import MatrixMultipleDropdown from '#/matrix-multiple-dropdown'
import MatrixComplexList from '#/matrix-complex-list'
import MatrixComplex from '#/matrix-complex'

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
    MatrixSingleChoice,

    MatrixSingleDropdown,
    MatrixMultipleDropdown,
    MatrixComplexList,
    MatrixComplex
  },
  props: {
    // 题型数据
    dimData: {
      default: () => { return {} },
      type: Object,
      required: true
    },
    // 所有模板数据
    metaTemplate: {
      default: () => {
        return {
          // 所有题型模板
          group_list: [],
          // 关联题关联了多少道题的数据和判断显示依据
          relation_dict: {},
          // 当前题型被多少道题关联的id list
          relation_keys: [],
          // 计算赋值数据
          calculation_dict: {},
          calculation_keys: [],
          // 全局常量
          constants_dict: {}
        }
      },
      type: Object,
      required: true
    },
    isEditing: {
      default: true,
      type: Boolean,
      required: true
    },
    // 是否实时交互  可用于控制 是否及时清空
    realTime: {
      default: true,
      type: Boolean
    },
    // 题型 模板
    fieldTemp: {
      default: () => { return [] },
      type: Array,
      required: true
    },
    // 用于控制关联题的局部变量（一个模板一个变量）
    relationIds: {
      default: () => { return [] },
      type: Array,
      required: true
    },
    // 自定义题型id（用于滚动条定位）
    customQuestionId: {
      default: () => '',
      type: [String, Number]
    },
    // 日志气泡数据
    poperContents: {
      default: () => {
        return []
      },
      type: Array
    },
    // 控制日志气泡的显示
    showLog: {
      default: false,
      type: Boolean
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
  },
  methods: {
    // 控制关联题型的显示和隐藏事件回调
    changeRelationIdHandle(data) {
      this.$emit('change-id', data)
    },
    modifyHandle(data) {
      this.$emit('modify', data)
    },
    showLogHandle(val) {
      this.$emit('show-log', val)
    }
  }
}
</script>
