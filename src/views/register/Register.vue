<template>
  <AccountOperate>
    <router-link to="/register/studentRegister">学生注册</router-link>
    <router-link to="/register/manageRegister">管理员注册</router-link>
  </AccountOperate>
</template>


<script>
import { ref, defineComponent, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

import AccountOperate from "../../components/AccountOperate.vue";

export default {
  name: "Register",
  components: {
    AccountOperate,
  },
};
</script>

<style lang="scss" scoped>
// #register {
//   margin: 100px auto;
//   width: 450px;
//   // height: 360px;
//   border: 1px solid #ccc;

//   .register-option {
//     width: 100%;
//     height: 40px;
//     line-height: 40px;
//     background-color: #1e4353;

//     a {
//       margin: 0 10px;
//       font-size: 14px;
//       color: #fff;

//       &:hover {
//         color: red;
//       }
//     }
//   }

//   button {
//     // margin-top: 30px;
//     margin: 0 0 0 135px;
//     width: 120px;
//     height: 36px;
//   }
// }

/*  引入特效 */
</style>