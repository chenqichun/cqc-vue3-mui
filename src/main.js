import { createApp } from 'vue'
import App from './App.vue'
import cqcUI from '@/packages/index'
import router from '@/router'
import GoBack from "@/example/goback"

GoBack.install = app => app.component('goback',GoBack)
const app = createApp(App);

app.use(router).use(cqcUI).use(GoBack).mount('#app')
