<template>
    <!-- <UserNav></UserNav> -->
    <!-- <MyButton padding="10px 20px" color="blue">点击</MyButton> -->

  <div class="middle">
    <Manage></Manage>
  </div>
</template>

<script>
import Register from "./views/register/Register.vue";
import UserNav from "./components/UserNav.vue";
import Manage from "./views/manage/manage.vue";
import MyButton from "./components/MyButton.vue"
import MyFront from "./components/MyFront.vue"

export default {
  name: "App",
  components: {
    UserNav,
    Manage,
    MyButton,
    MyFront
  }
}
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/base.css";
body {
  background-color: rgb(41, 45, 63);
}
.middle {
  width: 1200px;
  margin: 0 auto;
}

</style>