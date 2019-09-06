import VueRoute from 'vue-router'
import Home from '@/views/Home.vue'

export default new VueRoute({
  mode: 'hash',
  routes: [
    { path: '/', component:  Home}
  ]
})
