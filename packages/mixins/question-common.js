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
      type: Object
    },
    questionIndex: {
      default: null,
      type: Number
    }
  },
  computed: {
    questionStyle() {
      const layout = this.dimLayout
      const obj = {}
      if (!this.$isMobile()) {
        if (layout.row_behavior === 1) {
          obj.clear = 'both'
        } else if (layout.row_behavior === 2) {
          obj.clear = 'both'
          obj.width = '100%'
        }
      } else {
        obj.width = '100%'
      }
      return obj
    },
    questionNo() {
      const index = this.questionIndex
      return (index < 9) ? (0 + String(index + 1)) : index + 1
    }
  }
}
