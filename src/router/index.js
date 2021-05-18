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
import BookShop from "../components/BookShop";
import Admin from "../components/Admin";
import UserInfo from "../components/user/UserInfo";
import UserAddress from "../components/user/UserAddress";
import Order from "../components/user/Order";
import AddBook from "../components/bookshop/AddBook";
import BookAdmin from "../components/bookshop/BookAdmin";
import BookShopMessage from "../components/bookshop/BookShopMessage";
import ChangePassword from "../components/bookshop/ChangePassword";
import ShopOrder from "../components/bookshop/ShopOrder";
import BookData from "../components/bookshop/BookData";
import UserAdmin from "../components/admin/UserAdmin";
import ShopAdmin from "../components/admin/ShopAdmin";
import PBook from "../components/main/index/index2/PBook";
import Sort from "../components/main/index/index3/Sort";
import UserPicture from "../components/user/UserPicture";
import ShopLogin from "../components/ShopLogin";
import AdminLogin from "../components/AdminLogin";

Vue.use(VueRouter);


const routes= [
    {path: '/', redirect: 'index'},
    {
      path: '/index',
      component: Index,
      children: [
        {path: '/', redirect: '/index1-1'},
        {path: '/index1-1', component: Index1},
        {
          path: '/index1-2',
          component: Index2,
          children:[
            {path:'/',redirect:'/pBook'},
            {path:'/pBook',component: PBook}
          ]
        },
        {
          path: '/index1-3', component: Index3,
          children:[
            {path:'/sort',component:Sort}
          ]
        },
        {path: '/index1-4', component: Index4},
        {path: '/book',name: 'book',component: Book},
        {
          path: '/user',
          component: User,
          children: [
            {path: '/', redirect: '/info'},
            {path:'/info',component: UserInfo},
            {path:'/address',component: UserAddress},
            {path:'/order',component: Order},
            {path:'/userPicture',component: UserPicture}
          ]
        }
      ]
    },{
      path: '/login',
      component: Login
    },{
      path: '/shopLogin',
      component: ShopLogin
    },{
      path: '/adminLogin',
      component: AdminLogin
    },{
      path: '/bookshop',
      component: BookShop,
      children:[
        {path:'/',redirect:'/addBook'},
        {path:'/addBook',component:AddBook},
        {path:'/bookAdmin',component:BookAdmin},
        {path:'/bookShopMessage',component:BookShopMessage},
        {path:'/changePassword',component:ChangePassword},
        {path:'/shopOrder',component:ShopOrder},
        {path:'/bookData',component:BookData}
      ]
    },{
      path: '/admin',
      component: Admin,
      children:[
        {path:'/',redirect:'/userAdmin'},
        {path:'/userAdmin',component: UserAdmin},
        {path:'/shopAdmin',component: ShopAdmin}
      ],

    },
    {path: '*', component: NotFound}
  ]
var router=new VueRouter({
  'mode': 'history',
  routes
})

var userpath = ['/index1-2','/pBook','/pbook','/index1-3','/sort','/index1-4','/book','/user','/info','/address','/order','/userPicture','/userpicture']
var shoppath = ['/bookshop','/addBook','/addbook','/bookAdmin','/bookadmin','/bookShopMessage','/bookshopmessage','/changePassword','/changepassword','/shopOrder','/shoporder','/bookData','/bookdata']
var adminpath = ['/admin','/userAdmin','/useradmin','/shopAdmin','/shopadmin']

router.beforeEach((to, from,next)=>{
  if(!localStorage.getItem('userInfo')){
    console.log(localStorage.getItem('userInfo'))
    if (userpath.includes(to.path)){
      alert('请先登录')
      router.push('/login')
    }
    if (shoppath.includes(to.path)){
      alert('请先登录')
      router.push('/shopLogin')
    }
    if (adminpath.includes(to.path)){
      alert('请先登录')
      router.push('/adminLogin')
    }
  }
  next();
})

export default router;
