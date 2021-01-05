<template>
  <div class="dee-preview-model-container clearfix">
    <template v-for="(item,index) in fieldTemp">
      <LongText
        v-if="item.type==='long_text'"
        :key="String('LongText_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <ShortText
        v-if="item.type==='short_text'"
        :key="String('ShortText_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <MultipleChoice
        v-if="item.type==='multiple_choice'"
        :key="String('MultipleChoice_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <MultipleDropdown
        v-if="item.type==='multiple_dropdown'"
        :key="String('LongText_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <SingleChoice
        v-if="item.type==='single_choice'"
        :key="String('SingleChoice_'+index)"
        id-editing
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <SingleDropdown
        v-if="item.type==='single_dropdown'"
        :key="String('SingleDropdown_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <MatrixMultipleChoice
        v-if="item.type==='matrix_multiple_choice'"
        :key="String('MatrixMultipleChoice_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <MatrixInput
        v-if="item.type==='matrix_input'"
        :key="String('MatrixInput_'+index)"
        :dim-layout="item"
        :dim-data="dimData"
        :is-editing="isEditing"
        :question-index="index"
        @modify="modifyHandle"
      />
      <MatrixSingleChoice
        v-if="item.type==='matrix_single_choice'"
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
      default: () => {},
      type: Object
    },
    isEditing: {
      default: () => true,
      type: Boolean
    },
    fieldTemp: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
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
    }
  },
  methods: {
    modifyHandle(data) {
      this.$emit('modify', data)
      // console.log('=============')
      // console.log(data)
      // console.log('=============')
    }
  }
}
</script>
