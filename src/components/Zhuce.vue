<template>
    <div class="body">
            <div class="backpicture">
            </div>
                
            <div class="box">
                <div class="inputs" >
                用户名
                <input placeholder="input your name here" :style="{backgroundColor:inputColor}" @blur="inputblur" @focus="clear();focushere()" type="text" v-model="UserAdmin.userName">
                </div>
                <div class="inputs">
                密码
                <input placeholder="input your password here" :style="{backgroundColor:inputColor1}" @blur="inputblur" @focus="clear();focushere1()" type="text" v-model="UserAdmin.userPassword">
                </div>
                <div class="inputs">
                确认密码
                <input placeholder="check your password here" :style="{backgroundColor:inputColor2}" @blur="inputblur" @focus="clear();focushere2()" type="text" v-model="checkPassword">
                </div>
                <div class="inputs">
                <button @mouseout="less" @mouseover="bigger" :style="buttons"  @click="clearall">重置</button>    
                <button @mouseout="less1" @mouseover="bigger1" :style="buttons1"  @click="tijiao">确认</button>
                <div>
                    <div :style="{height:tips}" class="tips">{{ reason }}</div>
                </div>
                </div>
            </div>
            <div class="background">
            </div>
            <div class="left-curtain">

            </div>
            <div class="right-curtain">

            </div>
            
                
        
    </div>
</template>

<script>
import router from '@/router'
import axios from 'axios'
    export default {
        name:"Zhuce",
        data(){
            return{
                UserAdmin:{
                userName : "",
                userPassword : "",
            },
            checkPassword:"",
            tips:"0px",
            reason:"",
            inputColor:"rgb(253, 253, 253)",
            inputColor1:"rgb(253, 253, 253)",
            inputColor2:"rgb(253, 253, 253)",
            buttons:{
                fontSize:"18px",
            backgroundColor: "rgb(255, 84, 84)",
            },
            buttons1:
            {fontSize:"18px",
            backgroundColor: "rgb(66, 255, 138)",
        },
            }  
        },
        methods:{
            bigger(){
                this.buttons.fontSize = "20px"
                this.buttons.backgroundColor="rgb(255, 239, 97)"
            },
            less(){
                this.buttons.fontSize = "18px"
                this.buttons.backgroundColor="rgb(255, 84, 84)"
            },
            bigger1(){
                this.buttons1.fontSize = "20px"
                this.buttons1.backgroundColor="rgb(255, 239, 97)"
            },
            less1(){
                this.buttons1.fontSize = "18px"
                this.buttons1.backgroundColor="rgb(66, 255, 138)"
            },
            focushere(){
                this.inputColor = "rgb(253, 250, 94)"
            },
            focushere1(){
                this.inputColor1 = "rgb(253, 250, 94)"
            },
            focushere2(){
                this.inputColor2 = "rgb(253, 250, 94)"
            },
            inputblur(){
                this.inputColor = "rgb(253, 253, 253)"
                this.inputColor1 = "rgb(253, 253, 253)"
                this.inputColor2 = "rgb(253, 253, 253)"
            },
            tijiao(){
            //    console.log("???")
                if(this.UserAdmin.userName==""){
                    this.tip("用户名不能为空")
                    // console.log(123321)
                }
                else if(this.UserAdmin.userPassword==""){
                    this.tip("密码不能为空！")
                }
                else if(this.UserAdmin.userPassword != this.checkPassword){
                    this.tip("前后密码不一致！")
                    // console.log(this.UserAdmin.userPassword ,this.checkPassword)
                }
                else{
                     let _this = this
                    axios.post('http://localhost:8181/userAdmin/tijiao', _this.UserAdmin).then(function(resp){
                        if(!resp){
                            _this.tip("提交失败，检查后台")
                        }
                     if(resp.data.code == 0 ){
                        // console.log("提交成功")
                        if(window.confirm("注册成功！是否现在就去登录？")){
                            // console.log("yes")
                            router.push('/login') 
                        }else{
                            // console.log("no")
                            _this.clearall()
                        }
                        
                        }
                    else if(resp.data.code == -2){
                        _this.tip("此用户名已存在！")
                        _this.clearall()
                    }else{
                        _this.tip("出现未知错误!")
                    }
                    
                })
                }
                
        },
        clear(){
            this.tips = "0px"
            this.reason = ""
        },
        clearall(){
            this.UserAdmin.userName = ""
            this.UserAdmin.userPassword = ""
            this.checkPassword = ""
        },
        tip(reasons){
            this.tips = "100px"
            this.reason = reasons

        }
    }
}
</script>

<style scoped>
.body{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
.backpicture{
    width: 100%;
    height: 100%;
    background-image: url("../assets/注册.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 1;
}
.box{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    margin-top: -100px;
    margin-left: -150px;
    height: 200px;
    z-index: 10;
    /* background-color: aqua; */
}
.inputs{
    float: left;
    width: 100%;
    height: 25%;
    /* text-align: center; */
    line-height: 40px;
    font-size: 18px;
    margin-left: 10%;
}
.inputs input{
    float: right;
    height: 50%;
    width: 60%;
    margin-right: 10%;
    margin-top: 3%;
    border: 0;
    outline: 0;
    border-radius: 5px;
    text-indent: 5px;
    /* background-color: rgb(253, 253, 253); */
    /* background-color: rgb(253, 250, 94); */
    transition-duration: 0.3s;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.inputs button{
    float: right;
    width: 20%;
    height: 60%;
    margin-right: 10%;
    cursor: pointer;
    border: 0;
    /* font-size: 16px; */
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.background{
    position: absolute;
    width: 300px;
    height: 200px;
    background-color: rgb(107, 229, 250);
    display: block;
    top: 50%;
    margin-top: -110px;
    left: 50%;
    margin-left: -140px;
    z-index: 5;
    opacity: 0.7;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.left-curtain{
    position: absolute;
    width: 80%;
    height: 150%;
    top: -20%;
    left: -32%;
    background-color: rgb(255, 58, 74);
    z-index: 3;
    opacity: 0.5;
    transform: rotate(20deg);
}
.right-curtain{
    position: absolute;
    width: 80%;
    height: 150%;
    top: -20%;
    right: -32%;
    background-color: rgb(41, 184, 245);
    z-index: 3;
    opacity: 0.5;
    transform: rotate(20deg);
}
.tips{
    background-color: rgb(255, 194, 242);
    color: red;
    width: 150px;
    position: absolute;
    bottom: 80px;
    right: -200px;
    z-index: 5;
    transition-duration: 0.3s;
    border-radius: 5px;
    text-align: center;
    line-height: 100px;
    font-size: 18px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}


</style>