<template>
    <div class="body">
        <div class="header">
            <div class="header-cn">课程教学网站</div>
            <div class="header-en">Course teaching website</div>
        </div>
        <div class="head">
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
            <div class="toprouter">
                <div :style="{backgroundColor:(index==showchoice?'#fca88e':'#fff0bf')}" @click="chose(index)" v-for="choice,index in choices" :key = choice.id class="routerchoice">
                    {{ choice }}
                </div>
            </div>
            <div class="mainbody">
                <div :style="{height:(showchoice==0?'60%':'60px')}" class="mainblock">
                    <div class="learnrecord">
                        <div v-for="state in states" :key="state.id" class="learn">
                            {{ state }}
                        </div>
                    </div>
                </div>
                <div :style="{height:(showchoice==1?'60%':'60px')}" class="mainblock">
                    <div style="height:20px"></div>
                    <div class="changeinput">
                        <div class="change-text">旧密码</div>
                        
                        <input placeholder="请输入旧密码..." v-model="oldpassword" type="text">
                    </div>
                    <div class="changeinput">
                        <div class="change-text">新密码</div>
                        
                        <input placeholder="请输入新密码..." v-model="newpassword" type="text">
                    </div>
                    <div class="passwordbuttons">
                        <button @click="changesubmit">确认</button>
                        <button @click="clear">重置</button>
                    </div>
                </div>
                <div :style="{height:(showchoice==2?'60%':'60px')}" class="mainblock">
                    <div class="collectclass">
                        <div class="everycollect" v-for="cloclass,index in collectclasses" :key="cloclass.id">
                        {{ cloclass }}
                        </div>
                    </div>
                </div>
                <div :style="{height:(showchoice==3?'60%':'60px')}" class="mainblock">
                    <div class="word">
                        <div v-for="word,index in mywords" :key="word.id"  class="words">
                            {{ word }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'
    export default {
        data(){
            return{
                moreshowlen:{
                    height:0,
                },
                username : "",
                choices:["学习记录","修改密码","收藏课程","我的留言"],
                showchoice:0,
                oldpassword:"",
                newpassword:"",
                ruleForm:{
                username : "",
                oldpassword:"",
                newpassword : "",
            },
                collectclasses:[],
                mywords:[],
                states:[],
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
            chose(index){
                this.showchoice = index
            },
            clear(){
                this.oldpassword = ""
                this.newpassword = ""
            },
            changesubmit(){
                if(this.oldpassword==''){
                    this.showtips('旧密码未输入！','旧密码输入有误','请重新输入旧密码')
                }
                else if(this.newpassword==''){
                    this.showtips('新密码未输入！','新密码输入有误','请重新输入新密码')
                }
                
                else if(this.oldpassword==this.newpassword){
                    this.showtips('新密码不能与旧密码相同','新密码输入有误','请重新输入新密码')
                }
                else{
                    this.ruleForm.oldpassword = this.oldpassword
                    this.ruleForm.username = this.username
                    this.ruleForm.newpassword = this.newpassword
                    let _this = this
                    axios.get('http://localhost:8181/userAdmin/changepassword',{params:_this.ruleForm}).then(function(resp){
                        if(resp)
                        {
                            console.log(resp.data.code)
                            if(resp.data.code==0){
                                console.log("修改成功")
                                _this.showtips('密码修改成功','修改完成','密码修改已完成！')
                                _this.clear()
                            }
                            else{
                                console.log("出现未知错误")
                            }
                            
                        }
                        
                    })
                }

                
                // this.clear()
            },
            showtips(text,title,mes){
                this.$alert(text,title,{
                        confirmButtonText:'确认',
                        callback:action=>{
                            this.$message({
                                type:'info',
                                message:mes,
                            })
                        }
                    })
            },
            getstate(){
                let _this=this
                axios.get('http://localhost:8181/states/getmystates',{params:{"username":_this.username}}).then(function(resp){
                    console.log(resp)
                    console.log(_this.username)
                    // _this.collectclasses = resp.data
                    for(const state of resp.data){
                        _this.states.push(state.classes +" --- "+state.state )
                    }
                })
                // console.log(_this.states)
            },
            getcollect(){
                let _this=this
                axios.get('http://localhost:8181/collect/getcollect',{params:{"username":_this.username}}).then(function(resp){
                    console.log(resp.data)
                    // _this.collectclasses = resp.data
                    for(const clo of resp.data){
                        _this.collectclasses.push(clo.classname)
                    }
                })
            },
            getmyword(){
                let _this = this
                axios.get('http://localhost:8181/discuss/getmydiscuss',{params:{"username":_this.username}}).then(function(resp){
                    console.log(resp.data)
                    // _this.collectclasses = resp.data
                    for(const clo of resp.data){
                        _this.mywords.push(clo.text+"-----"+clo.classes)
                    }
                })
            },
            init(){
                this.username = localStorage.getItem("username")
                this.getcollect()
                this.getmyword()
                this.getstate()
            },

        },
        mounted(){
            this.init()
        },
        
    }
</script>

<style scoped>
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
    height: 90%;
    background-image: linear-gradient(to bottom right,rgba(52, 214, 214, 0.155),rgba(15, 254, 162, 0.466));
    position: relative;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.head-right{
    position: absolute;
    top: 0;
    right: 0;
    width: 180px;
    height: 15%;
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
.mainbody{
    width: 74%;
    height: 60%;
    position: absolute;
    top: 20%;
    margin-left: 13%;
    left: 0;
    /* background-color: aqua; */
}
.learnrecord{
    width: 50%;
    height: 300px;
    margin-left: 25%;
    margin-top: 40px;
    background-color: rgb(168, 228, 228);
}
.learn{
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border-bottom: 1px solid red;
    /* background-color: rgb(255, 127, 249); */
    background-image: linear-gradient(to bottom right,rgb(215, 95, 183),rgb(255, 218, 235));
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.changeinput{
    width: 30%;
    height: 80px;
    margin-top: 20px;
    background-color: rgb(220, 53, 53);
    margin-left: 35%;
    border-top-right-radius: 25px;
}
.changeinput input {
    width: 100%;
    height: 50%;
    outline: none;
    border: 0;
    border-radius: 5px;
    font-size: 1.6rem;
    text-indent: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}
.change-text{
    width: 100%;
    font-size: 1.8rem;
    text-indent: 10px;
    
}
.passwordbuttons{
    width: 30%;
    height: 80px;
    margin-left: 35%;
    /* background-color: aquamarine; */
}
.passwordbuttons button:hover{
    transition-duration: 0.3s;
    font-size: 1.2rem;
}
.passwordbuttons button{
    width: 30%;
    height: 40px;
    margin:0 10%;
    margin-top: 8%;
    outline: none;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    font-size: 1rem;
}
.collectclass{
    width: 50%;
    height: 300px;
    background-color: rgb(249, 250, 215);
    margin-left: 25%;
    margin-top: 40px;
}
.everycollect{
    width: 100%;
    height: 20%;
    /* background-color: rgb(183, 255, 231); */
    background-image: linear-gradient(to bottom right,rgb(40, 215, 145),rgb(194, 255, 207));
    text-align: center;
    border-radius: 5px;
    border-bottom: 1px solid red;
    line-height: 300%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.word{
    width: 50%;
    height: 300px;
    margin-left: 25%;
    margin-top: 40px;
    background-color: rgb(200, 248, 248);
}
.words{
    width: 100%;
    height: 20%;
    /* background-color: aquamarine; */
    background-image: linear-gradient(to bottom right,rgb(57, 217, 204),rgb(146, 240, 242)); 
    border-radius: 5px;
    border-bottom: 1px solid red;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.toprouter{
    width: 120px;
    height: 240px;
    position: absolute;
    top: 20%;
    margin-left: 87%;
    left: 0;
    background-color: aquamarine;
    /* border-bottom: 2px solid red; */
}
.routerchoice{
    width: 100%;
    height: 25%;
    background-color: rgb(81, 0, 255);
    border-bottom: 2px solid red;
    border-radius: 5px;
    cursor: pointer;
}
.mainblock{
    width: 100;
    /* height: 60px; */
    background-color: rgb(249, 222, 247);
    border-bottom: 2px solid red;
    transition-duration: 0.3s;
    border-radius: 5px;
    overflow: hidden;
}
</style>