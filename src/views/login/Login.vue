<template>
  <div id="login" class="">
    <input type="text" v-model="userName">
    <input type="text" v-model="userPassword">
    <div class="tips">
        <input type="checkbox" value="记住密码">
        <router-link to='/register'>注册</router-link>
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
  height: 200px;
  text-align: center;
  border: 1px solid #ccc;
  /* background-color: blue; */

  >input {
    margin-top: 28px;
    width: 280px;
    height: 30px;
    border: 1px solid red
  }

  button {
    margin-top: 30px;
    width: 120px;
    height: 36px;
  }

}

</style>