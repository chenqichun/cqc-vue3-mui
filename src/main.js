import { createApp } from 'vue'
import App from './App.vue'
import cqcUI from '@/packages/index'
import router from '@/router'
const app = createApp(App);

app.use(router).use(cqcUI).mount('#app')
