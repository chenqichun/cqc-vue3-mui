import { createApp } from 'vue'
import App from './App.vue'
import cqcUI from '@/packages/index'
import DemoBlock from '@/example/common'
import ArbBlock from '@/example/attribute'
import hl from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'

DemoBlock.install = app => {
  app.component('DemoBlock', DemoBlock)
  app.component('ArbBlock', ArbBlock)
}

const app = createApp(App);
// 先把指令放在前面，然后再导入组件，否则刷新会报指令错误
app.directive('highlight', el => {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hl.highlightBlock(block)
  })
})

app.use(cqcUI).use(DemoBlock).mount('#app')
