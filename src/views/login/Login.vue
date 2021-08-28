<template>
  <AccountOperate>
    <router-link to="/login/studentLogin">学生登录</router-link>
    <router-link to="/login/managerLogin">管理员登录</router-link>
  </AccountOperate>

   <div class="skip-register">
        <router-link to='/register'>账号注册</router-link>
    </div>
</template>


<script>
import {ref} from 'vue'

import AccountOperate from '../../components/AccountOperate.vue'

export default {
    name: 'Login',
    components: {
      AccountOperate 
    }
}
</script>

<style lang="scss">

/* @import "tailwindcss/tailwind.css"; */
/* @import '../../assets/scss/normalize.css'; */
 .skip-register {
   position: absolute;
   top: 0;
   color: #fff;
    font-size: 14px;
  }


</style>