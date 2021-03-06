import Vue from 'vue'
import Router from 'vue-router'

import GoodsList from '../views/GoodsList.vue'
import Cart from '@/views/Cart'
import Address from '../views/Address.vue'
import orderConfirm from '../views/OrderConfirm.vue'
import orderSuccess from '../views/OrderSuccess.vue'

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
    },
    {
      path: '/address',
      name: 'Address',
      components: {
        default:Address,
      }
    },
    {
      path:'/orderConfirm',
      name:'orderConfirm',
      components:{
        default:orderConfirm,
      }
    },
    {
      path:'/orderSuccess',
      name:'orderSuccess',
      components:{
        default:orderSuccess
      }
    }
  ]
})
