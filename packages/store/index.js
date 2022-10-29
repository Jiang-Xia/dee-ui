/*
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-03-31 17:35:27
 * @LastEditTime: 2021-07-13 15:58:11
 * @Description: （package里面用不了vuex，如果项目里有用了vuex会以项目的vuex为准，package里的vuex无效果）
 * @FilePath: \dee-ui\packages\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)
const modulesFiles = require.context('./modules', true, /\.js$/) // 将modules文件夹下方的所有文件全部获取，无需一个一个注入
const modules = {}
modulesFiles.keys().forEach(modulePath => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1') // 将指定文件下的文件名去除后缀
  const value = modulesFiles(modulePath) // 获取到文件中的内容
  modules[moduleName] = value.default // 将需要的所有文件放入modules这个空对象中，引入这一个即可
  return modules
})
export default new Vuex.Store({
  modules,
  state: {

  },
  getters,
  mutations: {

  },
  actions: {

  }
})
