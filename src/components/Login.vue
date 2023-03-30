<template>
    <div class="body">
        <div @mouseout="less" @mouseover="bigger"   class="box">
            <div class="identify">
                <div :style="topleftborder" class="topleft-border">
                    
                </div>
                <div class="issys" @click="issys">
                    管理员
                </div>
                <div class="isuser" @click="isuser">
                    <div class="isuser_text">
                      普通用户  
                    </div>
                </div>
            </div>
            <div class="background">
                <div class="border-top">
                    <div v-if="which" class="which-block"></div>
                    <div class="which"></div>
                </div>
                <div class="user-pass">
                <div class="zhanghao-mima">
                    <input placeholder="请输入用户名" :style="inputbackground" @blur="inputblur" @focus="inputfocus" v-model="ruleForm.username">
                </div>
                <div class="zhanghao-mima">
                    <input placeholder="请输入密码" :style="inputbackground" @blur="inputblur" @focus="inputfocus" v-model="ruleForm.password" type="text">
                </div>
                <img src="../assets/user.webp" alt="">
                <div class="tips">{{ tips }}</div>
                
                </div>
                <div class="denglu-zhuce">
                <div class="dengluzhuce" @click="denglu" >
                    <img v-if="dengluimg" src="../assets/password1.webp" alt="">
                    <button @mouseover="dengluimg1" @mouseout="dengluimg2" style="background:rgb(135, 143, 255);" >登录</button>
                    
                </div>
                <div class="dengluzhuce"  v-show="!isSystem" @click="zhuce">
                    <img v-if="zhuceimg" src="../assets/password1.webp" alt="">
                    <button @mouseover="zhuceimg1" @mouseout="zhuceimg2" style="background:rgb(255, 89, 119);" >注册</button>
                    
                </div>

                <div :style="botrightborder" class="botright-border">

                </div>

                </div>   
            </div>     
        </div>
            <img class="backpictures" :src="imgArr[index]" alt="">
            <div class="corner-left"></div>
            <div class="corner-right"></div>
            <div class="corner-topright">
                <div style="position:relative">
                    <div class="corner-topright-back"></div>
                    <div class="corner-topright-backdown"></div>
                    <div class="corner-topright-text">
                        <div class="english">
                            welcome
                        </div> 
                        <br>
                        <div class="chinese">
                            欢迎
                        </div>
                        
                    </div>
                </div>
            </div>
    </div>

</template>

<script>
import axios from 'axios'
import router from '@/router'
import img0 from '@/assets/Aki.jpg'
import img1 from '@/assets/黎明杀机经典老图.jpg'
import img2 from '@/assets/亚托克斯.jpg'
    export default {
        name:"Login",
        data(){
            return {

            topleftborder:{
                top: "-10px",
                left: "-10px",
                height: "72px",
                width: "72px",
            },
            botrightborder:{
                right: "-10px",
                bottom: "-10px",
                height: "160px",
                width: "160px",
            },
            
            inputbackground:{
                background:"rgb(255, 223, 171)",
                // color:"rgb(93, 125, 240)",
            },
            tips:"",
            which:true,
            index:0,
            imgArr:[
                img0,
                img1,
                img2,
            ],
            isSystem : false,
            ruleForm:{
                username : "",
                password : "",
            },
            dengluimg:false,
            zhuceimg:false,
                }
        },
        methods:{
            bigger(){
                this.topleftborder.height = "100px"
                this.topleftborder.width = "100px"
                this.topleftborder.top = "-15px"
                this.topleftborder.left = "-15px"

                this.botrightborder.height = "120px"
                this.botrightborder.width = "120px"
                this.botrightborder.bottom = "-15px"
                this.botrightborder.right = "-15px"
            },
            less(){
                this.topleftborder.height = "72px"
                this.topleftborder.width = "72px"
                this.topleftborder.top = "-10px"
                this.topleftborder.left = "-10px"

                this.botrightborder.height = "160px"
                this.botrightborder.width = "160px"
                this.botrightborder.bottom = "-10px"
                this.botrightborder.right = "-10px"
            },

            issys(){
                this.isSystem = true
                this.which = false
            },
            isuser(){
                this.isSystem = false
                this.which = true
            },
            inputfocus(){
                this.inputbackground.background="rgb(255, 116, 78)"
                this.inputbackground.color = "rgb(93, 125, 240)"
                this.tips = ""
            },
            inputblur(){
                this.inputbackground.background = "rgb(255, 223, 171)"
                this.inputbackground.color = "rgb(93, 125, 240)"
            },
            dengluimg1(){
                this.dengluimg = true
            },
            zhuceimg1(){
                this.zhuceimg = true
            },
            dengluimg2(){
                this.dengluimg = false
            },
            zhuceimg2(){
                this.zhuceimg = false
            },

            denglu(){

                this.$store.commit('saveIdentify',this.isSystem)
                
                let _this = this
                // console.log(this.$store.state.isSys)
                if(this.isSystem == false){
                    axios.get('http://localhost:8181/userAdmin/login', {params:_this.ruleForm}).then(function (resp) {
                
                        switch(resp.data.code){
                            case 0:
                                localStorage.setItem("username",_this.ruleForm.username)
                                router.push('/userhome')
                                break
                            case -1:
                                _this.tips = "用户名不存在，请重新输入。"
                                _this.ruleForm.username = ""
                                _this.ruleForm.password = ""
                                break
                            case -2:
                                _this.tips = "密码错误，请确认账号和密码。"
                                _this.ruleForm.password = ""
                                break
                            default:
                                                }
                    // console.log(_this.ruleForm)
                    console.log(resp.data)
                })
                }else{
                    axios.get('http://localhost:8181/sysAdmin/login', {params:_this.ruleForm}).then(function (resp) {
                    
                        switch(resp.data.code){
                        case 0:
                            break
                        case -1:
                            break
                        case -2:
                            break
                        default:
                                            }
                    // console.log(resp.data)
            })
                }
            },

            zhuce(){
                router.push('/zhuce')
            },
            next(){
                this.index++
                if(this.index >= this.imgArr.length){
                    this.index = 0;
                }
                // console.log(this.index)
            },


        },
        mounted(){
            // console.log("123323")
            setInterval(()=>{this.next()},3000)
        }
        
        
    }
</script>

<style  scoped>

*{
    margin: 0;
    padding: 0;
}
html,body{
    height: 100%;
    width: 100%;
}
.body{
    height: 100%;
    width: 100%;

    position: relative;
    background-color: rgb(222, 67, 152);
}
.box{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -250px;
    height: auto;
    width: 500px;
    z-index: 10;
    
}
.backpictures{
    width: 100%;
    height: 99%;
}
.identify{
    height: 40px;
    width: 100%;
    position: relative;
}
.topleft-border{
    position: absolute;
    margin-top: 40px;
    /* background-color: aquamarine; */
    border-top: 8px solid red;
    border-left: 8px solid red;
    border-right: 8px solid transparent;
    border-bottom: 8px solid transparent;
    transition-duration: 0.3s;
}
.issys{
    float: right;
    height: 100%;
    width: 80px;
    background-image: linear-gradient(to top right,rgb(92, 70, 190),rgb(173, 203, 246));
    display: block;
    text-align: center;
    line-height: 40px;
    border-radius: 0 10px 0 0 ;
}
.issys:hover{
    font-size: 20px;
}
.isuser::before{
    content: "";
    height: 0;
    width: 0;
    display: block;
    border-bottom:40px solid rgb(255, 253, 125) ;
    border-left: 40px solid transparent;
    margin-left: -40px;

}
.isuser{
    float: right;
    height: 100%;
    width: 80px;
    background-image: linear-gradient(to right,rgb(255, 253, 125),rgba(255, 55, 24, 0.205));
    display: block;
    position: relative;
}
.isuser_text{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -40px;
    margin-top: -10px;
}
.isuser_text:hover{
    font-size: 18px;
    margin-top: -13px;
}
.issys,.isuser:hover{
    cursor: pointer;
}
.border-top{
    height: 40px;
    width: 70%;
    margin-left: 30%;
    border-top: 2px solid rgb(88, 195, 234);
}
.which-block{
    float: right;
    height: 100%;
    width: 26%;
    /* background-color: black; */
}
.which{
    float: right;
    margin-right: 6%;
    width: 0;
    height: 0;
    border-bottom: 16px solid transparent;
    border-right: 16px solid transparent;
    border-left: 16px solid transparent;
    border-top: 16px solid rgb(173, 233, 255);

}
.background{
    background-image: linear-gradient(to bottom right,rgba(255,0,0,0),rgb(255, 152, 215),rgb(113, 0, 151));
}
.user-pass{
    width: 100%;
    height: 160px;
    /* background-color: rgb(58, 110, 97); */
    position: relative;
}
.user-pass img{
    position: absolute;
    top: -8%;
    left: 8%;
    width: 150px;
    height: 150px;
    z-index: 5;
}
.zhanghao-mima{
    height: 50%;
    width: 100%;
    margin-left: 40%;
}
.zhanghao-mima input{
    float: left;
    width: 40%;
    height: 45%;
    margin-top: 10px;
    outline: none;
    font-size: 24px;
    background: rgb(255, 223, 171);
    border: 1px solid red;
    border-radius: 10px;
    text-indent: 10px;
    transition-duration: 0.5s;
    /* color: rgb(93, 125, 240); */
}
.zhanghao-mima input:hover{
    font-size: 20px;
}
.tips{
    /* background: red; */
    position: absolute;
    width: 40%;
    height: 20%;
    left: 40%;
    top: 32%;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    color: rgb(163, 0, 0);
}
.denglu-zhuce{
    position: relative;
}
.dengluzhuce{
    width: 100%;
    height: 60px;
    border-left: 2px solid rgb(88, 195, 234);
    position: relative;
}
.dengluzhuce img{
    position: absolute;
    width: 60px;
    height: 60px;
    top: -34%;
    left: 22%;
    /* transform: rotateY(180deg); */
    transform: rotate(120deg);
}
.dengluzhuce button{
    width: 30%;
    height: 60%;
    margin-left: 35%;
    margin-top: -20%;
    cursor: pointer;
    border-radius: 10px;
    border: 0;
    color: rgb(244, 213, 255);
    font-size: 18px;
    transition-duration: 0.2s;
}
.dengluzhuce button:hover{
    /* opacity: 0.7; */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    color: rgb(255, 255, 255);
}
.botright-border{
    position: absolute;
    /* background-color: blueviolet; */
    border-bottom: 8px solid rgb(255, 99, 99);
    border-right: 8px solid rgb(255, 83, 83);
    border-left: 8px solid transparent;
    border-top: 8px solid transparent;
    transition-duration: 0.3s;
}
.corner-left{
    position: absolute;
    bottom: 0;
    left: 0;
    height:0;
    width: 0;
    border-left: 100px solid rgb(222, 67, 152);
    border-top: 100px solid transparent;
}
.corner-right{
    position: absolute;
    bottom: 0;
    right: 0;
    height:0;
    width: 0;
    border-right: 60px solid rgb(222, 67, 152);
    border-top: 60px solid transparent;
}
.corner-topright{
    position: absolute;
    top: 0;
    right: 0;
}
.corner-topright-backdown{
    position: absolute;
    top: 0;
    right: 0;
    height:0;
    width: 0;
    border-right: 220px solid rgb(14, 72, 160);
    border-bottom: 220px solid transparent;
    z-index: 5;
}
.corner-topright-back{
    position: absolute;
    top: 0;
    right: 0;
    height:0;
    width: 0;
    border-right: 200px solid rgb(67, 129, 222);
    border-bottom: 200px solid transparent;
    z-index: 10;
}
.corner-topright-text{
    position: absolute;
    top: 10px;
    right: 20px;
    z-index: 10;
}
.english{
    font-size: 20px;
    color: aquamarine;
}
.chinese{
    font-size: 40px;
    margin-top: -15px;
    color: rgb(255, 239, 165);
}
</style>