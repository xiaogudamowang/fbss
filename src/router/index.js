import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../components/Index'
import Index1 from '../components/main/index/Index1'
import Index2 from '../components/main/index/Index2'
import Index3 from '../components/main/index/Index3'
import Index4 from '../components/main/index/Index4'
import NotFound from '../components/notfound/NotFound'
import Book from '../components/Book'
import User from '../components/User'
import Login from '../components/Login'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {path: '/', redirect: 'index'},
    {
      path: '/index',
      component: Index,
      children: [
        {path: '/', redirect: '/index1-1'},
        {path: '/index1-1', component: Index1},
        {path: '/index1-2', component: Index2},
        {path: '/index1-3', component: Index3},
        {path: '/index1-4', component: Index4},
        {path: '/book',component: Book},
        {path: '/user', component: User}
      ]
    },{
      path: '/login',
      component: Login
    },
    {path: '*', component: NotFound}
  ],
  mode: 'history'
})
