<template>
  <div id="login" class="">
    <input type="text" v-model="userName">
    <input type="text" v-model="userPassword">
    <button @click="register">注册</button>
    <h1>1111111111111111111</h1>
    <h3>222222222222222222222222</h3>
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

<style>

/* @import "tailwindcss/tailwind.css"; */
/* @import '../../assets/scss/normalize.css'; */

#login {
  margin: 0 auto;
  width: 200px;
  height: 200px;
  /* background-color: blue; */
}

</style>