import Vue from 'vue'
import Router from 'vue-router'

import GoodsList from '../views/GoodsList.vue'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      components: {
        default:GoodsList,
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      components: {
        default:Cart,
      }
    }
  ]
})
