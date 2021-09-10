<template>
<div id="works-content">
  <IntroductionTitle>主要成就</IntroductionTitle>
  <el-carousel :interval="4000" type="card" height="200px" @change="fn" active-color="green">
    <el-carousel-item>
      <p>国家海洋局南海分局北斗航标系统</p>
      <div>
        该航标系统主要用于将北斗卫星传来的航标数据标注在地图上，并显示航标所在海域的水文情况
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <p>广州市供电局运营分析平台</p>
      <div>
        该平台主要用于管理广州市各地用电、电路维护、人员分配等的多项数据。对数据进行清洗和分析，实现数据可视化管理，解决了人工处理大量数据时的无法预测的错误、降低了人力资本，提高了数据处理速率和准确性
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <p>“友捎”带货app</p>
      <div>
        以网络技术结合村民需要，为村民打造一站式捎货服务平台，提供省心、安全、便捷的捎货体验，致力于乡村扶贫服务，在构建美丽乡村的同时，提供了就业机会。
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <p>广东玉兰集团有限公司的B2B订单系统</p>
      <div>
        该系统是一个B2B订单购物一体化平台，协助玉兰集团搭建线上销售平台，解决传统销售过程痛点，项目已成功上线。
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <p>小鱿鱼智能塑料瓶回收箱</p>
      <div>
        该项目已与广州羊城公司达成合作，使用了人脸识别、图片识别、红外感应等技术，致力于构建美丽智慧城市
      </div>
    </el-carousel-item>
  </el-carousel>
  
</div>
</template>

<script>
import IntroductionTitle from '../../../components/IntroductionTitle.vue'
export default {
  name: "Works",
  components: {
    IntroductionTitle
  },
  setup() {
    function fn(a,b) {
      // console.log(a, b);
    }

    return {
      fn
    }
  }
};
</script>

<style lang="scss">

#works-content {

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
   line-height: 25px;
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