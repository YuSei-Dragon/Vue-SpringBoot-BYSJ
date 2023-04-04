<template>
    <div class="mainbody">
        <div style="height: 20%;"></div>
        <!-- <div class="text-input">
            <div class="text">账号</div>
            <input @focus="cleartip" placeholder="请输入账号..." v-model="UserAdmin.userName" type="text">
        </div> -->
        <div class="text-input">
            <div class="text">老密码</div>
            <input @focus="cleartip" placeholder="请输入老密码..." v-model="UserAdmin.userOldPassword" type="text">
        </div>
        <div class="text-input">
            <div class="text">新密码</div>
            <input @focus="cleartip" placeholder="请输入新密码..." v-model="UserAdmin.userNewPassword" type="text">
        </div>
        <div class="text-input">
            <button @click="submit">确认</button>
            <button @click="clear">重置</button>
        </div>
    </div>
    <div class="pagename">
        修改管理员密码
    </div>
    <div class="tips">
        {{ tips }}
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return{
                UserAdmin:{
                    userName:"",
                    userOldPassword:"",
                    userNewPassword:"",
                },
                tips:"",
            }
        },
        methods:{
            submit(){
                this.UserAdmin.userName = localStorage.getItem("sysname")
                console.log(this.UserAdmin)
                if(this.UserAdmin.userOldPassword==""){
                    this.tip("老密码不能为空")
                    // console.log(123321)
                }
                else if(this.UserAdmin.userNewPassword==""){
                    this.tip("新密码不能为空！")
                }
                else if(this.UserAdmin.userOldPassword==this.UserAdmin.userNewPassword){
                    this.tip("新密码不能与老密码相同！")
                }
                else{
                     let _this = this
                    axios.post('http://localhost:8181/sysAdmin/change', _this.UserAdmin).then(function(resp){
                        if(!resp){
                            _this.tip("修改失败，检查后台")
                        }
                     if(resp.data.code == 0 ){
                        // console.log("提交成功")
                        _this.tip("修改成功")
                        }
                    else{
                        _this.tip("出现未知错误!")
                    }
                    
                })
                }
            },
            clear(){
                this.UserAdmin.userOldPassword = ""
                this.UserAdmin.userNewPassword = ""
            },
            tip(changetip){
                this.tips = changetip
            },
            cleartip(){
                this.tips = ""
            }
        }
    }
</script>

<style scoped>
.mainbody{
    position: absolute;
    width: 400px;
    height: 300px;
    right: 28%;
    bottom: 30%;
    /* background-color: aqua; */
}
.text-input{
    width: 100%;
    height: 20%;
    /* background-color: aquamarine; */
}
.text{
    margin-left: 15%;
    float: left;
    text-align: center;
    font-size: 1.5rem;
    line-height: 150%;
}
.text-input input{
    float: left;
    height: 70%;
    width: 50%;
    outline: none;
    border: 0;
    border-radius: 5px;
    text-indent: 5px;
    font-size: 1rem;
    margin-left: 10%;
    background-image: linear-gradient(to bottom right,rgba(51, 230, 230, 0.436),rgba(15, 254, 162, 0.466));
}
.text-input button{
    float: left;
    height: 70%;
    width: 20%;
    outline: none;
    border: 0;
    border-radius: 5px;
    text-indent: 5px;
    font-size: 1rem;
    margin-left: 20%;
    cursor: pointer;
    background-color: rgb(232, 197, 255);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.pagename{
    position: absolute;
    right: 3%;
    bottom: 72%;
    font-size: 2rem;
    border-left: 5px solid red;
    text-indent: 20px;
}
.tips{
    width: 20%;
    height: 10%;
    position: absolute;
    font-size: 1.2rem;
    right: 8%;
    bottom: 41.5%;
    /* background-color: aqua; */
    color: red;
}
</style>