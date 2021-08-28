<template>
  <div id="manage-register" class="">
    <input type="text" v-model="managerName" placeholder="用户名" />
    <input type="text" v-model="managerMail" placeholder="邮箱" />
    <input type="text" v-model="managerPassword" placeholder="密码" />
    <input type="text" v-model="managerKey" placeholder="管理员秘钥" />
    <div class="manager-register-tips">{{ tips }}</div>
    <button @click="managerRegister" class="myButton">注册</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { userRegister } from "../../../request/api";
import checkAccountFormate from "../../../hooks/checkAccountFormat";

export default {
  name: "manageRegister",

  setup() {
    let managerName = ref("");
    let managerMail = ref("");
    let managerPassword = ref("");
    let managerKey = ref("");

    //注册格式错误时提示
    let tips = ref("");

    const router = useRouter();

    function managerRegister() {

      let checkInfo = checkAccountFormate(
        managerName.value,
        managerMail.value,
        managerPassword.value,
        managerKey.value,
        0
      );
      //  console.log(checkInfo);
      if (!checkInfo[0]) {
        tips.value = checkInfo[1];
      } else {
        userRegister({
          "userName": managerName.value,
          "email": managerMail.value,
          "password": managerPassword.value,
          "identity": 0,
          "VerificationCode": managerKey.value,
        })
          .then((result) => {
            console.log(result);
            router.push({
              path: "/login/managerLogin",
            });
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
      tips,
      managerRegister,
    };
  },
};
</script>

<style lang="scss" scoped>
#manage-register {
  width: 400px;
  height: 330px;
  text-align: center;
  color: #fff;
  /* background-color: blue; */

  .manager-register-tips {
     font-size: 12px;
    height: 30px;
    line-height: 30px;
  }
}
</style>