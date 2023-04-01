<template>
    <div class="body">
        <div class="header">
            <div class="header-cn">课程教学网站</div>
            <div class="header-en">Course teaching website</div>
        </div>
        <div class="head">
            <div class="head-left">
                <div style="float: left;">
                    <div class="classname-cn">课程名称</div>
                    <div class="classname-en">Course Name</div>
                </div>
                <div class="classname">{{ classname }}</div>
            </div>

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
                        <div @click="usermessage" class="more1">个人信息</div>
                        <div @click="backtologin" class="more2">退出登录</div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="main-body">
            <div class="jianjie">
                <div style="height:100px"></div>
                <div class="jianjie-title">课程简介</div>
                <div class="jianjie-text">{{ classtext }}</div>

            </div>

            <div class="discuss">
                <div class="discuss-show">
                    <div class="everydic" v-for="dic in discusses" :key="dic.id">{{ dic }}</div>
                </div>
                <input :style="inputcss" @blur="inputend" @focus="inputsm" placeholder="在此发表你对该课程的看法..." v-model="discussinput" class="discuss-input">
                <div class="discuss-buttons">
                    <button @click="submmit">发送</button>
                    <button>清除</button>
                </div>
            </div>
        </div>
            

        
        
        
    </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'
    export default {
        // props:{
        //     classes:{
        //         name:String,
        //         text:String,
        //     }
        // },
        name:"LearnClass",
        data(){
            return{
                moreshowlen:{
                    height:0,
                },
                inputcss:{},
                // classes:{
                //     name:this.$store.state.classes.name,
                //     text:this.$store.state.classes.text,
                // },
                // discusses:["dasdsadsad","egewdsgdsds","dscbhrfhsg","aegwwsagage",
                // "dasdsadsad","egewdsgdsds","dscbhrfhsg","aegwwsagage",
                // "dasdsadsad","egewdsgdsds","dscbhrfhsg","aegwwsagage",
                // "dasdsadsad","egewdsgdsds","dscbhrfhsg","aegwwsagage",],
                discusses:[],
                discussinput: "",
                classname: "",
                username:"",
                subdiscuss:{
                    text:"",
                    classes:"",
                    user:"",
                }
            }
        },
        methods:{
            moreshow(){
                this.moreshowlen = {height:190+'px'}
            },
            moreway(){
                this.moreshowlen = {height: 190+'px'}
            },
            moreaway(){
                this.moreshowlen = {height: 0}
            },
            usermessage(){
                router.push('./usermessage')
            },  
            backtologin(){
                router.push('/login')
            },
            inputsm(){
                this.inputcss = {boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}
            },
            inputend(){
                this.inputcss = {}
            },
            submmit(){
                this.discusses.reverse()
                this.discusses.push(this.username+ " : " + this.discussinput)
                this.subdiscuss.text = this.discussinput
                this.subdiscuss.classes = this.classname
                this.subdiscuss.user = this.username
                this.discusses.reverse()
                this.discussinput = ""

                
                let _this = this
                axios.post('http://localhost:8181/discuss/submit',_this.subdiscuss).then(function(resp){
                    console.log(resp.data)
                })
            },
            init(){
                this.username = localStorage.getItem("username")
                this.classtext = localStorage.getItem("text")
                this.classname = localStorage.getItem("class")
                let _this = this
                axios.get('http://localhost:8181/discuss/getdiscuss', {params:{"classname":_this.classname}}).then(function(resp){
                    // console.log(resp.data)
                    for(let mes of resp.data){
                        // console.log(mes.user + ":" +  mes.text)
                        const addmes = mes.user + " : "+ mes.text
                        _this.discusses.push(addmes)
                    }
                    _this.discusses.reverse()
                })
            },
        },
        mounted(){
            this.init()

        }
    }
</script>

<style  scoped>

.body{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.header{
    width: 100%;
    height: 10%;
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
.head{
    width: 100%;
    height: 30%;
    background-image: linear-gradient(to bottom right,rgba(52, 214, 214, 0.155),rgba(15, 254, 162, 0.466));
    position: relative;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.head-left{
    width: 100%;
    height: auto;
    float: left;
    /* background-color: aquamarine; */
    margin-top: 150px;
}
.classname-cn{
    font-size: 60px;
    margin-left: 10px;
    padding-left: 10px;
    color: rgb(52, 130, 247);
    border-left: 8px solid red;
    transition-duration: 0.3s;
}
.classname-cn:hover{
    padding-left: 50px;
    border:none;
}
.classname-en{
    font-size: 18px;
    margin-left: 30px;
    color: rgb(115, 36, 225);
}
.classname{
    float: left;
    font-size: 34px;
    margin-top: 30px;
    margin-left: 20%;
    width: 200px;
    height:auto;
    color: rgb(19, 5, 203);
    /* background-color: aqua; */
}
.head-right{
    position: absolute;
    top: 0;
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
    background-color: rgba(136, 220, 235, 0.073);
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
.main-body{
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom right,rgb(206, 237, 249),rgb(139, 190, 232));
}
.jianjie{
    float: left;
    width: 40%;
    /* margin-right: 10%; */
    height: 100%;
    padding-right: 10%;
    /* background-color: aqua; */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    
}
.jianjie-title{
    width: 200px;
    height: 40px;
    /* background-color: beige; */
    font-size: 30px;
    margin-left: 20px;
    padding-left: 20px;
    border-left: 3px solid red;
}
.jianjie-text{
    margin-left: 20px;
    margin-top: 30px;
}
.discuss{
    float: left;
    width: 30%;
    margin-left: 20%;
    height: 100%;
    /* background-color: aquamarine; */
    
}
.discuss-show{
    width: 100%;
    height: 40%;
    margin-top: 5%;
    /* background-color: aquamarine; */
    background-image: linear-gradient(to bottom right,rgb(249, 233, 245),rgb(246, 152, 194));
    border-radius: 5%;
    overflow: auto;
    display: flex;
    flex-direction: column-reverse;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.discuss-input{
    width: 90%;
    height: 5%;
    margin-left: 5%;
    border-bottom-left-radius: 10%;
    border-bottom-right-radius: 10%;
    background-color: bisque;
    outline: none;
    border: none;
    font-size: 1.2rem;
    text-indent: 5px;
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}
.discuss-buttons{
    width: 100%;
    height: 5%;
    margin-top: 2%;
    /* background-color: aqua; */
    border-radius: 5%;
}
.discuss-buttons button{
    width: 35%;
    height: 100%;
    margin-left: 10%;
    cursor: pointer;
    background-color: rgb(237, 109, 194);
    outline: none;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}
.discuss-buttons button:hover{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.everydic{
    font-size: 20px;
    margin-bottom: 10px;
    /* background-color: aqua; */
    margin-left: 20px;
}
</style>