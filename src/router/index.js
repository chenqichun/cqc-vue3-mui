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
  {
    path: '/range',
    meta: {
      title: 'range滑条'
    },
    name: 'Range',
    component: () => import('@/example/range-example')
  },
  {
    path: '/switch',
    meta: {
      title: 'switch开关'
    },
    name: 'Switch',
    component: () => import('@/example/switch-example')
  },
  {
    path: '/slide',
    meta: {
      title: 'slide滑动选择/删除'
    },
    name: 'Slide',
    component: () => import('@/example/slide-example')
  },
  {
    path: '/scroll',
    meta: {
      title: 'scroll滚动'
    },
    name: 'Scroll',
    component: () => import('@/example/scroll-example')
  },
  {
    path: '/load-more',
    meta: {
      title: '上拉加载/下拉刷新'
    },
    name: 'loadMore',
    component: () => import('@/example/load-more')
  },
  {
    path: '/infinite-scroll',
    meta: {
      title: 'infinite无限滚动'
    },
    name: 'InfiniteScroll',
    component: () => import('@/example/infinite-scroll-example')
  },
  {
    path: '/sign-board',
    meta: {
      title: '画板'
    },
    name: 'SignBoard',
    component: () => import('@/example/signBoard-example')
  },
]

export default createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL)
})