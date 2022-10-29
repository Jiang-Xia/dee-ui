/*
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-08-04 16:39:29
 * @LastEditTime: 2021-08-04 16:50:58
 * @Description:
 * @FilePath: \dee-ui\packages\components\img-look\index.js
 */
import Vue from 'vue'
import ImgLook from './main.vue'

let ImgLookVue

function createImgLook() {
  // 这里使用了 VUE 来构建一个 vnode
  // 值得注意的是， $mount() 函数没有填写任何的 dom 节点
  // 这样就变成了一个 未挂载 的 vnode
  const vnode = new Vue({
    render: h => h(ImgLook)
  }).$mount()
  // 手动 将 生成的对应 dom 插进 body 里面
  document.body.appendChild(vnode.$el)
  // 返回当前实例  的 vue 对象
  // 没错，就是 $children[0]
  return vnode.$children[0]
}

export function showImgLook(args, callback) {
  // 为了让当前的实例 只有一个，防止占用太多内存
  if (!ImgLookVue) {
    ImgLookVue = createImgLook()
  }
  ImgLookVue.showImgLook(args)
  callback && callback()
  return ImgLookVue
}

export function hideImgLook() {
  if (!ImgLookVue) return
  ImgLookVue.hideImgLook()
  return ImgLookVue
}

export function destoryImgLook() {
  if (!ImgLookVue) return
  ImgLookVue.destory()
}

export default showImgLook
