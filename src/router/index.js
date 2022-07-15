import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        name: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/Profile')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
