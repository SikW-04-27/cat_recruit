<template>
  <div id="student-register" class="">
    <div>邮箱</div>
    <input type="text">
    <div>密码</div>
    <input type="text">
    <div class="tips">邮箱格式错误！</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

#student-register {
  width: 400px;
  height: 200px;
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