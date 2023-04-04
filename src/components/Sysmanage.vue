<template>
    <div class="mainbody">
        <div style="height: 20%;"></div>
        <div class="text-input">
            <div class="text">账号</div>
            <input @focus="cleartip" placeholder="请输入账号..." v-model="UserAdmin.sysName" type="text">
        </div>
        <div class="text-input">
            <div class="text">密码</div>
            <input @focus="cleartip" placeholder="请输入密码..." v-model="UserAdmin.sysPassword" type="text">
        </div>
        <div class="text-input">
            <button @click="submit">确认</button>
            <button @click="clear">重置</button>
        </div>
    </div>
    <div class="rightbody">
        <div v-for="sys in system" :key="sys.id"  class="system-del">
            <div class="sysname">管理员账号</div>
            <div class="sysname1">{{ sys.sysName }}</div>
            <button @click="sysdel(sys)" class="sysbutton">删除</button>
        </div>
    </div>
    <div class="pagename">
        增删管理员账号
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
                    sysName:"",
                    sysPassword:"",
                },
                tips:"",
                system:[],
            }
        },
        methods:{
            submit(){
                if(this.UserAdmin.sysName==""){
                    this.tip("用户名不能为空")
                    // console.log(123321)
                }
                else if(this.UserAdmin.sysPassword==""){
                    this.tip("密码不能为空！")
                }
                else{
                     let _this = this
                    //  console.log(this.UserAdmin)
                    axios.post('http://localhost:8181/sysAdmin/tijiao', _this.UserAdmin).then(function(resp){
                        if(!resp){
                            _this.tip("提交失败，检查后台")
                        }
                     if(resp.data.code == 0 ){
                        // console.log("提交成功")
                        _this.tip("新增成功")
                        }
                    else if(resp.data.code == -2){
                        _this.tip("此用户名已存在！")
                        _this.clear()
                    }else{
                        _this.tip("出现未知错误!")
                    }
                    
                })
                }
            },
            sysdel(sys){
                console.log(sys)
                let _this = this
                    axios.get('http://localhost:8181/sysAdmin/sysdel',{params:{"sysname":sys.sysName}}).then(function(resp){
                        
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
            clear(){
                this.UserAdmin.sysName = ""
                this.UserAdmin.sysPassword = ""
            },
            tip(changetip){
                this.tips = changetip
            },
            cleartip(){
                this.tips = ""
            },
            getsysmessage(){
                let _this = this
                axios.get('http://localhost:8181/sysAdmin/showall').then(function(resp){
                    // console.log(resp.data)
                    _this.system = resp.data
                    // console.log(_this.cards)

                })
            },
            init(){
                this.getsysmessage()
            },
            
        },
        mounted(){
            this.init()
        },
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
.rightbody{
    position: absolute;
    width: 300px;
    height: 200px;
    right: 0;
    bottom: 35%;
    background-color: rgb(240, 238, 201);
    border-radius: 5px;
}
.sysname{
    width: 30%;
    height: 40px;
    background-color: rgb(204, 127, 255);
    text-align: center;
    line-height: 40px;
    float: left;
    font-size: 1rem;
}
.sysname1{
    width: 50%;
    height: 40px;
    /* background-color: aquamarine; */
    text-align: center;
    line-height: 40px;
    float: left;
    font-size: 1rem;
}
.sysbutton{
    width: 20%;
    height: 36px;
    cursor: pointer;
    font-size: 1rem;
    background-color: rgb(243, 78, 72);
    margin: 2px 0;
    outline: none;
    border: 0;
    border-radius: 5px;
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