<template>
    <div class="body">
        <div class="header">
            <div class="header-cn">课程教学网站</div>
            <div class="header-en">Course teaching website</div>
        </div>
        <div class="head">
            <input v-model="search" placeholder="点此搜索..." class="head-input" type="text">
            <div class="head-right">
                <div class="uself">
                    <!-- <img src="../assets/user.webp" alt=""> -->
                </div>
                <div class="more">
                    <div class="more-svg" >
                        <svg t="1679889089926" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2774" width="60" height="60"><path d="M224 608c-52.928 0-96-43.072-96-96s43.072-96 96-96 96 43.072 96 96-43.072 96-96 96zM512 608c-52.928 0-96-43.072-96-96s43.072-96 96-96 96 43.072 96 96-43.072 96-96 96zM800 608c-52.928 0-96-43.072-96-96s43.072-96 96-96 96 43.072 96 96-43.072 96-96 96z" p-id="2775" fill="#52f2f9"></path></svg>
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
                    <div class="card-up">
                        <div @mouseout="turnall1" @mouseover="turntopleft(index)" class="fourcorners"></div>
                        <div @mouseout="turnall1" @mouseover="turntop(index)" class="card-top"></div>
                        <div @mouseout="turnall1" @mouseover="turntopright(index)" class="fourcorners"></div>
                    </div>
                    
                    <div class="card-mid">
                        <div @mouseout="turnall1" @mouseover="turnleft(index)" class="card-left"></div>
                        <div @mouseout="turnall1" @mouseover="turnright(index)" class="card-right"></div>
                        <div class="clickhere">
                            {{ card.name }}
                            <!-- 点此查看
                            <br>
                            详细信息 -->
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
</template>

<script>
    export default {
        name:"Userhome",
        data(){
            return{
                search:"",
                issys : this.$store.state.isSys,
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
                cards:[{
                    "name":"abc",
                    "text":"hello world",
                    "id":1,
                },
                {
                    "name":"abc1",
                    "text":"hello world1",
                    "id":2,
                },
                {
                    "name":"abc2",
                    "text":"hello world2",
                    "id":3,
                },
                {
                    "name":"abc3",
                    "text":"hello world3",
                    "id":4,
                },
                {
                    "name":"abc",
                    "text":"hello world",
                    "id":1,
                },
                {
                    "name":"abc1",
                    "text":"hello world1",
                    "id":2,
                },
                {
                    "name":"abc2",
                    "text":"hello world2",
                    "id":3,
                },
                {
                    "name":"abc3",
                    "text":"hello world3",
                    "id":4,
                },
                {
                    "name":"abc",
                    "text":"hello world",
                    "id":1,
                },
                {
                    "name":"abc1",
                    "text":"hello world1",
                    "id":2,
                },
                {
                    "name":"abc2",
                    "text":"hello world2",
                    "id":3,
                },
                {
                    "name":"abc3",
                    "text":"hello world3",
                    "id":4,
                },
            ],
            turnbackcss:{
                transform: '',

            },
            }
        },
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
            }
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
    background-image: linear-gradient(to bottom right,rgb(52, 214, 214),rgb(15, 254, 162));
    position: relative;
}
.head-right{
    position: absolute;
    top: 0;
    right: 0;
    width: 180px;
    height: 30%;

}
.head-input {
    margin-top: 20px;
    height: 30px;
    width: 50%;
    margin-left: 25%;
    outline: none;
    border: 0;
    border-radius: 5px;
    text-indent: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.uself{
    float: left;
    width: 100px;
    height: 100px;
    background-color: rgb(50, 146, 255);
    border-radius: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.uself img {
    width: 76%;
    height: 76%;
    margin-top: 10%;
    margin-left: 12%;
}
.more{
    float: right;
    width:60px;
    height: 60px;
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
    background-image: linear-gradient(to bottom right,rgb(225, 223, 195),rgb(247, 197, 117));
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
    margin: 20px;
    background-color: aquamarine;
    transition-duration: 0.2s;
    position: relative;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.turnbackcss{
    transform: rotateY(180deg);
}
.card-top{
    float: left;
    width: 50%;
    height: 100%;
    background-color: azure;
}
.fourcorners{
    float: left;
    width:25%;
    height: 100%;
    background-color: bisque;
}
.turntopon{
    transform: rotateX(30deg);
}
.card-bot{
    float: left;
    width: 50%;
    height: 100%;
    background-color: azure;
}
.turnboton{
    transform: rotateX(-30deg);
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
.card-left{
    position: absolute;
    height: 100%;
    width: 25%;
    background-color: aqua;
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
    background-color: aqua;
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