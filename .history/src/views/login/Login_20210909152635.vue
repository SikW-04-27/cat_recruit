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
      <input type="text" v-model="studentMail" placeholder="邮箱" />
      <input type="text" v-model="studentPassword" placeholder="密码" />
      <div class="skip-register">
        <router-link to="/register">账号注册</router-link>
      </div>
      <div class="student-login-tips">{{ tips }}</div>
      <button @click="studentLogin">登录</button>
    </div>
    <!-- </el-table> -->
  </AccountOperate>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userLogin } from "../../request/api";
import { useStore } from "vuex";

import {setCookie, getCookie} from '../../utils/myCookie'


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
          console.log('未超时');
          loading.value = false;
          clearTimeout(timer);
          console.log(result);

          if (result.code === 2000) {
            store.state.loginStatus = true;
            
            setCookie("studentToken", result.data.token, 7)
            // localStorage.setItem("token", result.data.token);
            sessionStorage.setItem("userName", result.data.user.userName);
            sessionStorage.setItem("userId", result.data.user.id);
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
</script>

<style lang="scss">
#student-login {
  //   margin: 65px auto;
  width: 100%;
  height: 220px;
  color: #fff;
  text-align: center;
  /* background-color: blue; */

  input {
    margin-top: 28px;
    width: 280px;
    height: 30px;
    color: red;
    padding-left: 8px;
    border: 1px solid red;
  }

  .student-login-tips {
    height: 40px;
    line-height: 40px;
    transition: all 0.5s;
  }

  button {
    margin-top: 5px;
    width: 120px;
    height: 36px;
  }

  .skip-register {
    position: absolute;
    top: 50%;
    right: 35%;
    color: #fff;
    font-size: 14px;
  }
}
</style>