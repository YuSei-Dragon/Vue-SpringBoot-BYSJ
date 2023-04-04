<template>
    <div class="mainbody">
        <div style="height: 20%;"></div>
        <div class="text-input">
            <div class="text">课程名字</div>
            <input @focus="cleartip" placeholder="请输入课程名字..." v-model="Myclass.name" type="text">
        </div>
        <div class="text-input">
            <div class="text">课程简介</div>
            <textarea class="textarea" cols="35" rows="5"  @focus="cleartip" placeholder="请输入课程简介..." v-model="Myclass.text" type="text"></textarea>
        </div>
        <div class="text-input">
            <button @click="submit">确认</button>
            <button @click="clear">重置</button>
        </div>
    </div>
    <div class="pagename">
        新增课程
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
                Myclass:{
                    name:"",
                    text:"",
                },
                tips:"",
            }
        },
        methods:{
            submit(){
                if(this.Myclass.name==""){
                    this.tip("课程名不能为空")
                    // console.log(123321)
                }
                else if(this.Myclass.text==""){
                    this.tip("课程简介不能为空！")
                }
                else{
                     let _this = this
                    axios.post('http://localhost:8181/class/addclass', _this.Myclass).then(function(resp){
                        if(!resp){
                            _this.tip("提交失败，检查后台")
                        }
                     if(resp.data.code == 0 ){
                        // console.log("提交成功")
                        _this.tip("新增成功")
                        }
                    else if(resp.data.code == -1){
                        _this.tip("此课程名已存在！")
                        _this.clear()
                    }else{
                        _this.tip("出现未知错误!")
                    }
                    
                })
                }
            },
            clear(){
                this.Myclass.name = ""
                this.Myclass.text = ""
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
    position: relative;
}
.textarea{
    width: 300px;
    height: 150px;
    top: 0;
    left: 195px;
    position: absolute;
    font-size: 1.2rem;
    text-indent: 8px;
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
    right: 6%;
    bottom: 41.5%;
    /* background-color: aqua; */
    color: red;
}
</style>