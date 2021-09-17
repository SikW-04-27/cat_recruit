<template>
  <AccountOperate>
      <div id="forget-pass-content">
        <input type="text" placeholder="邮箱" v-model="loginMail">
        <input type="text" placeholder="新密码" v-model="newPassword">
        <input type="text" placeholder="验证码" v-model="newCheckNum">
        <div @click="isCorrectAndSendCheckNumber">{{checkNumberTip}}</div>
        <div>{{tips}}</div>
        <div @click="newLogin">重置密码</div>
      </div>
  </AccountOperate>
</template>

<script setup>

import {ref} from 'vue';

import AccountOperate from '../../components/AccountOperate.vue';
import checkAccountFormate from "../../utils/checkAccountFormat";
import {resetSendEmail, resetPassword} from '../../request/api'


let newPassword = ref('');
let loginMail = ref('');
let newCheckNum = ref('');
let tips = ref('');
let flag = ref(false);
let checkNumberTip = ref('发送验证码');

let isAllDone = ref(false);

function isCorrectAndSendCheckNumber() {
   tips.value = '';

  let checkInfo = checkAccountFormate(
    'catcat',
    loginMail.value,
    newPassword.value
  );
  console.log(1111111111111111111111);
  if (!checkInfo[0]) {
    console.log(checkInfo);
    tips.value = checkInfo[1];
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
      "email": loginMail.value,
    })
      .then((result) => {
        console.log("成功");
        console.log(result);
        if(result.code === 1407) {
        
          isAllDone.value = true;
        } else {
     tips.value = result.message
        }
        
      })
      .catch((err) => {
        console.log("失败");
        console.log(err);
         tips.value = err.message
      });
  }
}

function newLogin() {
    if(!isAllDone.value || !newCheckNum .value.trim()) {
    tips.value = "请先完善所有信息";
    } else {
        tips.value = "";
resetPassword({
    email: loginMail.value,
    password: newPassword.value,
    verificationCode: newCheckNum.value
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})
    }
}

</script>

<style>

#forget-pass-content {
    margin: 100px auto;
    width: 300px;
    height: 400px;
    background-color: red;
}

</style>