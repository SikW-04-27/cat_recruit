<template>
  <div class="banner">
      <transition
        name="animate__animated animate__bounce"
        leave-active-class="animate__lightSpeedOutLeft"
      >
        <div class="banner_left" v-show="hide">
            <h1 data-text="Create">Create</h1>
            <h1 data-text="Ambitious">Ambitious</h1>
            <h1 data-text="Team！">Team！</h1>
            <p class="info_text">C.A.T工作室，成立于2017年，指导老师为梁祖红老师，分为前端和后台两个小组，致力于政府及企业级的大型项目开发，团队与玉兰集团、南方电网等公司建立了长期合作关系，近年来研发过广东省专家匹配系统、智能塑料回收瓶箱（与羊城通合作）等，同时组队参与App、小程序大赛并获得奖项，已有毕业师兄就职于一线互联网大厂。</p>
          <!-- <img src="../../../assets/img/illustration_2.png" alt="" class="illustration_img banner_illustration_2"> -->
        </div>
      </transition>
      <transition
        name="animate__animated animate__bounce"
        leave-active-class="animate__lightSpeedOutRight"
      >
        <div class="banner_right" v-show="hide">
          <img src="../../../assets/img/illustration_3.png" alt="" class="banner_right_img ">
        </div>
      </transition>
    
  <router-view></router-view>

    <transition
        name="animate__animated animate__bounce"
        leave-active-class="animate__zoomOut"
    >
      <button class="banner_enter" @click="bannerEnter" v-show="hide">Learn More</button>
    </transition>
    
      

  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import {useRouter} from 'vue-router'
export default {
  setup(props) {
    let create_h1 = ref(false)
    let create_h2 = ref(false)
    let create_h3 = ref(false)
    let hide = ref(true)
    const router = useRouter()

    const bannerEnter = () => {
      hide.value = false
      router.push({
        path:'/introduction/works'
      })
    }
    onMounted(() => {
      create_h1.value = true;
      setTimeout(() => {
        create_h2.value = true;
      }, 1000);
      setTimeout(() => {
        create_h3.value = true;
      }, 2000);
      
    });
    return {
      create_h1,  
      create_h2,  
      create_h3,  
      hide,
      bannerEnter,
    }
  },
};
</script>

<style lang="scss">
.banner {
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 700px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .banner_left {
    width: 600px;
    height: 300px;
    padding-top: 150px;
    .info_text{
      width: 750px;
      padding-left: 100px;
      line-height: 35px;
      padding-top: 20px;
      font-family:Verdana, Geneva, Tahoma, sans-serif;
    }
  }

  .banner_right{
    width: 700px;
    height: 400px;
    padding-top: 40px;
    .banner_right_img{
      width: 700px;
    }
  }
  
  .banner_illustration_1{
    position: absolute;
    width: 200px;
    right: 100px;
    margin-top: 70px;
    animation-delay: 1.5s;
  }
  .banner_illustration_2{
    position: absolute;
    width: 200px;
    left: 100px;
  }

  .banner_enter{
    width: 230px;
    height: 60px;
    background-color: rgba(90, 184, 46, 0.699);
    position: absolute;
    bottom: 30px;
    left: 50%;
    margin-left: -115px;
    border-radius: 30px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 700;
    font-size: 26px;
    color: white;
    box-shadow: 3px 3px 3px rgba(122, 122, 122, 0.63);
    &:hover{
      background-color: rgba(87, 173, 46, 0.699);
    }
    &:active{
      background-color: rgba(73, 145, 39, 0.699);
      box-shadow: 3px 3px 3px rgba(97, 97, 97, 0.774);
    }
  }
}


.banner_left input {
  display: none;
}
.banner_left .round{
  position: absolute;
  font-size: 80px;
  left: -60px;
  animation: round 1s ease-in alternate infinite;
}
.banner_left .left_round{
  position: absolute;
  font-size: 80px;
  top: 0;
  left: -60px;
  animation: left_round 5s ease-in alternate infinite;
}
.bgVideo{
  width: 100%;
  position: absolute;
}
.block{
  background-color: rgba(0, 0, 0, 0.363);
  width: 100%;
  height: 100%;
  position: absolute;
}
// @keyframes round{
//   from{
//     top: 0;
//   }
//   to{
//     top:-15px
//   }
// }
// @keyframes left_round{
//   0%{
//     left: -60px;
//     top: 0;
//   }
//   20%{
//     top: 0;
//     left: -150px;
//     rotate: deg(0);
//   }
//   40%{
//     left: -150px;
//     top: -200px;
//   }
//   50%{
//     top: -200px;
//     left: 450px;
//   }
//   60%{
//     left: 450px;
//     top: 180px;
//   }
//   70%{
//     top: 180px;
//     left: -150px;
//     rotate: deg(180);
//   }
//   80%{
//     left: -150px;
//     top: 0;
//   }
//   100%{
//     left: -60px;
//     top: 0;
//   }
// }
.banner_left h1 {
  width: 800px;
  // height:100%;
  font-size: 80px;
  // text-align: center;
  color: rgb(88, 122, 81);
  padding-left:100px ;
  line-height: 90px;
  transition: all 1s;
  font-family: fantasy;
  letter-spacing: 20px;
}
.banner_left h1::after {
  width: 800px;
  height: 100px;
  position: absolute;
  left: 100px;
  // top: 0;
  content: attr(data-text);
  filter: blur(5px);
  z-index: -1;
}

.banner_left label {
  position: absolute;
  width: 30px;
  height: 10px;
  border: 2px solid white;
  bottom: 20px;
  left: calc(120px * var(--l));
}

.banner_left label:hover {
  cursor: pointer;
}

#l1 {
  border-color: #fc5c65;
}
.banner_left #c1:checked ~ #l1 {
  background: #fc5c65;
  box-shadow: 0 0 5px #fc5c65;
}
.banner_left #c1:checked ~ h1 {
  text-shadow: 0 0 20px #ff878700;
}
#l2 {
  border-color: #fed330;
}
.main #c2:checked ~ #l2 {
  background: #fed330;
  box-shadow: 0 0 5px #fed330;
}
.main #c2:checked ~ h1 {
  text-shadow: 0 0 20px #fed13060;
}
#l3 {
  border-color: #26de81;
}
.banner_left #c3:checked ~ #l3 {
  background: #26de81;
  box-shadow: 0 0 5px #26de81;
}
.banner_left #c3:checked ~ h1 {
  text-shadow: 0 0 20px #26de8260;
}
#l4 {
  border-color: #45aaf2;
}
.banner_left #c4:checked ~ #l4 {
  background: #45aaf2;
  box-shadow: 0 0 5px #45aaf2;
}
.banner_left #c4:checked ~ h1 {
  text-shadow: 0 0 20px #45aaf260;
}
#l5 {
  border-color: #a55eea;
}
.banner_left #c5:checked ~ #l5 {
  background: #a55eea;
  box-shadow: 0 0 5px #a55eea;
}
.banner_left #c5:checked ~ h1 {
  text-shadow: 0 0 20px #a55eea60;
}
</style>