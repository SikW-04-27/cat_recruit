<template>
  <div id="student-register">
    <input type="text" v-model="studentMail" placeholder="邮箱" />
    <input type="password" v-model="studentPassword" placeholder="密码" />
    <input type="text" v-model="studentCheckNumber" placeholder="验证码" />
    <div class="click-checkNumber" @click="isCorrectAndSendCheckNumber">
      {{ checkNumberTip }}
    </div>
    <div class="register-tips">邮箱格式错误！</div>
    <button>注册</button>
  </div>
</template>


<script>
import { ref, onUpdated, onMounted, watch } from "vue";
import { useStore } from "vuex";

import { sendCkeckNumber } from "../../../request/api";
export default {
  name: "StudentRegister",
  setup(props, context) {
    let studentMail = ref("");
    let studentPassword = ref("");
    let studentCheckNumber = ref("");
    let checkNumberTip = ref("点击发送验证码");

    function isCorrectAndSendCheckNumber() {
      const checkMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      const checkPassword = /123/;
      // 学生注册
      let checkFlag = 1;
      if (checkMail.test(studentMail.value)) {
        checkFlag = 1;
      } else {
        console.log("邮箱格式错误");
        checkFlag = 0;
      }

      if (checkFlag) {
        if (checkPassword.test(studentPassword.value)) {
          checkFlag = 1;
        } else {
          checkFlag = 0;
          console.log("密码格式错误");
        }
      }
      // "email": studentMail
      if (checkFlag) {
        checkNumberTip.value = "发送成功";
        let seconds = 10;
        let timer = null;
        timer = setInterval(() => {
          checkNumberTip.value = `${seconds}秒后重新发送`;
          console.log("定时器没停止", seconds);
          seconds--;
          if (seconds === -1) {
            console.log("定时器停止", seconds);
            checkNumberTip.value = "重新发送";
            clearInterval(timer);
          }
        }, 1000);
        sendCkeckNumber({
          identity: 1,
          email: "2909753663@qq.com",
        })
          .then((result) => {
            console.log("成功");
            console.log(result);
          })
          .catch((err) => {
            console.log("失败");
            console.log(err);
          });
      }
    }
    return {
      studentMail,
      studentPassword,
      studentCheckNumber,
      checkNumberTip,
      isCorrectAndSendCheckNumber,
    };
  },
};
</script>

<style lang="scss" scoped>
#student-register {
  position: relative;
  width: 400px;
  height: 250px;
  text-align: center;
  color: #fff;
  /* background-color: blue; */

  input {
    margin-top: 28px;
    width: 280px;
    height: 30px;
    color: red;
    border: 1px solid red;
  }

  .click-checkNumber {
    position: absolute;
  }
}
</style>