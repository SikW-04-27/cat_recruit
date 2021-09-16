<template>
  <transition
    name="animate__animated animate__bounce"
    enter-active-class="animate__zoomIn"
    leave-active-class="animate__fadeOutDown"
  >
        <div class="w-main" v-show="hides">
          <!-- <h1 class="title">工作室成就</h1> -->
          <div class="card illustration_img" style="animation-delay:0.5s">
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
          <div class="card illustration_img" >
              <div class="card_img">
                <img src="../../../assets/img/illustration_6.jpg" alt="">
              </div>
              <div class="card_text">
                <h2>广州市供电局运营分析平台</h2>
                <div>
                  该平台主要用于对广州市各地用电、电路维护、人员分配等的多项数据进行清洗和分析。降低了人力资本，提高了数据处理速率和准确性
                </div>
              </div>
          </div>
          <div class="card illustration_img" style="animation-delay:1.1s">
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
          <div class="card illustration_img" style="animation-delay:0.7s">
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

          <div class="next" @click="next">
            <div class="line"></div>
            <img class="next_img" src="../../../assets/img/illustration_9.png" alt="">
          </div>
        </div>
  </transition>
  
</template>

<script>
import { ref,onMounted } from 'vue';
import IntroductionTitle from "../../../components/IntroductionTitle.vue";
import {useRouter} from 'vue-router'
export default {
  name: "Works",
  components: {
    IntroductionTitle,
  },
  setup() {
    let hides = ref(false);
    const router = useRouter()

    let next = function(){
      hides.value = false;
      setTimeout(() => {
        router.push({
          path:'/introduction/recruit'
        })
      }, 400);
    }
    onMounted(()=>{
      setTimeout(() => {
        
      hides.value = true
      }, 100);
      
    })

    return {
      hides,
      next
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
    height: 550px;
    margin: 150px auto 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    position: relative;
    .title{
      position: absolute;
      top: -70px;
      width: 200px;
      font-size: 30px;
      font-weight: 500;
      font-family: STHupo;
    }
    .card{
      position: relative;
      width: 450px;
      height: 200px;
      border-radius: 20px;
      background-color: rgba(90, 90, 90, 0.09);
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
        font-size: 14px;
        color: #727272;
        font-weight: 600;
      }
        h2{
          font-weight: 600;
          text-align: center;
          font-size: 16px;
          line-height: 20px;
          margin-bottom: 10px;
          color: #346331d6;
          line-height: 25px;
        }
    }
    .next{
      position: absolute;
      width:120px;
      top: -150px;
      left: 50%;
      cursor: pointer;
      .next_img{
        position: absolute;
        bottom: -100px;
        left: -59px;
        transform: rotateZ(180deg);
        transition: 1s;
        &:hover{
          bottom: -120px;
        }
      }
      .line{
        width: 2px;
        height: 340px;
        background-color: #000;
      }
    }
  }
</style>