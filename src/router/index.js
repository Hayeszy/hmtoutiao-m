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
        path: '/my',
        name: 'my',
        component: () => import('@/views/My')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
