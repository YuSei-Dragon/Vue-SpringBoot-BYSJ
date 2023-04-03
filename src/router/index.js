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
        },
        {
            path:'/userhome',
            component:()=>import("../components/Userhome")
        },
        {
            path:'/learnclass',
            component:()=>import("../components/LearnClass")
        },
        {
            path:'/usermessage',
            component:()=>import("../components/Usermessage")
        },
        {
            path:'/syshome',
            component:()=>import("../components/Syshome"),
            children:[
                {
                    path:'',
                    component:()=>import("../components/StudentAdd")
                },
                {
                    path:'stdmanage',
                    component:()=>import("../components/StudentManage")
                },

            ]
        },
        
    ]
})

export default router