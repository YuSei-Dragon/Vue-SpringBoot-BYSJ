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
                {
                    path:'classadd',
                    component:()=>import("../components/ClassAdd")
                },{
                    path:'classmanage',
                    component:()=>import("../components/ClassManage")
                },{
                    path:'discussdel',
                    component:()=>import("../components/DiscussDel")
                },{
                    path:'syschange',
                    component:()=>import("../components/SysChange")
                },{
                    path:'sysmanage',
                    component:()=>import("../components/Sysmanage")
                }

            ]
        },
        
    ]
})

export default router