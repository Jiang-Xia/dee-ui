import Vue from 'vue'
import App from './App.vue'
import DeeUI from '../packages'
import router from './router'
import store from './store'
import '@/styles/base.scss'
import '@/styles/element-variables.scss'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.use(DeeUI)
Vue.config.productionTip = false
Vue.prototype.log = console.log
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
