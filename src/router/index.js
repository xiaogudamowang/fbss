import Vue from 'vue'
import VueRouter from 'vue-router'

import Index1 from '../components/main/index/Index1'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/index',
      component: Index1
    }
  ]
})
