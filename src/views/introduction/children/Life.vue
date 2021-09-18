<template>
<transition
    name="animate__animated animate__bounce"
    enter-active-class="animate__fadeInDown"
    leave-active-class="animate__fadeOutUp"
>
    <div class="computer_background" v-show="hide" >
        <div class="button" @click="change"></div>
        <div class="hand">👈</div>
        <div class="computer_img" >
            <img src="../../../assets/img/illustration_13.png" alt="">
        </div>
        <img class="illustration illustration_14 illustration_img" src="../../../assets/img/illustration_14.png" alt="">
        <img class="illustration illustration_15 illustration_img" src="../../../assets/img/illustration_15.png" alt="">
        <img class="illustration illustration_16 illustration_img" src="../../../assets/img/illustration_16.png" alt="">
        
        <div :class="cube">
            <div :class="box1">
                <img src="../../../assets/img/happy1.jpg">
            </div>
            <div :class="box2">
                <img src="../../../assets/img/happy2.jpg">
            </div>
            <div :class="box3">
                <img src="../../../assets/img/happy3.jpg">
            </div>
            <div :class="box4">
                <img src="../../../assets/img/happy4.jpg">
            </div>
            <div :class="box5">
                <img src="../../../assets/img/happy5.jpg">
            </div>
            <div :class="box6">
                <img src="../../../assets/img/happy6.jpg">
            </div>
        </div>
    </div>
</transition>


</template>


<script>
import { onMounted, ref } from 'vue'

import IntroductionTitle from '../../../components/IntroductionTitle.vue'
export default {
    name: 'Life',
    components: {
        IntroductionTitle
    },
    setup(props) {
      let cube = ref('cube');
      let box1 = ref('box1');
      let box2 = ref('box2');
      let box3 = ref('box3');
      let box4 = ref('box4');
      let box5 = ref('box5');
      let box6 = ref('box6');
      let hide = ref(false)

      const change = () => {
        cube.value = 'cube cube_change'
        box1.value = 'box1_change'
        box2.value = 'box2_change'
        box3.value = 'box3_change'
        box4.value = 'box4_change'
        box5.value = 'box5_change'
        box6.value = 'box6_change'
        console.log(112);
      }

      onMounted(()=>{
        hide.value = true;
          
      })

      
      return {
        cube,
        box1,
        box2,
        box3,
        box4,
        box5,
        box6,
        hide,
        change
      }
    },

}
</script>

<style lang="scss" scoped>
.computer_background{
    width: 1200px;
    height: 600px;
    position: relative;
    margin: 60px auto;
    text-align: center;
    .button{
        position: absolute;
        width: 35px;
        height: 30px;
        background: rgb(197, 197, 197);
        border-radius: 50%;
        // border: 6px solid rgb(80, 80, 80);
        left: 50%;
        top: 50%;
        box-shadow: inset 0 0 7px #000;
        margin-left: -22px;
        margin-top: 95px;
        cursor: pointer;
        z-index: 1;
        &:hover{
            box-shadow: inset 0 0 10px #000;
            background-color: rgb(202, 202, 202);
        }
        &:active{
            box-shadow: inset 0 0 12px #000;
            background-color: rgb(189, 189, 189);
        }
    }
    .hand{
        position: absolute;
        font-size: 30px;
        left: 50%;
        top: 50%;
        margin-left: 40px;
        margin-top: 80px;
        animation: point 0.5s alternate infinite; 
        z-index: 1;
        @keyframes point {
            from{
                margin-left:40px;
            }
            to{
                margin-left: 50px;
            }
        }
    }
    .computer_img{
        width: 760px;
        height: 630px;
        margin: 0px auto;
        overflow: hidden;
        // background: url('../../../assets/img/illustration_13.png') no-repeat;
        // background-size: cover;
        img{
            margin: 0 auto;
            width: 700px;
            height: 594px;
        }
    }
    .illustration{
        position: absolute;
        width: 100px;
    }
    .illustration_14{
        right: 0;
    }
    .illustration_15{
        margin-top: 100px;
        left: 0;
    }
    .illustration_16{
        margin-top: 400px;
        right: 0;
    }
}
.cube{
    position: absolute;
    top: 30px;
    left: 500px;
    width: 200px;
    height: 200px;
    /* background-color: #bfa;  */
    margin: 100px auto;
    transform-style: preserve-3d;
    // transform: rotateX(20deg) rotateZ(20deg); 
    transition: 1s;
    /* transform:rotateY(45deg) scaleZ(2)  ; */
    animation: run 100s infinite linear;
    cursor: pointer;
    &:hover{
        
    animation-play-state:paused;
    }


    
    
  div{
      width: 200px;
      height: 200px;
      position: absolute;
      opacity: 1;
      transition: 1s 1s;
  }
  img{
      width: 200px;
      height: 200px;
        transition: 1s;
  }
  .box1{
      transform: rotateY(90deg) translateZ(100px);
      top: 0;
      left: 0;
  }
  .box2{
      transform: rotateY(-90deg) translateZ(100px);
      top: 0;
      left: 0;
  }
  .box3{
      transform: rotateX(90deg) translateZ(100px);
      top: 0;
      left: 0;
  }
  .box4{
      transform: rotateX(-90deg) translateZ(100px);
      top: 0;
      left: 0;
  }
  .box5{
      transform: rotateZ(180deg) translateZ(-100px);
      top: 0;
      left: 0;
  }
  .box6{
      transform: rotateZ(0deg) translateZ(100px);
      top: 0;
      left: 0;
  }
  @keyframes run {
      from{
          transform: rotateY(0) rotateZ(0);
      }
      to{
          transform: rotateX(1turn) rotateZ(1turn);
      }
  }
}

.cube_change{
  // transform: rotateX(0) rotateZ(0);
    animation: run_2 30s infinite linear;
    @keyframes run_2 {
      from{
        transform:rotateY(0)
      }
      to{
        transform: rotateY(1turn);
      }
    }

    &:hover{
        transform: rotateY(45deg);
        animation-play-state:paused;
    }
}

.box1_change{
    animation-play-state:paused;
    transition: 1s;
    transform: rotateY(0) translateZ(250px) scale(1);
    top: 0px;
    left: 0px;
    &:hover{
        img{
            border-radius: 20px;
            transform: scale(1.5);
        }
    }
}

.box2_change{
    animation-play-state:paused;
    transition: 1s;
    transform: rotateY(60deg) translateZ(250px);
    top: 0px;
    left:0px;
    &:hover{
        img{
            transform: scale(1.5);
        }
    }
}

.box3_change{
    animation-play-state:paused;
    transition: 1s;
    transform: rotateY(0) translateZ(-250px);
    top: 0px;
    left: 0px;
    &:hover{
        img{
            transform: scale(1.5);
        }
    }
}

.box4_change{
    animation-play-state:paused;
    transition: 1s;
    transform: rotateY(60deg) translateZ(-250px);
    top: 0px;
    left: 0px;
    &:hover{
        img{
            transform: scale(1.5);
        }
    }
}

.box5_change{
    animation-play-state:paused;
    transition: 1s;
    transform: rotateY(-60deg) translateZ(250px);
    top: 0px;
    left:0px;
    &:hover{
        img{
            transform: scale(1.5);
        }
    }
}

.box6_change{
    animation-play-state:paused;
    transition: 1s;
    transform: rotateY(-60deg) translateZ(-250px);
    top: 0px;
    left: 0px;
    &:hover{
        img{
            transform: scale(1.5);
        }
    }
}

</style>