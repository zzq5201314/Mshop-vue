/*
 * @Author: 清羽
 * @Date: 2022-09-08 23:57:13
 * @LastEditTime: 2022-12-01 21:57:17
 * @LastEditors: you name
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeLayout from '../layout/Home/Home.vue'
import AppLayout from '../layout/App/AppLayout.vue'
import appRouter from './modules/App'
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
    name: 'login',
    component: () => import('@/views/Login/Login'),
    meta: { title: '登录' },
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register/Register'),
    meta: { title: '注册' },
  },

  {
    path: '/apply_business',
    component: () => import('@/views/ApplyBusiness/ApplyBusiness'),
    meta: { title: '入驻商家' },
  },

  ...appRouter,

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
    path: '/category',
    component: HomeLayout,
    redirect: '/',
    children: [{
      path: '/category',
      name: 'category',
      component: () => import('@/views/Category/Category.vue'),
      meta: { title: '商品分类' },
    }]
  },

  {
    path: '/search',
    component: HomeLayout,
    redirect: '/',
    children: [{
      path: '/search',
      name: 'search',
      component: () => import('@/views/Search/Search.vue'),
      meta: { title: '搜索' },
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
          meta: { title: '我的主页', index: 1 },
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
    path: '/confirmOrder',
    // name:'confirmOrder',
    component: HomeLayout,
    redirect: '/',
    children: [{
      path: '/',
      name: 'confirmOrder',
      component: () => import('@/views/ConfirmOrder/ConfirmOrder.vue'),
      meta: { title: '确认订单' },
    }]
  },

  {
    path: '/business',
    component: HomeLayout,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'business',
        component: () => import('@/views/Business/index.vue'),
        redirect: '/',
        children: [
          {
            path: '/business/:businessId',
            name: 'business',
            component: () => import('@/views/Business/home.vue'),
            meta: { title: '店铺首页' },
          },
          {
            path: '/business/:businessId/:categoryId',
            name: 'businessCategory',
            component: () => import('@/views/Business/cate.vue'),
            // meta: { title: '店铺分类' }
          }
        ]
      }
    ]
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
