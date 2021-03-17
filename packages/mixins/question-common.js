// import { isMobile } from '#/utils/common'
// import Quill from 'quill'
/* 即所有题型都公用的 个别单独写 */
export const commonMixins = {
  props: {
    isEditing: {
      default: false,
      type: Boolean
    },
    dimData: {
      default: () => { return {} },
      type: Object
    },
    dimLayout: {
      default: () => { return {} },
      type: Object,
      required: true
    },
    questionIndex: {
      default: null,
      type: Number,
      required: true
    }
  },
  computed: {
    questionStyle() {
      // const layout = this.dimLayout
      const obj = {}
      // if (!isMobile()) {
      //   if (layout.row_behavior === 1) {
      //     obj.clear = 'both'
      //   } else if (layout.row_behavior === 2) {
      //     obj.clear = 'both'
      //     obj.width = '100%'
      //   }
      // } else {
      //   obj.width = '100%'
      // }
      obj.width = '100%'
      return obj
    },
    questionNo() {
      // const index = this.questionIndex
      // return (index < 9) ? (0 + String(index + 1)) : index + 1
      return ''
    }
  }
}

/* 单选选择和多选选择的联动题 */
export const relationMixins = {
  methods: {
    // 获取关联题目
    $__calcRelationHandle(id) {
      const ids = this.relationKeys[id]
      if (ids) {
        // console.log(ids)
        for (const id_ of ids) {
          const obj = this.relationDict[id_].relation_items
          const relation = this.relationDict[id_].relation
          if (getMultiQuestionLogic(obj, relation, this.dimData)) {
            this.$emit('change-id', { id: id_, type: 'add' })
          } else {
            this.$emit('change-id', { id: id_, type: 'remove' })
          }
          if (this.relationKeys[id_]) {
            this.$__calcRelationHandle(id_)
          }
        }
      }
    },

    // 不显示时清除关联题一选中选项
    $__clearRelationOptionHandle() {

    }
  }
}
/*
  * 返回值 就是判断多题逻辑的结果 (一道题和多道题控制 一样使用)
*/
export function getMultiQuestionLogic(relation_items, relation, dimData) {
  const boolObj = {}
  for (const k in relation_items) {
    boolObj[k] = isSatisfyCondition(relation_items[k], dimData)
  }
  if (relation === 'and') {
    // 有一个不为true 就返回false
    for (const k in relation_items) {
      if (!boolObj[k]) {
        return false
      }
    }
    return true
  } else if (relation === 'or') {
    // 有一个为true 就返回 true
    for (const k in relation_items) {
      if (boolObj[k]) {
        return true
      }
    }
    return false
  }
}
// 计算关联题是否满足显示条件
export function isSatisfyCondition(relation_item, dimData) {
  const { any_or_all, checked_or_unchecked, option_list } = relation_item
  if (checked_or_unchecked === 'checked') {
    if (any_or_all === 'any') {
      return option_list.some((v) => {
        return dimData[v.option_en_name] === v.option_value
      })
    } else if (any_or_all === 'all') {
      return option_list.every((v) => {
        return dimData[v.option_en_name] === v.option_value
      })
    }
  } else if (checked_or_unchecked === 'unchecked') {
    if (any_or_all === 'any') {
      return option_list.some((v) => {
        return dimData[v.option_en_name] !== v.option_value
      })
    } else if (any_or_all === 'all') {
      return option_list.every((v) => {
        return dimData[v.option_en_name] !== v.option_value
      })
    }
  }
}
