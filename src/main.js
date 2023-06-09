import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import * as echarts from 'echarts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app =  createApp(App).use(router).use(store).use(ElementPlus)
app.config.globalProperties.$echarts = echarts
app.mount('#app')
