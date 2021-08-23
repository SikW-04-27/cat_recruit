
<template>
  <!-- 这个是个弹出的提示框，绝对定位，定位在页面中心，3秒后会自动消失，可以用来弹出“密码错误”“账号不存在”等提示  -->
  <div id="tips" class='rounded-xl'>text</div>
</template>

<script>
import "tailwindcss/tailwind.css";
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

<style lang="scss" scoped>
#tips {
  height: 70px;
  width: 200px;
  color: rgb(197, 197, 197);
  background-color: #3f3f3fab;
  line-height: 70px;
  text-align: center;
}
</style>