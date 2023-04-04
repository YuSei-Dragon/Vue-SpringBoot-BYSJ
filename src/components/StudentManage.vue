<template>
    <div class="mainbody">
        <div v-for="student,  in students" :key="student.id" class="students">
            <div class="name">用户名</div>
            <div class="username">{{ student.userName }}</div>
            <div class="password">密码</div>
            <div class="userpassword">{{ student.userPassword }}</div>
            <button @click="change(student)" class="change">修改</button>
            <button @click="userdelete(student)" class="del">删除</button>
            
        </div>
    </div>
    <div v-show="queren" class="changebox">
        <div>
            <div class="input-name">用户</div>
            <input v-model="ChangepasswordForm.username" placeholder="请输入用户名..." class="input-text" type="text">
        </div>
        <div>
            <div class="input-name">密码</div>
            <input v-model="ChangepasswordForm.oldpassword" placeholder="请输入密码..." class="input-text" type="text">
        </div>
        <input v-model="ChangepasswordForm.newpassword" placeholder="请输入新密码..." class="changebox-input" type="text">
        <div>
            <button @click="changesubmit">确认</button>
            <button @click="quxiao">取消</button>
        </div>
        
    </div>
    <div class="pagename">
        学生账号管理
    </div>

</template>

<script>
import axios from 'axios'
import router from '@/router'
    export default {
        data(){
            return{
                UserAdmin:{
                    userName:"",
                    userPassword:"",
                },
                tips:"",
                ChangepasswordForm:{
                    username:"",
                    oldpassword:"",
                    newpassword:"",
                },
                students:[{userName:"qwe",userPassword:"123"}],
                queren:false,

            }
        },
        methods:{
            
            change(student){
                this.queren = true
                this.ChangepasswordForm.username = student.userName
                this.ChangepasswordForm.oldpassword = student.userPassword
            },
            userdelete(student){
                let _this = this
                    axios.get('http://localhost:8181/userAdmin/delete',{params:{"username":student.userName}}).then(function(resp){
                        console.log(student.userName)
                        if(resp)
                        {
                            console.log(resp)
                            if(resp.data.code==0){
                                // console.log("修改成功")
                                _this.showtips('账号删除成功','删除完成','账号删除已完成！')
                            }
                            else{
                                console.log("出现未知错误")

                            }
                            
                        }
                        
                    })
            },
            changesubmit(){
                let _this = this
                    axios.get('http://localhost:8181/userAdmin/changepassword',{params:_this.ChangepasswordForm}).then(function(resp){
                        if(resp)
                        {
                            // console.log(resp.data.code)
                            if(resp.data.code==0){
                                // console.log("修改成功")
                                _this.showtips('密码修改成功','修改完成','密码修改已完成！')
                                _this.quxiao()
                            }
                            else{
                                console.log("出现未知错误")

                            }
                            
                        }
                        
                    })
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
            quxiao(){
                this.queren = false
            },
            init(){
                let _this = this
                axios.get('http://localhost:8181/userAdmin/showall').then(function(resp){
                    if(resp){
                        _this.students = resp.data
                    }

                })
            }
        },
        mounted(){
            this.init()
        },
    }
</script>

<style scoped>
.mainbody{
    position: absolute;
    width: 450px;
    height: 300px;
    right: 23%;
    bottom: 30%;
    /* background-color: aqua; */
    overflow: auto;
}

.pagename{
    position: absolute;
    right: 3%;
    bottom: 72%;
    font-size: 2rem;
    border-left: 5px solid red;
    text-indent: 20px;
}
.students{
    height: 18%;
    width: 100%;
    background-color: rgb(245, 234, 246);
    position: relative;
    border-radius: 5px;
}
.name{
    position: absolute;
    top: 0;
    left: 0;
    width: 70px;
    height: 100%;
    background-color: rgb(206, 166, 244);
    text-align: center;
    line-height: 300%;
    font-size: 1.2rem;
    /* border-radius: 5px; */
}
.username{
    position: absolute;
    top: 0;
    left: 70px;
    width: 70px;
    height: 100%;
    /* background-color: rgb(73, 43, 226); */
    text-align: center;
    line-height: 300%;
    font-size: 1.2rem;
}
.password{
    position: absolute;
    top: 0;
    left: 140px;
    width: 70px;
    height: 100%;
    background-color: rgb(154, 202, 237);
    text-align: center;
    line-height: 300%;
    font-size: 1.2rem;
    /* border-radius: 5px; */
}
.userpassword{
    position: absolute;
    top: 0;
    left: 210px;
    width: 110px;
    height: 100%;
    /* background-color: rgb(43, 162, 226); */
    text-align: center;
    line-height: 300%;
    font-size: 1.2rem;
}
.change{
    position: absolute;
    top: 0;
    left: 320px;
    width: 60px;
    height: 90%;
    margin: 5px 0;
    background-color: rgb(117, 245, 162);
    text-align: center;
    line-height: 250%;
    font-size: 1.2rem;
    outline: none;
    border: 0;
    cursor: pointer;
    border-radius: 5px;
}
.del{
    position: absolute;
    top: 0;
    left: 390px;
    width: 60px;
    height: 90%;
    margin: 5px 0;
    background-color: rgb(244, 109, 85);
    text-align: center;
    line-height: 250%;
    font-size: 1.2rem;
    outline: none;
    border: 0;
    cursor: pointer;
    border-radius: 5px;
}
.changebox{
    position: absolute;
    width: 160px;
    height: 200px;
    bottom: 36%;
    right: 2%;
    /* background-color: aqua; */
    transition-duration: 0.3s;
}
.changebox-input{
    width: 100%;
    height: 30px;
    text-indent: 5px;
}
.changebox button{
    width: 40%;
    height: 30px;
    margin-left: 8%;
    margin-top: 5%;
    cursor: pointer;
}
.input-name{
    width: 30%;
    height: 30px;
    float: left;
    margin: 2px;
    background-color: aquamarine;
    text-align: center;
    line-height: 34px;
    border-radius: 5px;
}
.input-text{
    /* outline: none;
    border: 0; */
    width: 65%;
    height: 30px;
    float: left;
}
</style>