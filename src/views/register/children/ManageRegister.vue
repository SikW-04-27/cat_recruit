<template>
  <div id="manage-register" class="">
    <input type="text" v-model="managerName" placeholder="用户名" />
    <input type="text" v-model="managerMail" placeholder="邮箱" />
    <input type="text" v-model="managerPassword" placeholder="密码" />
    <input type="text" v-model="managerKey" placeholder="管理员秘钥" />
    <div class="tips">邮箱格式错误！</div>
    <button @click="managerRegister">注册</button>
  </div>
</template>

<script>
import { ref } from "vue";

import { userRegister } from "../../../request/api";

export default {
  name: "manageRegister",

  setup() {
    let managerName = ref("");
    let managerMail = ref("");
    let managerPassword = ref("");
    let managerKey = ref("");

    function managerRegister() {
      const checkName = /^([a-zA-Z0-9_-]|[\u4E00-\u9FA5]){2,20}$/;
      const checkMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      const checkPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
      const key = /4396777/;
      // 管理员注册
      let checkFlag = 1;
      // console.log(managerMail.value);

      if (checkName.test(managerName.value)) {
        checkFlag = 1;
      } else {
        alert("用户名格式错误");
        checkFlag = 0;
      }

      if (checkFlag) {
        if (checkMail.test(managerMail.value)) {
          checkFlag = 1;
        } else {
          alert("邮箱格式错误");
          checkFlag = 0;
        }
      }

      if (checkFlag) {
        if (checkPassword.test(managerPassword.value)) {
          checkFlag = 1;
        } else {
          checkFlag = 0;
          alert("密码格式错误");
        }
      }

      if (checkFlag) {
        if (key.test(managerKey.value)) {
          console.log("成功了");
        } else {
          alert("秘钥错误");
          checkFlag = 0;
        }
      }

      if (checkFlag) {
        userRegister({
          userName: managerName.value,
          email: managerMail.value,
          password: managerPassword.value,
          identity: 0,
          VerificationCode: managerKey.value,
        })
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    return {
      managerName,
      managerMail,
      managerPassword,
      managerKey,
      managerRegister,
    };
  },
};
</script>

<style lang="scss" scoped>
#manage-register {
  width: 400px;
  height: 270px;
  text-align: center;
  /* background-color: blue; */

  input {
    margin-top: 28px;
    width: 280px;
    height: 30px;
    border: 1px solid red;
  }
}
</style>