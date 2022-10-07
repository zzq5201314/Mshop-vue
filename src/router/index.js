/*
 * @Author: 清羽
 * @Date: 2022-09-08 23:57:13
 * @LastEditTime: 2022-10-07 18:55:27
 * @LastEditors: you name
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeLayout from '../layout/Home/Home.vue'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/login',
    component: () => import('@/views/Login/Login'),
    meta: { title: '登录' },
  },

  {
    path: '/register',
    component: () => import('@/views/Register/Register'),
    meta: { title: '注册' },
  },

  {
    path: '/apply_business',
    component: () => import('@/views/ApplyBusiness/ApplyBusiness'),
    meta: { title: '入驻商家' },
  },

  {
    path: '/',
    name: 'Home',
    component: HomeLayout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/Home/Home.vue'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/product',
    name: 'product',
    redirect: '/info',
    component: HomeLayout,
    children: [{
      path: '/product/info/:productId',
      name: 'productInfo',
      component: () => import('@/views/productInfo/index.vue'),
      // meta: { title: this.$root.name }

    }]
  },

  {
    path: '/shoppingCart',
    name: 'shoppingCart',
    component: HomeLayout,
    redirect: '/list',
    children: [{
      path: 'list',
      name: 'shoppingCartList',
      component: () => import('@/views/ShoppingCart/ShoppingCart.vue'),
      meta: { title: '购物车' },
    }]
  },

  {
    path: '/collect',
    name: 'collect',
    component: HomeLayout,
    redirect: '/product',
    children: [{
      path: 'product',
      name: 'productCollect',
      component: () => import('@/views/Collect/Collect.vue'),
      meta: { title: '收藏夹' },
    }]
  },

  {
    path: '/my',
    name: 'my',
    component: HomeLayout,
    redirect: '/',
    children: [{
      path: '/',
      component: () => import('@/views/My/My.vue'),
      redirect: '/',
      children: [
        {
          path: '/',
          name: 'myInfo',
          component: () => import('@/views/My/components/myInfo.vue'),
          meta: { title: '我的主页' },
        },
        {
          path: '/address',
          name: 'address',
          component: () => import('@/views/My/components/myAddress.vue'),
          meta: { title: '我的收获地址' },
        },
        {
          path: '/address/add',
          name: 'addAddress',
          component: () => import('@/views/My/components/addAddress.vue'),
          meta: { title: '添加收获地址' },
        },
        {
          path: '/order',
          name: 'myOrder',
          component: () => import('@/views/My/components/order.vue'),
          meta: { title: '我的订单' },
        }
      ]
    }]
  },

  {
    path: '/business',
    name: 'business',
    component: HomeLayout,
    redirect: '/info',
    children: [{
      path: '/business/info/:businessId',
      name: 'businessInfo',
      component: () => import('@/views/Business/businessHome.vue'),
      meta: { title: '店铺详情' },
    }]
  },


  // 404页面必须放在最后 !!!
  { path: '*', redirect: '/404', hidden: true }

]

// const router = new VueRouter({
//   routes
// })

const createRouter = () => new VueRouter({
  routes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由器
}

export default router
