import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import * as echarts from 'echarts'


const app =  createApp(App).use(router).use(store)
app.config.globalProperties.$echarts = echarts
app.mount('#app')
