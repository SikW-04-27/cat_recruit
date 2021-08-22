<template>
  <div class="banner">
    <MyFront>c.a.t工作室欢迎你！</MyFront>
    <img src="../../assets/img/banner1.jpg" alt="">
  </div>
  <div id="content">
    <div class="studio-intro">
      <div>
        C.A.T工作室，成立于2017年，指导老师为梁祖红老师，分为前端和后台两个小组，致力于政府及企业级的大型项目开发，团队与玉兰集团、南方电网等公司建立了长期合作关系，近年来研发过广东省专家匹配系统、智能塑料回收瓶箱（与羊城通合作）等，同时组队参与App、小程序大赛并获得奖项，已有毕业师兄就职于一线互联网大厂。
      </div>
    </div>

    <div class="studio-done">
      <p>主要成就</p>
      <ul>
        <li>
          <span>国家海洋局南海分局北斗航标系统</span>
          <div>
            该航标系统主要用于将北斗卫星传来的航标数据标注在地图上，并显示航标所在海域的水文情况
          </div>
        </li>
        <li>
          <span>广州市供电局运营分析平台</span>
          <div>
            该平台主要用于管理广州市各地用电、电路维护、人员分配等的多项数据。对数据进行清洗和分析，实现数据可视化管理，解决了人工处理大量数据时的无法预测的错误、降低了人力资本，提高了数据处理速率和准确性
          </div>
        </li>
        <li>
          <span>国家海洋局南海分局北斗航标系统</span>
          <div>
            该航标系统主要用于将北斗卫星传来的航标数据标注在地图上，并显示航标所在海域的水文情况
          </div>
        </li>
      </ul>
    </div>
    <div class="studio-recruit">
      <p>招新方向</p>
      <ul>
        <li>
          <span>前端</span>
          <div class="front">
            前端负责界面实现以及业务逻辑实现，以优化用户体验为核心目的。UI是Creator，前端是Builder，通过浏览器访问的网站、某些APP、小程序、电脑上的部分桌面应用都是前端根据UI设计图，通过代码来还原实现。HTML决定网页有哪些内容和板块，CSS决定网页中内容的样式，JavaScript用于控制网页的功能、与用户交互息息相关
          </div>
        </li>
        <li>
          <span>后台</span>
          <div class="back">
            后台开发，通常也称服务器端开发。主要负责业务逻辑功能模块，工作中处理前端的请求，进行逻辑处理和数据交互，现阶段的Web端、移动端等都需要后台技术的支持。C.A.T工作室后台组基于Java语言开发，如果你具备基本的C语言基础，对Java编程感兴趣，有出色的学习能力以及良好的团队协作能力，那么后台组绝对是你的不二选择
          </div>
        </li>
      </ul>
    </div>
    <div class="studio-happy">
      <p>工作室日常</p>
      <img src="../../assets/img/happy1.jpg" alt="">
      <img src="../../assets/img/happy2.jpg" alt="">
      <img src="../../assets/img/happy3.jpg" alt="">
      <img src="../../assets/img/happy4.jpg" alt="">
    </div>
  </div>
</template>

<script>

import MyFront from "../../components/MyFront.vue"
export default {
  components: {
MyFront
  }
};
</script>

<style scoped lang="scss">
#content {
  margin: 0 auto;
  width: 70%;
  height: 1200px;
  color: #c2c2c2;
  font-size: 14px;
  background-color: #1e4353;
}

.banner {
  position: relative;
  width: 100%;
  height: 260px;
  background-color: green;
  span {
    position: absolute;
    color: #fff;
    top: 40%;
    left: 33%;
    letter-spacing: 12px;
    font-size: 35px;
    font-weight: 700;
  }
  img {
    width: 100%;
    height: 260px;
  }
}

.studio-intro {
  height: 250px;
  div {
    margin: 0 auto;
    padding: 8px 0;
    width: 240px;
    line-height: 25px;
  }

  img {
    float: left;
    width: 200px;
    height: 200px;
  }
}

/* .studio-done {
   background-color: #f6e4d8;
} */

.studio-done p,
.studio-recruit p,
.studio-happy p {
  padding: 8px 0;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid #fff;
}

.studio-done ul {
  padding: 0;
  display: flex;
  justify-content: space-around;
  li {
    /* flex: 1; */
    /* margin-right: 8px; */
    width: 220px;
    padding: 2px 8px;
    line-height: 25px;
    border: 1px solid #fff;
    span {
      width: 100%;
      text-align: center;
      font-weight: 700;
    }
  }
}

.studio-recruit ul {
  display: flex;
  justify-content: center;
  li {
    margin-right: 66px;
    width: 200px;
    line-height: 25px;
  }
  span {
    font-weight: 700;
  }
}

.studio-happy {
    img {
        height: 200px;
    }
}
</style>