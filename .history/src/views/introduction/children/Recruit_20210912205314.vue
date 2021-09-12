<template>

<div id="recruit-content"><IntroductionTitle>招新方向</IntroductionTitle>
<div class="container">
      <div class="card">
            <span></span>
            <div class="content">
                <h2>前端</h2>
                <p>
                    前端负责界面实现以及业务逻辑实现，以优化用户体验为核心目的。UI是Creator，前端是Builder，通过浏览器访问的网站、某些APP、小程序、电脑上的部分桌面应用都是前端根据UI设计图，通过代码来还原实现。HTML决定网页有哪些内容和板块，CSS决定网页中内容的样式，JavaScript用于控制网页的功能、与用户交互息息相关
                </p>
            </div>
        </div>

         <div class="card">
            <span></span>
            <div class="content">
                <h2>后台</h2>
                <p>
                    后台开发，通常也称服务器端开发。主要负责业务逻辑功能模块，工作中处理前端的请求，进行逻辑处理和数据交互，现阶段的Web端、移动端等都需要后台技术的支持。C.A.T工作室后台组基于Java语言开发，如果你具备基本的C语言基础，对Java编程感兴趣，有出色的学习能力以及良好的团队协作能力，那么后台组绝对是你的不二选择
                </p>
            </div>
        </div>
</div></div>


</template>

<script>

import IntroductionTitle from '../../../components/IntroductionTitle.vue'
export default {
    name: 'Recruit',
    components: {
        IntroductionTitle
    }

}
</script>

<style lang="scss">

#recruit-content {
    margin-top: 30px;
}



.container{
    // background-color: rgb(31, 31, 31);
    margin-top: 10px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    cursor: pointer;
}
.container .card{
    position: relative;
    width: 265px;
    height: 330px;
    color: #fff;
    background-color: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 60px;
    transition: .5s;
}
.container .card:hover{
    transform: translateY(-25px);
}
.container .card::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg,#ffbc00,#ff0058);
}
.container .card::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(315deg,#03a9f4,#ff0058);
    filter: blur(30px);
}
.container .card:nth-child(2):after,
.container .card:nth-child(2):before{
    background: linear-gradient(315deg,#4dff03,#00d0ff);
}

.container .card span{
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    background-color: rgba(0,0,0,0.6);
    border-radius: 5px;
    z-index: 1;
}
.container .card span::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: rgba(255,255,255,0.1);
    pointer-events: none;
}
.container .card .content{
    z-index: 2;
    position: relative;
    padding: 20px 40px;
}
.container .card .content h2{
    font-size: 2em;
    color: #fff;
    margin-bottom: 10px;
    text-align: center;
}
.container .card .content p{
    font-size: 0.95em;
    color: #fff;
    line-height: 1.6em;
    margin-bottom: 10px;
}
.container .card .content a{
    display: inline-block;
    text-decoration: none;
    color:#000;
    background-color: #fff;
    padding: 7px;
    font-weight: 600;
    border-radius: 5px;
}

</style>