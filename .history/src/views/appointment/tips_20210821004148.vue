
<template>
  <!-- 这个是个弹出的提示框，绝对定位，定位在页面中心，3秒后会自动消失，可以用来弹出“密码错误”“账号不存在”等提示  -->
  <div id="tips">111</div>
</template>

<script>
export default {
  name: "tips",
  setup() {
    function tips() {
      console.log(111);
    }
    return {
      tips,
    };
  },
};
</script>

<style lang="sass" scoped>
tips{
    height: 50px;
    width: 50px;
    background-color: #ff;
}
</style>