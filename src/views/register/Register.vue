<template>
  <AccountOperate>
    <div id="student-register" v-loading="loading">
      <p class="register-word myFront" data-text="REGISTER">REGISTER</p>
      <input type="text" v-model="studentName" placeholder="用户名（2-20， 只包含汉字字母数字和下划线）" />
      <input type="text" v-model="studentMail" placeholder="邮箱" />
      <input type="password" v-model="studentPassword" placeholder="密码（8-18，只包含字母和数字）" />
      <div
        class="click-checkNumber"
        @click="flag && isCorrectAndSendCheckNumber()"
      >
        {{ checkNumberTip }}
      </div>
      <input type="text" v-model="studentCheckNumber" placeholder="验证码" />

      <div class="student-register-tips">{{ tips }}</div>
      <div id="check-register" @click="studentRegister">注册</div>
    </div>
  </AccountOperate>
</template>


<script setup>
import { ref, onUpdated, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { sendCkeckNumber } from "../../request/api";
import { userRegister } from "../../request/api";
import checkAccountFormate from "../../utils/checkAccountFormat";
import AccountOperate from "../../components/AccountOperate.vue";

let studentName = ref("");
let studentMail = ref("");
let studentPassword = ref("");
let studentCheckNumber = ref("");
let checkNumberTip = ref("点击发送验证码");
let tips = ref("");
// 点击发送验证码后不能重复点击
let flag = ref(true);
// 点击注册之前判断是否所有的都输入正确
let isAllDone = ref(false);

let isTimeOut = ref(false);

let loading = ref(false);

const router = useRouter();

function isCorrectAndSendCheckNumber() {
  let checkInfo = checkAccountFormate(
    studentName.value,
    studentMail.value,
    studentPassword.value
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
    sendCkeckNumber({
      identity: 1,
      email: studentMail.value,
    })
      .then((result) => {
        console.log("成功");
        console.log(result);
        isAllDone.value = true;
      })
      .catch((err) => {
        console.log("失败");
        console.log(err);
      });
  }
}

function studentRegister() {
  let registerTimer = null;

  if (!isAllDone.value || !studentCheckNumber.value.trim()) {
    tips.value = "请先完善所有信息";
  } else {
    tips.value = "";
    loading.value = true;
    registerTimer = setTimeout(() => {
      loading.value = false;
      tips.value = "登录超时";
      isTimeOut.value = true;
    }, 10000);
    userRegister({
      userName: studentName.value,
      email: studentMail.value,
      password: studentPassword.value,
      identity: 1,
      verificationCode: studentCheckNumber.value,
    })
      .then((result) => {
        if (!isTimeOut.value) {
          console.log(result);
          clearTimeout(registerTimer);
          loading.value = false;
          if (result.code === 3000) {
            router.push({
              path: "/login",
            });
          } else {
            tips.value = result.message;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
// return {
//   studentName,
//   studentMail,
//   studentPassword,
//   studentCheckNumber,
//   checkNumberTip,
//   tips,
//   flag,
//   isAllDone,
//   isCorrectAndSendCheckNumber,
//   studentRegister,
// };
</script>

<style lang="scss">
#student-register {
  position: relative;
  width: 400px;
  height: 330px;
  text-align: center;
  color: #fff;

  // input {
  //   // display: block;
  //   margin-top: 28px;
  //   width: 210px;
  //   height: 30px;
  //   color: red;
  //   font-size: 13px;
  // }

  .register-word {
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

  .click-checkNumber {
    // 加上定位后元素才不会被遮挡
    position: relative;
    margin: 10px 0 -15px 240px;
    font-size: 12px;
    z-index: 5;
    &:hover {
      cursor: pointer;
    }
  }

  .student-register-tips {
    font-size: 12px;
    height: 30px;
    color: red;
    line-height: 30px;
  }

  #check-register {
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