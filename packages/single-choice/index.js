import DeeSingleChoice from './src/main'

/* istanbul ignore next */
DeeSingleChoice.install = function(Vue) {
  Vue.component(DeeSingleChoice.name, DeeSingleChoice)
}

export default DeeSingleChoice
