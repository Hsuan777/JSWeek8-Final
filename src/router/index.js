import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  /* 前後台分開 */
  {
    path: '/',
    component: () => import('../views/layout/Layout.vue'), // APP.vue的 router-view顯示 Layout.vue的內容
    children: [
      // 當回到首頁時，Home.vue的內容也會經由 router-view顯示
      {
        path: '/',
        component: () => import('../views/layout/Home.vue')
      },
      {
        path: 'products',
        component: () => import('../views/layout/Products.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/layout/Product.vue')
      },
      {
        path: 'repair',
        component: () => import('../views/layout/Repair.vue')
      },
      {
        path: 'questions',
        component: () => import('../views/layout/Questions.vue')
      },
      {
        path: 'payment',
        component: () => import('../views/layout/Payment.vue')
      },
      {
        path: 'login',
        component: () => import('../views/layout/Login.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/Dashboard.vue'), // APP.vue的 router-view顯示 Dashboard.vue的內容
    children: [
      // {
      //   path: '/',
      //   component: () => import('../views/dashboard/admin.vue') // 管理總覽、頁面導航
      // },
      {
        path: 'products',
        component: () => import('../views/dashboard/Products.vue')
      },
      {
        path: 'order',
        component: () => import('../views/dashboard/Order.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/dashboard/Coupon.vue')
      },
      {
        path: 'storages',
        component: () => import('../views/dashboard/Storages.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
