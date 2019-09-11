import Vue from 'vue'
import VueRoute from 'vue-router'
import Home from '@/views/Home.vue'
// import Sync from '@/views/Sync.vue'

Vue.use(VueRoute)

export default new VueRoute({
  mode: 'hash',
  routes: [
    { path: '/', component:  Home },
    { path: '/sub', component: () => import('@/views/Sub.vue') },
    { path: '/sync', component: () => import(/* webpackChunkName: 'sync' */ '@/views/Sync.vue') }
  ]
})
