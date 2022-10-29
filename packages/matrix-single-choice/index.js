import DeeMultipleChoice from './src/main'

/* istanbul ignore next */
DeeMultipleChoice.install = function(Vue) {
  Vue.component(DeeMultipleChoice.name, DeeMultipleChoice)
}

export default DeeMultipleChoice
