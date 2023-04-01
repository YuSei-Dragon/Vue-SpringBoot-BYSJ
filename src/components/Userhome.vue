<template>
    <div class="body">
        <div class="header">
            <div class="header-cn">课程教学网站</div>
            <div class="header-en">Course teaching website</div>
        </div>
        <div class="head">
            <div class="head-left" ref="chart"></div>
            <div class="chart-text">课程讨论热度</div>
            <input v-model="search" placeholder="点此搜索..." class="head-input" type="text">
            <div class="head-bot"></div>
            <div class="line-left">
                <div class="line-left1" ></div>
            </div>
            <div class="line-right">
                <div class="line-right1"></div>
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
                        <div class="more1">个人信息</div>
                        <div @click="backtologin" class="more2">退出登录</div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="list">
            <div class="cards-center">
                <div   @click='turnback(index)' 
                :class="{turnbackcss: index==turnindex&&isback==false,
                    turntopon:index==top,
                    turnboton:index==bot,
                    turnlefton:index==left,
                    turnrighton:index==right,
                    turntopleft:index==topleft,
                    turntopright:index==topright,
                    turnbotleft:index==botleft,
                    turnbotright:index==botright,
                    
                    }" 
                    
                    class="cards" v-show="show(search,card)" v-for="card,index in cards" :key="card.id">
                    <img class="card-img" :src="index==cardimg?cardimgArr[imgindex]:cardimgArr[0]" alt="">
                    <div class="card-move">
                        <div class="card-up">
                            <div @mouseout="turnall1" @mouseover="turntopleft(index)" class="fourcorners"></div>
                            <div @mouseout="turnall1" @mouseover="turntop(index)" class="card-top"></div>
                            <div @mouseout="turnall1" @mouseover="turntopright(index)" class="fourcorners"></div>
                        </div>
                        
                        <div class="card-mid">
                            <div @mouseout="turnall1" @mouseover="turnleft(index)" class="card-left"></div>
                            <div @mouseout="turnall1" @mouseover="turnright(index)" class="card-right"></div>
                            <div  @click="changeimg(index)" class="clickhere">
                                <div v-show="imgindex==0||index!=cardimg">
                                    {{ card.name }}
                                </div>
                                <!-- 点此查看
                                <br>
                                详细信息 -->
                            </div>
                            <div @click="learnmore(index)" v-show="imgindex==0||index!=cardimg" class="button">
                                了解更多
                            </div>
                        </div>
                        <div class="card-down">
                            <div @mouseout="turnall1" @mouseover="turnbotleft(index)" class="fourcorners"></div>
                            <div @mouseout="turnall1" @mouseover="turnbot(index)" class="card-bot"></div>
                            <div @mouseout="turnall1" @mouseover="turnbotright(index)" class="fourcorners"></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import img0 from '@/assets/游戏王卡面1.jpg'
import img1 from '@/assets/三国杀.jpg'
import axios from 'axios'
import router from '@/router'
    export default {
        name:"Userhome",
        data(){
            return{
                search:"",
                issys : this.$store.state.isSys,
                echartdata:[
                            { value: 1, name: 'no1' },
                            { value: 1, name: 'no2' },
                            { value: 1, name: 'no3' },
                            { value: 1, name: 'others' },
                        ],
                echartlist:[],
                alldiscuss:[],
                moreshowlen:{
                    height:0,
                },
                username:"",
                turnindex : -1,
                isback :true,
                top : -1,
                bot :-1,
                left :-1,
                right :-1,
                topleft:-1,
                topright:-1,
                botleft:-1,
                botright:-1,
                cardimgArr:[
                    img0,
                    img1,
                ],
                imgindex:0,
                cardimg : -1,
                cards:[

                ],
            turnbackcss:{
                transform: '',

            },
            }
        },
        watch:{
            echartdata:function(){
                const mychart = this.$echarts.init(this.$refs.chart)
                mychart.setOption(this.getOption())
            }
        }
        ,
        methods:{
            show(search1,card){
                search1 = search1.trim()
                // console.log(card)
                if(search1==""){
                    return true
                }
                if(card.name.indexOf(search1)!=-1){
                    return true
                }
                return false
            },
            moreshow(){
                this.moreshowlen = {height:190+'px'}
            },
            moreway(){
                this.moreshowlen = {height: 190+'px'}
            },
            moreaway(){
                this.moreshowlen = {height: 0}
            },
            backtologin(){
                router.push('/login')
            },
            turnback(index){
                this.turnindex = index
                this.isback = !this.isback
                // this.turnbackcss.transform = "rotateY(180deg)"
                
            },
            turntop(index){
                this.top = index
                // console.log(this.isback)
            },
            turntopleft(index){
                this.topleft = index
            },
            turntopright(index){
                this.topright = index
            },
            turnbot(index){
                this.bot = index
            },
            turnbotleft(index){
                this.botleft = index
            },
            turnbotright(index){
                this.botright = index
            },
            turnleft(index){
                this.left = index
            },
            turnright(index){
                this.right = index
            },
            turnall1(){
                this.top = -1
                this.bot = -1
                this.left = -1
                this.right = -1
                this.topleft = -1
                this.topright = -1
                this.botleft = -1
                this.botright = -1
            },
            changeimg(index){
                this.cardimg = index
                // console.log(index)
                if(this.imgindex<=0){
                    this.imgindex = 1
                }else{
                    this.imgindex = 0
                }
            },
            learnmore(index){
                // this.$store.commit('saveClasses',this.cards[index])
                localStorage.setItem("class",this.cards[index].name)
                localStorage.setItem("text",this.cards[index].text)
                router.push('/learnclass')
            },
            getOption(){
                return{
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '5%',
                        left: 'center'
                    },
                    series: [
                        {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: this.echartdata,
                        }
                    ]
                }
            },
            ishaveclass(list,classname){
                        for(let names of list){
                            // console.log(name)
                            if( classname == names.name){
                                // console.log(classname)
                              names.value++
                            return true  
                            }
                        }
                        return false
            },
            findmax(){
                for(let i = 0;i<this.alldiscuss.length;i++){
                    let classname = this.alldiscuss[i].classes
                    // console.log(classname)
                    if(this.ishaveclass(this.echartlist,classname)
                        // classname in list
                    )
                        {
                            // console.log("if is true")
                        
                    }else{
                        // console.log("if is false")
                        const add = {'value':1,'name':classname}
                        this.echartlist.push(add)
                    }
                }
                // console.log(this.echartlist)
                return this.echartlist

            },
            init(){
                
                this.username = localStorage.getItem("username")
                let _this = this
                axios.get('http://localhost:8181/class/search').then(function(resp){
                    // console.log(resp.data)
                    _this.cards = resp.data
                    // console.log(_this.cards)

                })
                axios.get('http://localhost:8181/class/echart').then(function(resp){
                    // console.log(resp.data)
                    _this.alldiscuss = resp.data
                    _this.echartdata =  _this.findmax()

                })

                const mychart = _this.$echarts.init(_this.$refs.chart)
                mychart.setOption(_this.getOption())

            }
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
.head-bot{
    width: 16%;
    height: 60px;
    background-color: rgba(60, 49, 189, 0.623);
    position: absolute;
    top: 80%;
    left: 42%;
}
.head-bot::before{
    content: "";
    width: 0;
    height: 0;
    border-bottom:60px solid rgba(60, 49, 189, 0.623) ;
    border-left: 60px solid transparent;
    position: absolute;
    top: 0;
    left: -60px;
}
.head-bot::after{
    content: "";
    width: 0;
    height: 0;
    border-bottom:60px solid rgba(60, 49, 189, 0.623) ;
    border-right: 60px solid transparent;
    position: absolute;
    top: 0;
    right: -60px;
}
.line-left{
    position: absolute;
    width: 20%;
    height: 10px;
    /* background-color: aquamarine; */
    bottom: 2%;
    left: 16%;
}
.line-left1{
    float: left;
    width: 100%;
    height: 100%;
    position: relative;
    background-color: rgb(212, 122, 173);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.line-left1::after{
    content: "";
    width: 20px;
    height: 60px;
    /* right: -20%;
    bottom: 0;
    position: absolute; */
    float: right;
    margin-top: -50px;
    margin-right: -30px;
    background-color: rgb(212, 122, 173);
    transform: skew(-45deg);
}
.line-right{
    position: absolute;
    width: 20%;
    height: 10px;
    /* background-color: aquamarine; */
    bottom: 2%;
    right: 16%;
}
.line-right1{
    float: right;
    width: 100%;
    height: 100%;
    position: relative;
    background-color: rgb(212, 122, 173);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.line-right1::after{
    content: "";
    width: 20px;
    height: 60px;
    /* right: -20%;
    bottom: 0;
    position: absolute; */
    float: left;
    margin-top: -50px;
    margin-left: -30px;
    background-color: rgb(212, 122, 173);
    transform: skew(45deg);
}
.head-right{
    position: absolute;
    top: 0;
    right: 0;
    width: 180px;
    height: 30%;
}
.head-left{
    float: left;
    width: 25%;
    height: 100%;
    position: relative;
    /* background-color: aqua; */
}
.chart-text{
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    /* width: 100px; */
    /* height: 100px; */
    /* background-color: aqua; */
    z-index: 20;
    font-size: 1rem;
    padding-left: 5px;
    border-left: 2px solid red;
}
.head-input {
    margin-top: 20px;
    float: left;
    height: 30px;
    width: 50%;
    /* margin-left: 25%; */
    outline: none;
    border: 0;
    border-radius: 5px;
    text-indent: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
.list{
    height: 60%;
    width: 100%;
    overflow-y:auto;
    background-image: url("../assets/青眼白龙.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    /* background-position: center; */
    background-attachment: fixed;
    /* background-image: linear-gradient(to bottom right,rgba(225, 223, 195, 0.461),rgba(247, 197, 117, 0.493)); */
}
.cards-center{
    margin: 0 4%;
    /* height: 100%; */
    /* overflow: hidden; */
    display: inline-block;
    width: auto;
    /* width: auto; */
}
.cards{
    width: 250px;
    height: 300px;
    float: left;
    margin: 32px;
    /* background-color: aquamarine; */
    transition-duration: 0.2s;
    position: relative;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.card-img{
    width: 100%;
    height: 100%;
}
.turnbackcss{
    transform: rotateY(180deg);
}
.card-top{
    float: left;
    width: 50%;
    height: 100%;
    /* background-color: azure; */
}
.fourcorners{
    float: left;
    width:25%;
    height: 100%;
    /* background-color: bisque; */
}
.turntopon{
    transform: rotateX(30deg);
}
.card-bot{
    float: left;
    width: 50%;
    height: 100%;
    /* background-color: azure; */
}
.turnboton{
    transform: rotateX(-30deg);
}
.card-move{
    width: 250px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
}
.card-up{
    width:100%;
    height: 25%;
}
.card-mid{
    width: 100%;
    height: 50%;
    position: relative;
}
.button{
    position: absolute;
    top:160%;
    left: 25%;
    width: 50%;
    height: 30px;
    background-color: rgb(236, 199, 132);
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
    color: red;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}
.card-left{
    position: absolute;
    height: 100%;
    width: 25%;
    /* background-color: aqua; */
    top: 0;
    left: 0;
}
.turnlefton{
    transform: rotateY(-30deg);
}
.card-right{
    position: absolute;
    height: 100%;
    width: 25%;
    /* background-color: aqua; */
    top: 0;
    right: 0;
}
.clickhere{
    position: absolute;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 100%;
    font-size: 24px;
    text-align: center;
    z-index: 20;
}
.card-down{
    height: 25%;
    width: 100%;
}
.turnrighton{
    transform: rotateY(30deg);
}
.turntopleft{
    transform: rotate3d(1,-1,0,30deg);
}
.turntopright{
    transform: rotate3d(1,1,0,30deg);
}
.turnbotleft{
    transform: rotate3d(-1,-1,0,30deg);
}
.turnbotright{
    transform: rotate3d(-1,1,0,30deg);
}
</style>