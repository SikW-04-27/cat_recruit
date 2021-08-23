<template>
  <div id="login" class="">
    <input type="text" v-model="userName" placeholder="账户">
    <input type="text" v-model="userPassword" placeholder="密码">
    <div class="tips">
        <router-link to='/register'>账号注册</router-link>
    </div>
    <button @click="register">登录</button> 
  </div>
</template>


<script>
import {ref} from 'vue'

export default {
    name: 'Register',

    setup() {
      let userName = ref('');
      let userPassword = ref('');

      function register() {
        console.log(userName.value + userPassword.value);
      }

      return {
        userName,
        userPassword,
        register
      }
    }
}
</script>

<style lang="scss">

/* @import "tailwindcss/tailwind.css"; */
/* @import '../../assets/scss/normalize.css'; */

#login {
  margin: 65px auto;
  width: 400px;
  height: 220px;
  color: #fff;
  text-align: center;
  border: 1px solid #ccc;
  /* background-color: blue; */

  >input {
    margin-top: 28px;
    width: 280px;
    height: 30px;
    padding-left: 8px;
    border: 1px solid red
  }

  button {
    margin-top: 30px;
    width: 120px;
    height: 36px;
  }

  .tips {

    font-size: 14px;
  }

}

</style>