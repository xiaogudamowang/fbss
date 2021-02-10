import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../components/Index'
import Index1 from '../components/main/index/Index1'
import Index2 from '../components/main/index/Index2'
import NotFound from '../components/notfound/NotFound'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [

    {path: '/', redirect: 'index'},
    {
      path: '/index',
      component: Index,
      children: [
        {path: '/', redirect: '/user/index1'},
        {path: '/user/index1', component: Index1},
        {path: '/user/index2', component: Index2},
      ]
    },


    {path: '*', component: NotFound}
  ],
  mode: 'history'
})
