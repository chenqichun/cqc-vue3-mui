import { createRouter, createWebHashHistory} from 'vue-router'
import Home from '@/example/m-home.vue'
export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/toast',
    meta: {
      title: '消息提示'
    },
    name: 'Toast',
    component: () => import('@/example/toast-example')
  },
  {
    path: '/loading',
    meta: {
      title: 'loading弹框'
    },
    name: 'Loading',
    component: () => import('@/example/loading-example')
  },
]

export default createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL)
})