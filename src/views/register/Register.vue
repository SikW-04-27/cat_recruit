<template>
  <div id="register">
    <div class="register-option">
      <router-link to="/register/studentRegister">学生注册</router-link>
      <router-link to="/register/manageRegister">管理员注册</router-link>
    </div>
    <router-view></router-view>
    <studentRegister ref="child"></studentRegister>
    <button @click="registerFn">注册</button>
  </div>
</template>


<script>

import { ref, defineComponent, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

import {sendCkeckNumber} from "../../request/api"

export default {
  name: "Register",

  setup(props, context) {
    let student = ref("");
    let store = useStore();

    function registerFn() {
      
      const checkMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      const checkPassword = 1;

      if (store.state.register.inentity === 1) {
        let studentMail = store.state.register.student.studentMail;
        let studentPassword = store.state.register.student.studentPassword;
        if (reg.test(studentMail)) {
         
        } else {
          console.log(222);
        }
       
      }
  console.log(11);
      sendCkeckNumber({
        "identity": 1,
        "email": "2909753663@qq.com"
      }).then((result) => {
        console.log('成功');
        console.log(result);
      }).catch((err) => {
        console.log('失败');
        console.log(err);
      })

    }

    return {
      registerFn,
    };
  },
};
</script>

<style lang="scss" scoped>
#register {
  margin: 100px auto;
  width: 450px;
  // height: 360px;
  border: 1px solid #ccc;

  .register-option {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #1e4353;

    a {
      margin: 0 10px;
      font-size: 14px;
      color: #fff;

      &:hover {
        color: red;
      }
    }
  }

  button {
    // margin-top: 30px;
    margin: 0 0 0 135px;
    width: 120px;
    height: 36px;
  }
}

/*  引入特效 */
</style>