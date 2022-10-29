import DeeShortText from './src/main'

/* istanbul ignore next */
DeeShortText.install = function(Vue) {
  Vue.component(DeeShortText.name, DeeShortText)
}

export default DeeShortText
