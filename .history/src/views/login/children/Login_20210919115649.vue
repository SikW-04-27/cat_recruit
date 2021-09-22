<template>
  <transition
    name="animate__animated animate__bounce"
    enter-active-class="animate__bounceInLeft"
    leave-active-class="animate__bounceOutLeft"
  >
    <div class="login_block" v-show="hide_1">
      <div :class="login_left">
        <img class="left_logo" src="../../../assets/img/catlogo.png" alt="" />
        <h2 class="left_h2">Hello! Welcome to the C.A.T studio</h2>
        <div class="left_button" @click="loginButton">Login</div>
        <img class="left_img_1" src="../../../assets/img/login_1.jpg" alt="" />
      </div>
      <div :class="login_right">
        <div id="student-login" v-if="hide_login">
          <p class="login-words" data-text="LOGIN">LOGIN</p>
          <input type="text" v-model="studentMail" placeholder="邮箱" />
          <input
            :type="password"
            v-model="studentPassword"
            placeholder="密码"
          />
          <div
            class="el-icon-view view"
            @click="viewpassword"
            v-if="hidepassword"
          ></div>
          <div class="el-icon-key noview" @click="noviewpassword" v-else></div>

          <div id="check-login" @click="studentLogin">登录</div>
          <span @click="forget">忘记密码</span>
        </div>

        <div id="student-login" v-if="hide_forget">
          <p class="login-words" data-text="LOGIN">Forget</p>
          <input type="text" placeholder="邮箱" v-model="loginMail" />
          <input type="text" placeholder="新密码" v-model="newPassword" />
          <input type="text" placeholder="验证码" v-model="newCheckNum" />
          <div @click="isCorrectAndSendCheckNumber">{{ checkNumberTip }}</div>
          <div id="check-login" @click="newLogin">重置密码</div>
          <span @click="backlogin">登录</span>
        </div>

        <div class="triangle"></div>
        <div class="triangle_text" @click="registerIn">账号注册</div>
      </div>
    </div>
  </transition>
</template>


<script setup>
import { ref, onUnmounted, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userLogin } from "../../../request/api";
import { useStore } from "vuex";
import { ElLoading, ElMessage } from "element-plus";
import { setCookie, getCookie } from "../../../utils/myCookie";

import checkAccountFormate from "../../../utils/checkAccountFormat";
import { resetSendEmail, resetPassword } from "../../../request/api";

let studentMail = ref("");
let studentPassword = ref("");
// isTimeOut 判断登录是否超时, 接口坏了时使用
let isTimeOut = ref(false);
let login_left = ref("login_left");
let login_right = ref("login_right");
let hide_1 = ref(false);
let hide_login = ref(true);
let hide_forget = ref(false);

let newPassword = ref("");
let loginMail = ref("");
let newCheckNum = ref("");
let flag = ref(false);
let checkNumberTip = ref("发送验证码");
let isAllDone = ref(false);

let password = ref("password");
let hidepassword = ref(true);

const router = useRouter();

const store = useStore();
store.state.loginStatus = false;
let timer = ref(null);
function studentLogin() {
  if (!studentMail.value.trim() || !studentPassword.value.trim()) {
    ElMessage.warning("邮箱或密码不能为空");
  } else {
    let loadingInstance = ElLoading.service({
      fullscreen: false,
      target: ".login_block",
      background: "rgb(255 255 255 / 41%)",
      spinner: "el-icon-loading",
    });
    timer = setTimeout(() => {
      loadingInstance.close();
      ElMessage.warning("登录超时");
      isTimeOut.value = true;
    }, 10000);
    userLogin({
      keyWord: studentMail.value,
      password: studentPassword.value,
    })
      .then((result) => {
        if (!isTimeOut.value) {
          loadingInstance.close();
          clearTimeout(timer);

          if (result.code === 2000) {
            alert(1111111111111111);
            store.state.loginStatus = true;
            setCookie("studentToken", result.data.token, 7);
            sessionStorage.setItem("userName", result.data.user.userName);
            sessionStorage.setItem("userId", result.data.user.id);
            console.log(999999999999999999999);
            router.push({
              path: "/introduction",
            });
          } else {
            ElMessage.warning(result.message);
          }
        }
      })
      .catch((e) => {
        ElMessage.warning(e.data.message);
      });
  }
}

const loginButton = function () {
  login_left.value = "login_left login_left_after";
  login_right.value = "login_right login_right_after";
};

const registerIn = function () {
  login_left.value = "login_left";
  login_right.value = "login_right";

  setTimeout(() => {
    hide_1.value = false;
  }, 1000);
  setTimeout(() => {
    router.push({
      path: "/loginregister/register",
    });
  }, 1500);
};

function isCorrectAndSendCheckNumber() {
  let checkInfo = checkAccountFormate(
    "catcat",
    loginMail.value,
    newPassword.value
  );
  if (!checkInfo[0]) {
    ElMessage.warning(checkInfo[1]);
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
    resetSendEmail({
      email: loginMail.value,
    })
      .then((result) => {
        if (result.code === 1407) {
          isAllDone.value = true;
        } else {
          ElMessage.warning(result.message);
        }
      })
      .catch((err) => {
        ElMessage.error(err.message);
      });
  }
}

// ---------打印的错误----------------------------
function newLogin() {
  if (!isAllDone.value || !newCheckNum.value.trim()) {
    ElMessage.warning("请先完善所有信息");
  } else {
    resetPassword({
      email: loginMail.value,
      password: newPassword.value,
      verificationCode: newCheckNum.value,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const forget = function () {
  hide_login.value = false;
  hide_forget.value = true;
};
const backlogin = function () {
  hide_login.value = true;
  hide_forget.value = false;
};

const viewpassword = function () {
  password.value = "text";
  hidepassword.value = false;
};

const noviewpassword = function () {
  password.value = "password";
  hidepassword.value = true;
};

onMounted(() => {
  hide_1.value = true;
});
</script>

<style lang="scss" >
.view,
.noview {
  position: absolute;
  right: 65px;
  margin-top: 35px;
  color: black;
  cursor: pointer;
}
</style>