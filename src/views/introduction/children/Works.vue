<template>
  <transition
    name="animate__animated animate__bounce"
    enter-active-class="animate__zoomIn"
  >
    <!-- <div id="works-content" > -->
        <div class="w-main" v-show="hides">
          <div class="card illustration_img">
              <div class="card_img">
                <img src="../../../assets/img/illustration_5.jpg" alt="">
              </div>
              <div class="card_text">
                <h2>国家海洋局南海分局北斗航标系统</h2>
                <div>
                  该航标系统主要用于将北斗卫星传来的航标数据标注在地图上，并显示航标所在海域的水文情况
                </div>
              </div>
          </div>
          <div class="card illustration_img">
              <div class="card_img">
                <img src="../../../assets/img/illustration_6.jpg" alt="">
              </div>
              <div class="card_text">
                <h2>广州市供电局运营分析平台</h2>
                <div>
                  该平台主要用于管理广州市各地用电、电路维护、人员分配等的多项数据。对数据进行清洗和分析，实现数据可视化管理，解决了人工处理大量数据时的无法预测的错误、降低了人力资本，提高了数据处理速率和准确性
                </div>
              </div>
          </div>
          <div class="card illustration_img">
              <div class="card_img">
                <img src="../../../assets/img/illustration_7.jpg" alt="">
              </div>
              <div class="card_text">
                <h2>“友捎”带货app</h2>
                <div>
                  以网络技术结合村民需要，为村民打造一站式捎货服务平台，提供省心、安全、便捷的捎货体验，致力于乡村扶贫服务，在构建美丽乡村的同时，提供了就业机会。
                </div>
              </div>
          </div>
          <div class="card illustration_img">
              <div class="card_img">
                <img src="../../../assets/img/illustration_8.jpg" alt="">
              </div>
              <div class="card_text">
                <h2>小鱿鱼智能塑料瓶回收箱</h2>
                <div>
                  该项目已与广州羊城公司达成合作，使用了人脸识别、图片识别、红外感应等技术，致力于构建美丽智慧城市
                </div>
              </div>
          </div>
          <!-- <div class="card">
              <div class="card_img">
                <img src="../../../assets/img/illustration_2.png" alt="">
              </div>
              <div class="card_text">
                <h2>小鱿鱼智能塑料瓶回收箱</h2>
                <div>
                  该项目已与广州羊城公司达成合作，使用了人脸识别、图片识别、红外感应等技术，致力于构建美丽智慧城市
                </div>
              </div>
          </div> -->
              
              <!-- <p>广州市供电局运营分析平台</p>
              <div>
                该平台主要用于管理广州市各地用电、电路维护、人员分配等的多项数据。对数据进行清洗和分析，实现数据可视化管理，解决了人工处理大量数据时的无法预测的错误、降低了人力资本，提高了数据处理速率和准确性
              </div>
              <p>“友捎”带货app</p>
              <div>
                以网络技术结合村民需要，为村民打造一站式捎货服务平台，提供省心、安全、便捷的捎货体验，致力于乡村扶贫服务，在构建美丽乡村的同时，提供了就业机会。
              </div>
              <p>广东玉兰集团有限公司的B2B订单系统</p>
              <div>
                该系统是一个B2B订单购物一体化平台，协助玉兰集团搭建线上销售平台，解决传统销售过程痛点，项目已成功上线。
              </div>
              <p>小鱿鱼智能塑料瓶回收箱</p>
              <div>
                该项目已与广州羊城公司达成合作，使用了人脸识别、图片识别、红外感应等技术，致力于构建美丽智慧城市
              </div> -->
        </div>
      <!-- </div> -->
  </transition>
  
</template>

<script>
import { ref,onMounted } from 'vue';
import IntroductionTitle from "../../../components/IntroductionTitle.vue";
export default {
  name: "Works",
  components: {
    IntroductionTitle,
  },
  setup() {
    let hides = ref(false);
    onMounted(()=>{
      setTimeout(() => {
        
      hides.value = true
      }, 1000);
    })

    return {
      hides
    }
  },
};
</script>

<style lang="scss" scoped>
// #works-content {
//   width: 100%;
//   height: 100vh;
  .w-main{
    width: 1200px;
    height: 600px;
    margin: 100px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .card{
      position: relative;
      width: 550px;
      height: 250px;
      border-radius: 20px;
      background-color: rgb(177, 241, 113);
      display: flex;
      overflow: hidden;
      .card_img{
        width: 250px;
        height: 250px;
        overflow: hidden;
        cursor: pointer;
        img{
          width: 250px;
          transition: 1s;
          &:hover{
            transform: scale(1.1);
          }
        }
      }
      .card_text{
        width: 300px;
        padding: 20px;
        h2{
          font-weight: 600;
          text-align: center;
          font-size: 18px;
          line-height: 30px;
        }
      }
    }
  }
 
// }
</style>