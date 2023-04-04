<template>
    <div class="mainbody">
        <div class="maintop">
            <div class="maintop-class">课程名</div>
            <div class="maintop-name">用户名</div>
            <div class="maintop-text">留言详细</div>
        </div>
        <div v-for="discuss,  in discusses" :key ="discuss.id" class="students">
            <div class="name">{{discuss.classes}}</div>
            <div class="username">{{ discuss.user }}</div>
            <div class="dctext">{{ discuss.text }}</div>
            <button @click="discussdelete(discuss)" class="del">删除</button>
        </div>
    </div>
    <div class="pagename">
        留言管理
    </div>

</template>

<script>
import axios from 'axios'
import router from '@/router'
    export default {
        data(){
            return{
                tips:"",
                discusses:[],
            }
        },
        methods:{
            discussdelete(discuss){
                let _this = this
                    axios.get('http://localhost:8181/discuss/discussdel',{params:{"delid":discuss.id}}).then(function(resp){
                        
                        if(resp)
                        {
                            console.log(resp)
                            if(resp.data.code==0){
                                // console.log("修改成功")
                                _this.showtips('留言删除成功','删除完成','留言删除已完成！')
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
            init(){
                let _this = this
                axios.get('http://localhost:8181/discuss/getalldiscuss').then(function(resp){
                    if(resp){
                        _this.discusses = resp.data
                    }
                    console.log(_this.discusses)

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
.maintop{
    width: 100%;
    height: 18%;
    /* background-color: rgb(166, 24, 179); */
    position: relative;
}
.maintop-class{
    width: 70px;
    height: 100%;
    float: left;
    background-color: rgb(206, 166, 244);
    font-size: 1.2rem;
    text-align: center;
    line-height: 300%;
}
.maintop-name{
    width: 70px;
    height: 100%;
    float: left;
    background-color: #799cf0;
    font-size: 1.2rem;
    text-align: center;
    line-height: 300%;
}
.maintop-text{
    width: 220px;
    height: 100%;
    float: left;
    /* background-color: #c16d6d; */
    font-size: 1.2rem;
    text-align: center;
    line-height: 300%;
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
.dctext{
    position: absolute;
    top: 0;
    left: 140px;
    width: 220px;
    height: 100%;
    /* background-color: rgb(73, 43, 226); */
    text-align: center;
    line-height: 300%;
    font-size: 1.2rem;
    border-left: 1px solid red;
    overflow: hidden;
}

.del{
    position: absolute;
    top: 0;
    left: 370px;
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

</style>
