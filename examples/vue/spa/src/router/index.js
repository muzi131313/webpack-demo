import Vue from 'vue'
import VueRoute from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRoute)

export default new VueRoute({
  mode: 'hash',
  routes: [
    { path: '/', component:  Home}
  ]
})
