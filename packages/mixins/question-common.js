/*
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-03-31 17:35:27
 * @LastEditTime: 2021-08-06 18:50:07
 * @Description:
 * @FilePath: \dee-ui\packages\mixins\question-common.js
 */
import { getMultiQuestionLogic } from '#/utils/common'
import ImgLook from '#/components/img-look'
// import Quill from 'quill'
/* 即所有题型都公用的 个别单独写 */
export const commonMixins = {
  props: {
    // 是否编辑
    isEditing: {
      default: false,
      type: Boolean
    },
    // 题型数据
    dimData: {
      default: () => { return {} },
      type: Object
    },
    // 题型布局信息
    dimLayout: {
      default: () => { return {} },
      type: Object,
      required: true
    },
    // 题型序号
    questionIndex: {
      default: null,
      type: Number,
      required: true
    },
    // 题型参数用于控制功能的开关
    featureParams: {
      default: () => { return {} },
      type: Object
    }
  },
  computed: {
    // 题型排列样式
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
    // 题型序号
    questionNo() {
      // const index = this.questionIndex
      // return (index < 9) ? (0 + String(index + 1)) : index + 1
      return ''
    },
    // 控制日志气泡的显示
    showLog({ $parent }) {
      // console.log($parent)
      return $parent.showLog
    }
  },
  mounted() {
    // this.bindRemarkImgHandle()
  },
  methods: {
    // 给备注的图片绑定点击事件
    bindRemarkImgHandle() {
      if (this.dimLayout.remark) {
        if (!this.$refs.remark) { return }
        const imgs = this.$refs.remark.querySelectorAll('img')
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].addEventListener('click', (e) => {
            ImgLook({ dom: e.target })
          })
        }
      }
    }
  }
}

/* 单选选择和多选选择的联动题 */
export const relationMixins = {
  methods: {

    /**
     * @description: 获取关联题目 1.要根据数据来是否显示关联题，即渲染的时候要找id 2.手动修改之后动态控制关联题的显示和隐藏
     * @param {Boolean}  isFirst 是否为初始化渲染
     * @return {*}
     */
    $__calcRelationHandle(isFirst = true) {
      const { relation_dict, relation_keys } = this.metaTemplate
      const id = this.dimLayout.id// 题目id
      const qName = this.dimLayout.name// 题目名
      const ids = relation_keys[id]
      if (ids) {
        for (const id_ of ids) {
          const obj = relation_dict[id_].relation_items
          const relation = relation_dict[id_].relation
          // 关联题名
          const name = relation_dict[id_].name
          // id_ 关联题id
          const bool = getMultiQuestionLogic(obj, relation, this.dimData)
          if (bool) {
            this.$emit('change-id', { id: id_, name, qName, qId: id, type: 'add' })
          } else {
            this.$emit('change-id', { id: id_, name, qName, qId: id, type: 'remove' })
          }
        }
      }
    },

    // 不显示时清除关联题一选中选项
    $__clearRelationOptionHandle() {

    }
  }
}

