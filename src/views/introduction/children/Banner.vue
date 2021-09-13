<template>
  <div class="banner">
    <!-- <div class="myFront" data-text="c.a.t工作室欢迎你！"> c.a.t工作室欢迎你！</div> -->
      <video class="bgVideo" src="../../../assets/img/pexels-anna-hinckel-6128683.mp4" autoplay loop width="110%" height="100%" playbackRate=2></video>
      <div class="block"></div>
    <div class="main">
      <input type="radio" name="choice" id="c1" checked />
      <input type="radio" name="choice" id="c2" />
      <input type="radio" name="choice" id="c3" />
      <input type="radio" name="choice" id="c4" />
      <input type="radio" name="choice" id="c5" />
      <!-- <label for="c1" id="l1" style="--l: 1"></label>
      <label for="c2" id="l2" style="--l: 2"></label>
      <label for="c3" id="l3" style="--l: 3"></label>
      <label for="c4" id="l4" style="--l: 4"></label>
      <label for="c5" id="l5" style="--l: 5"></label> -->
      <!-- <h1 data-text="C" class="round">C</h1>
      <h1 data-text="reate">reate</h1>
      <h1 data-text="A" class="left_round" style="padding-top:100px">A</h1> 
      <h1 data-text="mbitious">mbitious</h1> 
      <h1 data-text="T" class="round" style="padding-top:200px">T</h1>
      <h1 data-text="eam！" >eam！</h1> -->
      <transition-group
        name="animate__animated animate__bounce"
        enter-active-class="animate__lightSpeedInLeft"
      >
        <h1 data-text="Create" key="1" v-show="create_h1">Create</h1>
        <h1 data-text="Ambitious" key="2" v-show="create_h2">Ambitious</h1>
        <h1 data-text="Team！" key="3" v-show="create_h3">Team！</h1>
      </transition-group>
      

    </div>

    <!-- <img src="../../assets/img/banner2.jpg" alt=""> -->
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  setup(props) {
    let create_h1 = ref(false)
    let create_h2 = ref(false)
    let create_h3 = ref(false)
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
    }
  },
};
</script>

<style lang="scss">
.banner {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  // text-align: center;
  // background-color: rgba(0, 0, 0, 0.925);
  background-image: url("../../../assets/img/banner (4).jpg");
  background-size: cover;
  span {
    position: absolute;
    color: #fff;
    top: 40%;
    left: 33%;
    letter-spacing: 12px;
    font-size: 35px;
    font-weight: 700;
  }
}

.myFront {
  position: absolute;
  top: 40%;
  left: 40%;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 3px;
  text-shadow: 0 0 20px #bd242b;
}

/////////////

.main {
  width: 70%;
  height: 300px;
  position: absolute;
  left: 65%;
  top: 45%;
  transform: translate(-50%, -50%);
  // text-align: center;
}
.main input {
  display: none;
}
.main .round{
  position: absolute;
  font-size: 80px;
  left: -60px;
  animation: round 1s ease-in alternate infinite;
}
.main .left_round{
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
.main h1 {
  width: 800px;
  // height:100%;
  font-size: 80px;
  // text-align: center;
  color: white;
  padding-left:0px ;
  line-height: 100px;
  transition: all 1s;
  font-family: fantasy;
  letter-spacing: 20px;
}
.main h1::after {
  width: 800px;
  height: 100px;
  position: absolute;
  left: 0px;
  // top: 0;
  content: attr(data-text);
  filter: blur(5px);
  z-index: -1;
}

.main label {
  position: absolute;
  width: 30px;
  height: 10px;
  border: 2px solid white;
  bottom: 20px;
  left: calc(120px * var(--l));
}

.main label:hover {
  cursor: pointer;
}

#l1 {
  border-color: #fc5c65;
}
.main #c1:checked ~ #l1 {
  background: #fc5c65;
  box-shadow: 0 0 5px #fc5c65;
}
.main #c1:checked ~ h1 {
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
.main #c3:checked ~ #l3 {
  background: #26de81;
  box-shadow: 0 0 5px #26de81;
}
.main #c3:checked ~ h1 {
  text-shadow: 0 0 20px #26de8260;
}
#l4 {
  border-color: #45aaf2;
}
.main #c4:checked ~ #l4 {
  background: #45aaf2;
  box-shadow: 0 0 5px #45aaf2;
}
.main #c4:checked ~ h1 {
  text-shadow: 0 0 20px #45aaf260;
}
#l5 {
  border-color: #a55eea;
}
.main #c5:checked ~ #l5 {
  background: #a55eea;
  box-shadow: 0 0 5px #a55eea;
}
.main #c5:checked ~ h1 {
  text-shadow: 0 0 20px #a55eea60;
}
</style>