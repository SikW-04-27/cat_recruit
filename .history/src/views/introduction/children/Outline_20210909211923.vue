<template>
  <div class="studio-intro">
    <div class="studio-intro-words">
      C.A.T工作室，成立于2017年，指导老师为梁祖红老师，分为前端和后台两个小组，致力于政府及企业级的大型项目开发，团队与玉兰集团、南方电网等公司建立了长期合作关系，近年来研发过广东省专家匹配系统、智能塑料回收瓶箱（与羊城通合作）等，同时组队参与App、小程序大赛并获得奖项，已有毕业师兄就职于一线互联网大厂。
    </div>
    <div class="a"></div>
    <div class="b"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.studio-intro {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background-image: url();
  .studio-intro-words {
    margin: 60px auto 0;
    padding: 10px 20px;
    width: 250px;
    // height: 300px;
    line-height: 25px;
    border-radius: 20px;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.2)
    );

    /* 重点：使元素背景模糊化 */
    backdrop-filter: blur(11px);
    /* 设置上高光和左高光，使其看起来更加逼真 */
    border-top: 1px solid rgba(255, 255, 255, 0.8);
    border-left: 1px solid rgba(255, 255, 255, 0.8);
  }

  .a {
    width: 160px;
    height: 160px;
    // border-radius: 50%;
    // background-color: #77fdd7;
    background-image: url('../../../assets/img/catlogo.png');
    background-size: 160px 160px;
    position: absolute;
    // top: 20px;
    top: 35%;
    right: 27%;
    // transform: translate(-50%);
    // right: 235px;
    z-index: -99;
  }

  .b {
    width: 160px;
    height: 160px;
    // border-radius: 50%;
    // background-color: #77fdd7;
    background-image: url('../../../assets/img/catlogo.png');
    background-size: 160px 160px;
    position: absolute;
    // top: 20px;
    top: 35%;
    right: 57%;
    // transform: translate(-50%);
    // right: 235px;
    z-index: -99;
    }

  img {
    float: left;
    width: 200px;
    height: 200px;
  }
}
</style>