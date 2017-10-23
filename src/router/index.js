import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '../views/GoodsList.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/goods/:goodsId/user/:name',
      name: 'GoodsList',
      components: {
        default:GoodsList,
        title:Title,
        img:Image
      }
    }
  ]
})
