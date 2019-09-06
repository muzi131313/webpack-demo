const state = {
  name: 'Hello, SPA Vue Page'
}
const getters = {
  name: state => state.name
}
const actions = {
  setName({ state, commit }, payload) {
    commit('SET_NAME', payload)
  }
}
const mutations = {
  SET_NAME(state, payload) {
    state.name = payload
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
