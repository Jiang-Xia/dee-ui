import LongText from './src/main'

/* istanbul ignore next */
LongText.install = function(Vue) {
  Vue.component(LongText.name, LongText)
}

export default LongText
