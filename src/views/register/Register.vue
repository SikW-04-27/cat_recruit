<template>
  <div id="register">
    <div class="register-option">
      <router-link to="/register/studentRegister">学生注册</router-link>
      <router-link to="/register/manageRegister">管理员注册</router-link>
    </div>
    <router-view></router-view>
    <button @click="register">注册</button> 

  </div>
</template>


<script>
import {ref} from 'vue'

export default {
    name: 'Register',

  
}
</script>

<style lang="scss" scoped>

#register {
  margin: 100px auto;
  width: 450px;
  height: 360px;
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