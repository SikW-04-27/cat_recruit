<template>
  <div id="works-content">
    <div class="w-main"></div>
    </div>
</template>

<script>
import IntroductionTitle from "../../../components/IntroductionTitle.vue";
export default {
  name: "Works",
  components: {
    IntroductionTitle,
  },
  setup() {
    function fn(a, b) {
      // console.log(a, b);
    }

    return {
      fn,
    };
  },
};
</script>

<style lang="scss" scoped>
#works-content {
  background-color: rgba(41, 41, 41, 0.959);
  height: 100vh;
  padding: 50px 0;

  .el-carousel {
    margin: 28px auto 20px;

    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item {
      line-height: 35px;
      text-align: center;
      padding: 15px 20px;
      color: #fff;
      letter-spacing: 2px;
      border-radius: 10px;
      // background-color: linear-gradient(left, #FD6585, #0D25B9);
      background: -webkit-linear-gradient(left, #8cd0e5, #8edae5, #90e2e5);
      p {
        margin-bottom: 10px;
        font-size: 20px;
        color: blue;
        letter-spacing: normal;
      }
    }

    // .el-carousel__item:nth-child(2n) {
    //   background-color: rgba(0, 0, 0);
    // }

    // .el-carousel__item:nth-child(2n + 1) {
    //   background-color: yellow;
    // }
  }
}
</style>