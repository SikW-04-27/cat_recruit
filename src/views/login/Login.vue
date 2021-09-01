<template>
<AccountOperate>
  <div id="student-login" class="">
    <input type="text" v-model="studentMail" placeholder="邮箱" />
    <input type="text" v-model="studentPassword" placeholder="密码" />
     <div class="skip-register">
        <router-link to='/register'>账号注册</router-link>
    </div>
    <div class="student-login-tips">{{ tips }}</div>
    <button @click="studentLogin">登录</button>
  </div>
</AccountOperate>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userLogin } from "../../request/api";

import AccountOperate from '../../components/AccountOperate.vue'


let studentMail = ref("");
let studentPassword = ref("");
let tips = ref("");

 const router = useRouter();
function studentLogin() {
  // console.log(studentMail.value);
  console.log(studentMail.value.trim());
  if (!studentMail.value.trim() || !studentPassword.value.trim()) {
    tips.value = "邮箱或密码不能为空";
  } else {
    userLogin({
      keyWord: studentMail.value,
      password: studentPassword.value,
    })
      .then((result) => {
        console.log(result);
        const code = result.code;
        if (code === 2000) {
          localStorage.setItem("token", result.data.token);

          router.push({
            path: '/introduction'
          })
        } else if (code === 2202) {
          tips.value = "用户名不存在，登录失败";
        } else if (code === 2201) {
          tips.value = "密码错误，登录失败";
        } else if (code === 2402) {
          tips.value = "系统错误";
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
  width: 400px;
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