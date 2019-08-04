import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/guest/Homepage'
import LoginOwner from '@/components/guest/LoginOwner'
import LoginUser from '@/components/guest/LoginUser'
import DetailKos from '@/components/guest/DetailKos'
import DashboardOwner from '@/components/guest/DashboardOwner'
import PageCariKos from '@/components/guest/PageCariKos'
import InputKos from '@/components/guest/InputKos'
import UpdateKos from '@/components/guest/UpdateKos'
import BookingView from '@/components/guest/BookingView'
import AdminBoard from '@/components/guest/AdminBoard'
import Map2 from '@/components/guest/Map'
import registerUser from '@/components/guest/RegisterUser'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/login-owner',
      name: 'LoginOwner',
      component: LoginOwner
    },
    {
      path: '/login-user',
      name: 'LoginUser',
      component: LoginUser
    },
    {
      path: '/kos',
      name: 'DetailKos',
      component: DetailKos
    },
    {
      path: '/ownerpage',
      name: 'DashboardOwner',
      component: DashboardOwner
    },
    {
      path: '/cari',
      name: 'PageCariKos',
      component: PageCariKos
    },
    {
      path: '/input-kos',
      name: 'InputKos',
      component: InputKos
    },
    {
      path: '/ubah-kos',
      name: 'UpdateKos',
      component: UpdateKos
    },
    {
      path: '/book-payment',
      name: 'BookingView',
      component: BookingView
    },
    {
      path: '/admin',
      name: 'AdminBoard',
      component: AdminBoard
    },
    {
      path: '/map',
      name: 'Map',
      component: Map2
    },
    {
      path: '/registeruser',
      name: 'registerUser',
      component: registerUser
    }
  ]
})
