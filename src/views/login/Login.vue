<template>
<div class="big_block">
  <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__bounceInLeft"
        leave-active-class="animate__bounceOutLeft">
    <div class="login_block" v-show='hide_1'>
      <div :class="login_left">
        <img class="left_logo" src="../../assets/img/catlogo.png" alt="">
        <h2 class="left_h2">Hello! Welcome to the C.A.T studio</h2>
        <div class="left_button" @click="loginButton">Login</div>
        <img class="left_img_1" src="../../assets/img/login_1.png" alt="">
      </div>
      <div :class="login_right">
          <div
            id="student-login"
            class=""
            v-loading="loading"
            element-loading-text="登录中..."
            element-loading-background="rgba(0, 0, 0, .5)"
          >
            <p class="login-words myFront" data-text="LOGIN">LOGIN</p>
            <input type="text" v-model="studentMail" placeholder="邮箱" />
            <input type="password" v-model="studentPassword" placeholder="密码" />

            <div class="student-login-tips">{{ tips }}</div>
            <div id="check-login" @click="studentLogin">登录</div>
            <div class="skip-register">
              <router-link to="/register">账号注册</router-link>
            </div>
          </div>
          <div class="triangle"></div>
          <div class="triangle_text" @click="registerIn">账号注册</div>
      </div>
      
    </div>
  </transition>
  <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__bounceInLeft"
        leave-active-class="animate__bounceOutLeft">
    <div class="login_block" v-show='hide_2'>
      <div :class="login_left">
        <img class="left_logo" src="../../assets/img/catlogo.png" alt="">
        <h2 class="left_h2">Hello! Welcome to the C.A.T studio</h2>
        <div class="left_button" @click="loginButton">Register</div>
        <img class="left_img_1" src="../../assets/img/login_3.png" style="width:350px; margin-bottom:-40px" alt="">
      </div>
      <div :class="login_right">
          <div id="student-register" v-loading="isloading">
            <p class="register-word myFront" data-text="REGISTER">REGISTER</p>
            <input type="text" v-model="studentName" placeholder="用户名（2-20， 只包含汉字字母数字和下划线）" />
            <input type="text" v-model="studentMailNum" placeholder="邮箱" />
            <input type="password" v-model="studentPasswordNum" placeholder="密码（8-18，只包含字母和数字）" />
            <div
              class="click-checkNumber"
              @click="flag && isCorrectAndSendCheckNumber()"
            >
              {{ checkNumberTip }}
            </div>
            <input type="text" v-model="studentCheckNumber" placeholder="验证码" />

            <div class="student-register-tips">{{ tipsMsg }}</div>
            <div id="check-register" @click="studentRegister">注册</div>
          </div>
          <div class="triangle"></div>
          <div class="triangle_text" @click="loginIn"> &nbsp;&nbsp;登录</div>
      </div>
      
    </div>
  </transition>
</div>
  
  
  
</template>


<script setup>
import { ref, onUnmounted, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userLogin } from "../../request/api";
import { useStore } from "vuex";

import { setCookie, getCookie } from "../../utils/myCookie";

import AccountOperate from "../../components/AccountOperate.vue";

let studentMail = ref("");
let studentPassword = ref("");
let tips = ref("");
let loading = ref("");
// isTimeOut 判断登录是否超时, 接口坏了时使用
let isTimeOut = ref(false);
let login_left = ref('login_left')
let login_right = ref('login_right')
let hide_1 = ref(false)
let hide_2 = ref(false)

const router = useRouter();

const store = useStore();
store.state.loginStatus = false;
let timer = ref(null);
function studentLogin() {
  // console.log(studentMail.value);
  // console.log(studentMail.value.trim());
  if (!studentMail.value.trim() || !studentPassword.value.trim()) {
    tips.value = "邮箱或密码不能为空";
  } else {
    tips.value = "";
    loading.value = true;
    timer = setTimeout(() => {
      loading.value = false;
      tips.value = "登录超时";
      isTimeOut.value = true;
    }, 10000);
    userLogin({
      keyWord: studentMail.value,
      password: studentPassword.value,
    })
      .then((result) => {
        if (!isTimeOut.value) {
          console.log("未超时");
          loading.value = false;
          clearTimeout(timer);
          console.log(result);

          if (result.code === 2000) {
            store.state.loginStatus = true;

            setCookie("studentToken", result.data.token, 7);
            // localStorage.setItem("token", result.data.token);
            sessionStorage.setItem("userName", result.data.user.userName);
            sessionStorage.setItem("userId", result.data.user.id);
            // location.reload();

            router.push({
              path: "/introduction",
            });
          } else {
            tips.value = result.message;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

const loginButton = function(){
  login_left.value = 'login_left login_left_after';
  login_right.value = 'login_right login_right_after'
}

const registerIn = function(){
  login_left.value = 'login_left';
  login_right.value = 'login_right';
  setTimeout(() => {
    hide_1.value = false
  }, 1000);
  setTimeout(() => {
    hide_2.value = true
  }, 1500);
}

onMounted(()=>{
  hide_1.value = true
})

onUnmounted(() => {
  console.log("页面刷新了");
  
  location.reload();
});

// -------------------------------------------------------------------------------------------------------

let studentName = ref("");
let studentMailNum = ref("");
let studentPasswordNum = ref("");
let studentCheckNumber = ref("");
let checkNumberTip = ref("点击发送验证码");
let tipsMsg = ref("");
// 点击发送验证码后不能重复点击
let flag = ref(true);
// 点击注册之前判断是否所有的都输入正确
let isAllDone = ref(false);

let isTimeNumOut = ref(false);

let isloading = ref(false);


function isCorrectAndSendCheckNumber() {
   tipsMsg.value = '';

  let checkInfo = checkAccountFormate(
    studentName.value,
    studentMailNum.value,
    studentPasswordNum.value
  );
  console.log(1111111111111111111111);
  if (!checkInfo[0]) {
    console.log(checkInfo);
    tipsMsg.value = checkInfo[1];
  } else {
    flag.value = false;
    checkNumberTip.value = "发送成功";
    let seconds = 10;
    let timer = null;
    timer = setInterval(() => {
      checkNumberTip.value = `${seconds}秒后重新发送`;
      seconds--;
      if (seconds === -1) {
        checkNumberTip.value = "重新发送";
        clearInterval(timer);
        flag.value = true;
      }
    }, 1000);
    sendCkeckNumber({
      identity: 1,
      email: studentMailNum.value,
    })
      .then((result) => {
        console.log("成功");
        console.log(result);
        if(result.code === 1407) {
        
          isAllDone.value = true;
        } else {
 tipsMsg.value = result.message
        }
        
      })
      .catch((err) => {
        console.log("失败");
        console.log(err);
         tipsMsg.value = error.message
      });
  }
}

function studentRegister() {
  let registerTimer = null;

  if (!isAllDone.value || !studentCheckNumber.value.trim()) {
    tipsMsg.value = "请先完善所有信息";
  } else {
    tipsMsg.value = "";
    isloading.value = true;
    registerTimer = setTimeout(() => {
      isloading.value = false;
      tipsMsg.value = "登录超时";
      isTimeNumOut.value = true;
    }, 10000);
    userRegister({
      userName: studentName.value,
      email: studentMailNum.value,
      password: studentPasswordNum.value,
      identity: 1,
      verificationCode: studentCheckNumber.value,
    })
      .then((result) => {
        if (!isTimeNumOut.value) {
          console.log(result);
          clearTimeout(registerTimer);
          isloading.value = false;
          if (result.code === 3000) {
            router.push({
              path: "/login",
            });
          } else {
            tipsMsg.value = result.message;
          }
        }
      })
      .catch((error) => {
        console.log(error);
         tipsMsg.value = error.message;
      });
  }
}

const loginIn = function(){
    login_left.value = 'login_left';
    login_right.value = 'login_right';
    setTimeout(() => {
      hide_2.value = false
    }, 1000);
    setTimeout(() => {
      hide_1.value = true
    }, 1500);
}
</script>

<style lang="scss" >
.big_block{
  display: flex;
}
.login_block{
  width: 800px;
  height: 500px;
  margin:100px auto;
  display: flex;
  position: relative;
  transition: 1s;
  
  .login_left{
    background-image: url('../../assets/img/login_2.jpg');
    width: 440px;
    height: 100%;
    left: 150px;
    background-color: #fff;
    position: relative;
    text-align: center;
    transition: 1s ease-in;
    z-index: 1;
    box-shadow: -3px 3px 4px rgb(83, 83, 83);
    .left_logo{
      width: 80px;
      margin: 10px auto;
    }
    .left_h2{
      font-size: 26px;
      font-weight: 600;
      text-align: center;
      margin-top: 0px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      z-index: 10;
    }
    .left_button{
      position: relative;
      // top: 15px;
      transition: 1s;
      width: 130px;
      height: 35px;
      font-size: 26px;
      margin: 0 auto;
      font-weight: 600;
      font-family:  Verdana;
      background-color: rgba(214, 208, 208, 0.6);
      box-shadow: 3px 3px 10px #000;
      cursor: pointer;
      animation: button 1s alternate infinite;
    }
    @keyframes button {
      from{
        top: 15px;
      }
      to{
        top: 10px;
      }
    }
    .left_img_1{
      position: absolute;
      width: 300px;
      bottom: 10px;
      left: 50px;
    }
  }
  .login_left_after{
    left: 0px;
    box-shadow: -3px 3px 4px rgb(83, 83, 83);
  }
  .login_right{
    position: absolute;
    transition: 1s ease-in;
    left: 220px;
    width: 360px;
    height: 100%;
    background-color: rgb(224, 224, 224);
    box-shadow: -3px 3px 4px rgb(83, 83, 83);
      .triangle{
        width: 0;
        border: 80px solid black;
        border-right: 80px solid transparent;
        border-bottom: 80px solid transparent;
        border-left: 80px solid transparent;
        position: absolute;
        right: -80px;
        bottom: -80px;
        transform: rotate(-45deg);
        cursor: pointer;
      }
      .triangle_text{
        position: absolute;
        bottom: 0;
        right: 0;
        line-height: 60px;
        width: 70px;
        height: 60px;
        color: white;
        cursor: pointer;
      }
  }
  .login_right_after{
    left: 440px;
  }
}
#student-login,#student-register {
  width: 360px;
  height: 350px;
  padding-top: 40px;
  color: #fff;
  text-align: center;
  /* background-color: blue; */
  input{
    width: 250px;
    height: 45px;
    border-radius: 30px;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    margin-top: 20px;
    letter-spacing: 2px;
    padding-left: 8px;
    color: black;
    background-color: rgba(255, 255, 255, .7) !important;
    &::placeholder {
      color: #fff;
      letter-spacing: 0;
    }
  }




  .login-words {
    position: relative;
    top: 0;
    left: 0;
    // margin-bottom: 5px;
    // color: #fff;
    font-size: 25px;
    letter-spacing: 4px;
    // color: skyblue;
    text-shadow: 0 0 20px #6d1014;
  }
  .student-login-tips {
    height: 40px;
    color: red;
    line-height: 40px;
    transition: all 0.5s;
  }

  .skip-register {
    margin: 25px 0 0 250px;
    color: #fff;
    font-size: 14px;
  }

  #check-login,#check-register {
    margin: 0 auto;
    width: 250px;
    height: 45px;
    line-height: 45px;
    border-radius: 30px;
    padding-left: 8px;
    background: -webkit-linear-gradient(left, #12e96c, #71e9ed, #2b299c);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    &:hover {
      cursor: pointer;
    }
  }
}
</style>