import { createRouter,createWebHistory } from "vue-router";


const routerHistory = createWebHistory()

const router = createRouter({
    history:routerHistory,
    routes:[
        {
            path:'/',
            redirect:'/login'
        },
        {
            path:'/login',
            component:()=>import("../components/Login")
        },
        {
            path:'/zhuce',
            component:()=>import("../components/Zhuce")
        }
        
    ]
})

export default router