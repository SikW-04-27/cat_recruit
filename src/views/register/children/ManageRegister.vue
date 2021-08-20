<template>
 <div id="manage-register" class="">
    <div>邮箱</div>
    <input type="text" v-model="userName">
    <div>密码</div>
    <input type="text" v-model="userPassword">
    <div>管理员密钥</div>
     <input type="text" v-model="userPassword">
    <div class="tips">邮箱格式错误！</div>
  </div>
</template>

<script>
export default {

}
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
    border: 1px solid red
  }

  

}

</style>