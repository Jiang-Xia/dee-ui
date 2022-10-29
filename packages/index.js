/*
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-03-31 17:35:26
 * @LastEditTime: 2021-08-02 11:37:48
 * @Description:
 * @FilePath: \dee-ui\packages\index.js
 */

// 引入编写的组件
import Desp from './desp'
import LongText from './long-text'
import ShortText from './short-text'
import MultipleChoice from './multiple-choice'
import MultipleDropdown from './multiple-dropdown'
import SingleChoice from './single-choice'
import SingleDropdown from './single-dropdown'
import PreviewModel from './preview-model'
import MatrixMultipleChoice from './matrix-multiple-choice'
import MatrixInput from './matrix-input'
import MatrixSingleChoice from './matrix-single-choice'
import MatrixSingleDropdown from './matrix-single-dropdown'
import MatrixMultipleDropdown from './matrix-multiple-dropdown'
import MatrixComplexList from './matrix-complex-list'
import MatrixComplex from './matrix-complex'

/* 共用组件 */
import DeeLogPopper from './components/dee-log-popper'

import './style/common.scss'
import './style/quetions-global.scss'

// 工具方法
import * as questionUtils from './utils/common'

/*
 * common import start
 *
*/
/* quill */
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

/*
 * common import end
 *
*/
// 所有组件列表
const components = [
  Desp,
  LongText,
  ShortText,
  MultipleChoice,
  MultipleDropdown,
  SingleChoice,
  SingleDropdown,
  MatrixMultipleChoice,
  MatrixInput,
  MatrixSingleChoice,
  MatrixSingleDropdown,
  MatrixMultipleDropdown,
  MatrixComplexList,
  MatrixComplex,
  PreviewModel,
  // 相当于注册全局组件
  DeeLogPopper
]

// 定义 install 方法，接收 Vue 作为参数
const install = function(Vue) {
  // 判断是否安装，安装过就不继续往下执行
  if (install.installed) return
  install.installed = true
  // 遍历注册所有组件
  components.map(component => Vue.component(component.name, component))
  // 下面这个写法也可以
  // components.map(component => Vue.use(component))
  // 挂载方法
  Vue.prototype.$questionUtils = questionUtils
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  // 所有组件，必须具有 install，才能使用 Vue.use()
  ...components
}
