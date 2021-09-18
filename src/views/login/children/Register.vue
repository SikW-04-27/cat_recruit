<template>
    <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__bounceInLeft"
        leave-active-class="animate__bounceOutLeft">
    <div class="login_block" v-show='hide_2'>
      <div :class="login_left">
        <img class="left_logo" src="../../../assets/img/catlogo.png" alt="">
        <h2 class="left_h2">Hello! Welcome to the C.A.T studio</h2>
        <div class="left_button" @click="loginButton">Register</div>
        <img class="left_img_1" src="../../../assets/img/login_1.jpg" alt="">
      </div>
      <div :class="login_right">
          <div id="student-register">
            <p class="register-word" data-text="REGISTER">REGISTER</p>
            <input type="text" v-model="studentName" placeholder="用户名（2-20,只包含汉字字母数字和下划线）" />
            <input type="text" v-model="studentMailNum" placeholder="邮箱" />
            <input :type="password" v-model="studentPasswordNum" placeholder="密码（8-18，只包含字母和数字）" />
            <div class="el-icon-view view" @click="viewpassword" v-if="hidepassword"></div>
            <div class="el-icon-key noview" @click="noviewpassword" v-else></div>
            <div
              class="click-checkNumber"
              @click="flag && isCorrectAndSendCheckNumber()"
            >
              {{ checkNumberTip }}
            </div>
            <input type="text" v-model="studentCheckNumber" placeholder="验证码" />

            <div id="check-register" @click="studentRegister">注册</div>
          </div>
          <div class="triangle"></div>
          <div class="triangle_text" @click="loginIn"> &nbsp;&nbsp;登录</div>
      </div>
      
    </div>
  </transition>
</template>


<script setup>
import { ref, onUpdated, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'

import { sendCkeckNumber } from "../../../request/api";
import { userRegister } from "../../../request/api";
import checkAccountFormate from "../../../utils/checkAccountFormat";


let login_left = ref('login_left')
let login_right = ref('login_right')
let studentName = ref("");
let studentMailNum = ref("");
let studentPasswordNum = ref("");
let studentCheckNumber = ref("");
let checkNumberTip = ref("点击发送验证码");
// 点击发送验证码后不能重复点击
let flag = ref(true);
// 点击注册之前判断是否所有的都输入正确
let isAllDone = ref(false);
let password = ref('password')
let hidepassword = ref(true)
let isTimeNumOut = ref(false);
let hide_2 = ref(false)
const router = useRouter();


function isCorrectAndSendCheckNumber() {
  let checkInfo = checkAccountFormate(
    studentName.value,
    studentMailNum.value,
    studentPasswordNum.value
  );
  if (!checkInfo[0]) {
    ElMessage.warning(checkInfo[1])
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
        if(result.code === 1407) {
          isAllDone.value = true;
        } else {
          ElMessage.warning(result.message)
        }
        
      })
      .catch((err) => {
        ElMessage.warning(err.message)
      });
  }
}

function studentRegister() {
  let registerTimer = null;

  if (!isAllDone.value || !studentCheckNumber.value.trim()) {
        ElMessage.warning('请先完善所有信息')
  } else {
    let loadingInstance = ElLoading.service({ fullscreen: false,target: '.login_block',background:'rgb(255 255 255 / 41%)',spinner: 'el-icon-loading', })
    registerTimer = setTimeout(() => {
      loadingInstance.close();
      ElMessage.warning('登录超时')
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
          clearTimeout(registerTimer);
          loadingInstance.close();
          if (result.code === 3000) {
            router.push({
              path: "/login",
            });
          } else {
            ElMessage.warning(result.message)
          }
        }
      })
      .catch((error) => {
        ElMessage.warning(error.message)
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
      router.push({
        path: '/loginregister/login'
      })
    }, 1500);
}

const loginButton = function(){
  login_left.value = 'login_left login_left_after';
  login_right.value = 'login_right login_right_after'
}

const viewpassword = function(){
  password.value = 'text'
  hidepassword.value = false
}

const noviewpassword = function(){
  password.value = 'password'
  hidepassword.value = true
}

onMounted(()=>{
  hide_2.value = true
})
</script>

<style lang="scss">
#student-register {
  position: relative;
  width: 400px;
  height: 330px;
  text-align: center;
  color: #fff;

  .view, .noview{
    position: absolute;
    right: 65px;
    top: 50%;
    margin-top: 68px;
    color: black;
    cursor: pointer;
  }

  .register-word {
  position: relative;
  top: 0;
  left: 0;
  // margin-bottom: 5px;
  // color: #fff;
  font-size: 25px;
  letter-spacing: 4px;
  // color: skyblue;
  text-shadow: rgb(255 255 255 / 36%) 0px 0px 9px;
  color: #826d6d;
  font-weight: 600;  
}

  .click-checkNumber {
    // 加上定位后元素才不会被遮挡
    position: relative;
    margin: 10px 0 -15px 240px;
    font-size: 12px;
    &:hover {
      cursor: pointer;
    }
  }

  .student-register-tips {
    font-size: 12px;
    height: 30px;
    color: #fff;
    line-height: 30px;
  }

}
</style>