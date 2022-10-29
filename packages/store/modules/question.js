/*
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-03-31 17:35:27
 * @LastEditTime: 2021-07-13 15:44:54
 * @Description:
 * @FilePath: \dee-ui\packages\store\modules\question.js
 */
export default {
  namespaced: true,
  state: {
    relationIds: [],
    poperContents: []
  },
  mutations: {
    relationIds: (state, relationIds) => {
      state.relationIds = relationIds
    },
    poperContents: (state, poperContents) => {
      state.poperContents = poperContents
    }
  },
  actions: {
    setRelationIds({ commit }, relationIds) {
      commit('relationIds', relationIds)
    },
    setPoperContents({ commit }, poperContents) {
      commit('poperContents', poperContents)
    }
  }
}
