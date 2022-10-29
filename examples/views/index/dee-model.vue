<template>
  <div class="dee-preview-model-container clearfix">
    <template v-for="(item,index) in fieldTemp">
      <DeeLongText
        v-if="item.type==='long_text'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('LongText_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
        @show-log="showlogHandle"
      />
      <DeeShortText
        v-if="item.type==='short_text'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('ShortText_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
        @show-log="showlogHandle"
      >
        <!-- <template v-slot:header="slotProps">
          <span class="el-icon-edit edit-rule" @click="clickHandle(slotProps)" />
        </template> -->
      </DeeShortText>
      <DeeMultipleChoice
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
        @show-log="showlogHandle"
        @change-id="changeRelationIdHandle"
      />
      <DeeMultipleDropdown
        v-if="item.type==='multiple_dropdown'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MultipleDropdown_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :relation-dict="relationDict"
        :relation-keys="relationKeys"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
        @show-log="showlogHandle"
        @change-id="changeRelationIdHandle"
      />
      <DeeSingleChoice
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
        @show-log="showlogHandle"
        @change-id="changeRelationIdHandle"
      />
      <DeeSingleDropdown
        v-if="item.type==='single_dropdown'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('SingleDropdown_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :relation-dict="relationDict"
        :relation-keys="relationKeys"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
        @show-log="showlogHandle"
        @change-id="changeRelationIdHandle"
      />
      <DeeMatrixMultipleChoice
        v-if="item.type==='matrix_multiple_choice'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MatrixMultipleChoice_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
        @show-log="showlogHandle"
      />
      <DeeMatrixInput
        v-if="item.type==='matrix_input'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MatrixInput_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
        @show-log="showlogHandle"
      />
      <DeeMatrixSingleChoice
        v-if="item.type==='matrix_single_choice'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MatrixSingleChoice_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
        @show-log="showlogHandle"
      />
      <DeeDesp
        v-if="item.type==='desp'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :key="String('Desp_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
        @show-log="showlogHandle"
      />
      <!-- 新增四种题型 -->
      <DeeMatrixSingleDropdown
        v-if="item.type==='matrix_single_dropdown'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MatrixSingleDropdown_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
        @show-log="showlogHandle"
      />
      <DeeMatrixMultipleDropdown
        v-if="item.type==='matrix_multiple_dropdown'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MatrixMultipleDropdown_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
        @show-log="showlogHandle"
      />
      <DeeMatrixComplexList
        v-if="item.type==='matrix_complex_list'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MatrixComplexList_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <DeeMatrixComplex
        v-if="item.type==='matrix_complex'"
        v-show="!item.exist_relation_items||relationIds.includes(item.id)"
        :id="customQuestionId?customQuestionId+'_'+item.id:''"
        :key="String('MatrixComplex_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
        @show-log="showlogHandle"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'DeeModel',
  props: {
    isDetailDialog: {
      default: false,
      type: Boolean
    },
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
    },
    clickHandle(slotProps) {
      console.log(slotProps)
    },
    showlogHandle(val) {
      this.$emit('show-log', val)
    }
  }
}
</script>
<style lang="scss">
.el-icon-edit.edit-rule{
  display: none;
  cursor: pointer;
  margin-left: 8px;
  color: #f56c6c;
}
.dee-question-heading:hover .el-icon-edit.edit-rule{
  display: inline;
}
</style>
