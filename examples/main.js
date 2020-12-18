import Vue from 'vue'
import App from './App.vue'
import DeeUI from '../packages'
Vue.use(DeeUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
