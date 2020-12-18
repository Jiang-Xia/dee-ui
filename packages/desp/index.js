import Desp from './src/main'

/* istanbul ignore next */
Desp.install = function(Vue) {
  Vue.component(Desp.name, Desp)
}

export default Desp
