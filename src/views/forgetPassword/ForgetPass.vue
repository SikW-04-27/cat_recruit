<template>
  <AccountOperate>
      <div id="forget-pass-content">
<input type="text" placeholder="邮箱">
<input type="text" placeholder="新密码">
<input type="text" placeholder="验证码">
      </div>
  </AccountOperate>
</template>

<script>

import AccountOperate from '../../components/AccountOperate.vue'

</script>

<style>

#forget-pass-content {
    margin: 100px auto;
    width: 200px;
    height: 200px;
    background-color: red;
}

</style>