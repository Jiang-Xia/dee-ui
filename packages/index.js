// 引入编写的组件
import Test from './test'
import Desp from './desp'
import LongText from './long-text'
import ShortText from './short-text'
// import LongText from './long-text'
// import LongText from './long-text'
// import LongText from './long-text'
// import LongText from './long-text'

// 所有组件列表
const components = [
  Test,
  Desp,
  LongText,
  ShortText
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
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  // 所有组件，必须具有 install，才能使用 Vue.use()
  ...components
}
