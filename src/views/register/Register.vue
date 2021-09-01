<template>
<AccountOperate>
  <div id="student-register">
    <input type="text" v-model="studentName" placeholder="用户名" />
    <input type="text" v-model="studentMail" placeholder="邮箱" />
    <input type="password" v-model="studentPassword" placeholder="密码" />
    <input type="text" v-model="studentCheckNumber" placeholder="验证码" />
    <div
      class="click-checkNumber"
      @click="flag && isCorrectAndSendCheckNumber()"
    >
      {{ checkNumberTip }}
    </div>
    <div class="student-register-tips">{{ tips }}</div>
    <button @click="studentRegister" class="myButton">注册</button>
  </div>
</AccountOperate>
</template>


<script>
import { ref, onUpdated, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { sendCkeckNumber } from "../../request/api";
import { userRegister } from "../../request/api";
import checkAccountFormate from "../../utils/checkAccountFormat";
import AccountOperate from "../../components/AccountOperate.vue";



export default {
  name: "StudentRegister",
  components: {
AccountOperate
  },
  setup(props, context) {
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

    const router = useRouter();

    function isCorrectAndSendCheckNumber() {
      let checkInfo = checkAccountFormate(
        studentName.value,
        studentMail.value,
        studentPassword.value,
      );

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
      if (!isAllDone.value || !studentCheckNumber.value.trim()) {
        tips.value = "请先完善所有信息";
      } else {
        tips.value = "";
        userRegister({
          userName: studentName.value,
          email: studentMail.value,
          password: studentPassword.value,
          identity: 1,
          // 调用的时候要改一下号码
          phoneNumber: "123341111",
          verificationCode: studentCheckNumber.value,
        })
          .then((result) => {
            console.log(result);
            if(result.code === 3000) {
               router.push({
              path: "/login",
            });
            } else {
              tips.value = result.message;
            }
           
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    return {
      studentName,
      studentMail,
      studentPassword,
      studentCheckNumber,
      checkNumberTip,
      tips,
      flag,
      isAllDone,
      isCorrectAndSendCheckNumber,
      studentRegister,
    };
  },
};
</script>

<style lang="scss">
#student-register {
  position: relative;
  width: 400px;
  height: 330px;
  text-align: center;
  color: #fff;

  input {
    // display: block;
    margin-top: 28px;
    width: 210px;
    height: 30px;
    color: red;
    font-size: 13px;
  }

  .click-checkNumber {
    position: absolute;
    bottom: 100px;
    right: 50px;
    font-size: 12px;
  }

  .student-register-tips {
    font-size: 12px;
    height: 30px;
    line-height: 30px;
  }
}
</style>