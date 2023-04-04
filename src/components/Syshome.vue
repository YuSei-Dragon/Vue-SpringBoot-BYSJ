<template>
    <div class="holebody">
        <div class="router-top">
            <div class="header">
                <div class="header-cn">课程教学网站</div>
                <div class="header-en">Course teaching website</div>
                <div class="head-right">
                    <div class="uself">
                        <img src="../assets/头像.jpg" alt="">
                        <div class="uself-name">{{ username }}</div>
                    </div>
                    <div @click="moreshow" class="more">
                        <div class="more-svg" >
                            <svg t="1679889089926" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2774" width="60" height="60"><path d="M224 608c-52.928 0-96-43.072-96-96s43.072-96 96-96 96 43.072 96 96-43.072 96-96 96zM512 608c-52.928 0-96-43.072-96-96s43.072-96 96-96 96 43.072 96 96-43.072 96-96 96zM800 608c-52.928 0-96-43.072-96-96s43.072-96 96-96 96 43.072 96 96-43.072 96-96 96z" p-id="2775" fill="#52f2f9"></path></svg>
                        </div> 
                        <div :style="moreshowlen" @mouseover="moreway" @mouseout="moreaway" class="more-background">
                            <div style="height: 70px;"></div>
                            <div @click="backtologin" class="more2">退出登录</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="router-left">
            <div class="leftmain">
                <div @mouseout="little" @mouseover="bigger" :style="studentheight" class="student">
                    <div class="left-main">学生管理</div>
                    <div @click="toAddStudent" class="littleleft">增加账号</div>
                    <div @click="toManageStudent" class="littleleft">处理账号</div>
                </div>
                
                <div @mouseout="little1" @mouseover="bigger1" :style="studentheight1" class="student">
                    <div class="left-main">课程管理</div>
                    <div @click="toAddClass" class="littleleft">新增课程</div>
                    <div @click="toManageClass" class="littleleft">处理课程</div>
                </div>
                <div @mouseout="little2" @mouseover="bigger2" :style="studentheight2" class="student">
                    <div  class="left-main">讨论管理</div>
                    <div @click="toDelDiscuss" class="littleleft">删除讨论</div>
                </div>
                <div @mouseout="little3" @mouseover="bigger3" :style="studentheight3" class="student">
                    <div class="left-main">管理员账号</div>
                    <div @click="toChangeSys" class="littleleft">修改密码</div>
                    <div @click="toManageSys" class="littleleft">增删账号</div>
                </div>
            </div>
            <div class="leftbot" ref="chart"></div>
            
        </div>
        <router-view >

        </router-view>

    </div>
</template>

<script>
import router from '@/router'
import axios from 'axios'
    export default {
        data(){
            return{
                username:"",
                moreshowlen:{
                    height:0,
                },
                studentheight:{height:"6rem"},
                studentheight1:{height:"6rem"},
                studentheight2:{height:"6rem"},
                studentheight3:{height:"6rem"},

            }
        },
        methods:{
            moreshow(){
                this.moreshowlen = {height:150+'px'}
            },
            moreway(){
                this.moreshowlen = {height: 150+'px'}
            },
            moreaway(){
                this.moreshowlen = {height: 0}
            },
            backtologin(){
                router.push('/login')
            },
            bigger(){
                this.studentheight.height = "13rem"
            },
            little(){
                this.studentheight.height = "6rem"
            },
            bigger1(){
                this.studentheight1.height = "13rem"
            },
            little1(){
                this.studentheight1.height = "6rem"
            },
            bigger2(){
                this.studentheight2.height = "10rem"
            },
            little2(){
                this.studentheight2.height = "6rem"
            },
            bigger3(){
                this.studentheight3.height = "13rem"
            },
            little3(){
                this.studentheight3.height = "6rem"
            },
            toAddStudent(){
                router.push('/syshome/')
            },
            toManageStudent(){
                router.push('/syshome/stdmanage')
            },
            toAddClass(){
                router.push('/syshome/classadd')
            },  
            toManageClass(){
                router.push('/syshome/classmanage')
            },
            toDelDiscuss(){
                router.push('/syshome/discussdel')
            },
            toChangeSys(){
                router.push('/syshome/syschange')
            },
            toManageSys(){
                router.push('/syshome/sysmanage')
            },

            getOption(){
                return{
                    xAxis: {
                        type: 'category',
                        data: ['', '', '', '', '']
                    },
                    yAxis: {
                        show:false,
                        type: 'value'
                    },
                    xAxis:{
                        show:false,
                    },
                    series: [
                        {
                        data: [10, 8, 6, 4, 2],
                        type: 'bar'
                        }
                    ]
                }
            },
            init(){
                this.username = localStorage.getItem("sysname")
                const mychart = this.$echarts.init(this.$refs.chart)
                mychart.setOption(this.getOption())
            },
        },
        mounted(){
            this.init()

        }
    }
</script>

<style  scoped>
.holebody{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
.router-top{
    width: 100%;
    height: 20%;
    position: absolute;
    background-color: beige;
    box-shadow:
  1px 1.3px 4.4px rgba(0, 0, 0, 0.039),
  2.4px 3px 9.9px rgba(0, 0, 0, 0.056),
  4.3px 5.4px 16.9px rgba(0, 0, 0, 0.069),
  7.2px 9px 27px rgba(0, 0, 0, 0.081),
  12.1px 15px 43.2px rgba(0, 0, 0, 0.094),
  22.3px 27.6px 76px rgba(0, 0, 0, 0.111),
  55px 68px 179px rgba(0, 0, 0, 0.15)
}
.header{
    width: 100%;
    height: 100%;
    text-align: center;
    background-image: linear-gradient(to bottom right,rgb(41, 121, 150),rgb(97, 192, 197));

    border-bottom: 2px solid rgb(255, 244, 123);
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}
.header-cn{
    font-size: 32px;
}
.header-en{
    font-size: 14px;
    color: rgb(9, 74, 109);
}
.head-right{
    position: absolute;
    top: 20%;
    right: 0;
    width: 180px;
    height: 30%;
}
.uself{
    position: relative;
    text-align: center;
    float: left;
    width: 100px;
    height: 100px;
    background-color: rgb(50, 146, 255);
    border-radius: 100%;
    border:2px solid rgb(142, 0, 225);
    overflow: hidden;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.uself-name{
    font-size: 18px;
    position: absolute;
    left: 5%;
    top: 8%;
    width: 90%;
    height: 25%;
    border-radius: 5px;
    margin-top: 60%;
    color: rgb(172, 243, 65);
    /* color */
    background-color: rgba(193, 35, 170, 0.477);
}
.uself img {
    width: 140%;
    height: 250%;
    margin-left: -20%;
}
.more{
    float: right;
    width:60px;
    height: 60px;
    position: relative;
    background-image: linear-gradient(to bottom right,rgb(235, 150, 213),rgb(234, 50, 133));
    border-radius: 100%;
    margin-top: 20px;
    margin-right: 10px;
    cursor: pointer;
    border: 2px solid rgb(156, 70, 255);
    transition-duration: 0.3s;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.more:hover{
    width: 64px;
    margin-right: 8px;
    height: 64px;
}
.more-background{
    /* height: 190px; */
    height: 0;
    width: 64px;
    position: absolute;
    top: 0px;
    left: -2px;
    background-color: rgba(235, 136, 224, 0.059);
    border-radius: 64px;
    transition-duration: 0.3s;
    overflow: hidden;
    border-left: 2px solid rgb(255, 73, 246);
    border-right: 2px solid rgb(255, 73, 246);
}
.more1{
    width:100%;
    height: 40px;
    margin-top: 70px;
    background-color: rgba(231, 134, 238, 0.486);
    font-size: 14px;
    text-align: center;
    line-height: 40px;
}
.more1:hover{
    font-size: 16px;
    background-color: rgba(231, 134, 238, 0.731);
}
.more2{
    border-top: 2px solid rgb(73, 152, 255);
    border-bottom: 2px solid rgb(73, 152, 255);
    width: 100%;
    height: 40px;
    background-color: rgba(134, 238, 238, 0.489);
    font-size: 14px;
    text-align: center;
    line-height: 40px;
}
.more2:hover{
    font-size: 16px;
    background-color: rgba(134, 238, 238, 0.863);
}
.more-svg{
    transition-duration: 0.3s;
}
.more-svg:hover{
    margin-top: 2px;
    margin-left: 2px;
}
.router-left{
    float: left;
    height: 100%;
    width: 20%;
    /* background-color: rgb(198, 236, 223); */
    position: relative;
}
.leftmain{
    position: absolute;
    top: 12rem;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(170, 170, 232);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.student{
    overflow: hidden;
    transition-duration: 0.3s;
}
.left-main{
    text-align: center;
    line-height: 6rem;
    width: 100%;
    height: 6rem;
    /* background-color: aqua; */
    background-image: linear-gradient(to bottom right,rgb(161, 238, 238),rgb(15, 214, 254));
    border-bottom-right-radius: 50px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.littleleft{
    text-align: center;
    line-height: 3rem;
    height: 3rem;
    width: 80%;
    border-top-right-radius: 20px;
    /* background-color: aquamarine; */
    background-image: linear-gradient(to bottom right,rgb(200, 170, 255),rgb(232, 224, 151));
    border: 2px solid rgb(255, 87, 179);
    cursor: pointer;
}
.leftbot{
    position: absolute;
    bottom: -4%;
    left: 10%;
    /* background-color: aquamarine; */
    width: 50%;
    height: 30%;
    transform: rotateY(180deg);
}
/* .main{
    float: left;
    height: 100%;
    width: 80%;
    background-color: rgb(244, 238, 214);
} */

</style>