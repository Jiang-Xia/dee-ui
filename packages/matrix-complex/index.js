import DeeMatrixComplex from './src/main'

/* istanbul ignore next */
DeeMatrixComplex.install = function(Vue) {
  Vue.component(DeeMatrixComplex.name, DeeMatrixComplex)
}

export default DeeMatrixComplex
