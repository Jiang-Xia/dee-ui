import DeePreviewModel from './src/main'

/* istanbul ignore next */
DeePreviewModel.install = function(Vue) {
  Vue.component(DeePreviewModel.name, DeePreviewModel)
}

export default DeePreviewModel
