<template>
  <AccountOperate>
    <!-- <el-table v-loading="true"> -->
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
    <!-- </el-table> -->
  </AccountOperate>
</template>


<script setup>
import { ref, onUnmounted } from "vue";
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

onUnmounted(() => {
  console.log("页面刷新了");
  location.reload();
});
</script>

<style lang="scss" >
#student-login {
  margin: 60px auto;
  width: 100%;
  height: 350px;
  color: #fff;
  text-align: center;
  /* background-color: blue; */

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

  // input {
  //   margin-top: 30px;
  //   color: #fff;
  //   letter-spacing: 2px;
  //   font-weight: 700;
  //   padding-left: 8px;
  // }

  .student-login-tips {
    height: 40px;
    color: red;
    line-height: 40px;
    transition: all 0.5s;
  }

  // button {
  //   margin-top: 5px;
  //   width: 120px;
  //   height: 36px;
  // }

  .skip-register {
    // position: absolute;
    // top: 50%;
    // right: 35%;
    margin: 25px 0 0 250px;
    color: #fff;
    font-size: 14px;
  }

  #check-login {
    margin: 0 auto;
    width: 380px;
    height: 45px;
    line-height: 45px;
    border-radius: 30px;
    padding-left: 8px;
    background: -webkit-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    &:hover {
      cursor: pointer;
    }
  }
}
</style>