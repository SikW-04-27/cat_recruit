<template>
  <UserNav></UserNav>
  <!-- <MyButton padding="10px 20px" color="blue">点击</MyButton> -->

  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import { onMounted, onBeforeMount } from "vue";

import { setCookie, getCookie } from "./utils/myCookie";

import UserNav from "./components/UserNav.vue";
import Manage from "./views/manage/manage.vue";

export default {
  name: "App",
  components: {
    UserNav,
    Manage,
  },

  setup() {
    console.log(localStorage.getItem("token"));

    onBeforeMount(() => {
      document.cookie = "nameqq=wwww";
      // 页面在挂载之前，就判断是否有登录
      if (getCookie("studentToken")) {
        sessionStorage.setItem("userName", 11111);
      }
    });
  },
};
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/base.css";
@import "./assets/scss/button.scss";
@import "./assets/scss/front.scss";

body {
  // background-color: #292d3f;
  // background: url('./assets/img/bg.jpg') no-repeat 100% 100%;
  // background-image: url("./assets/img/下载 (1).png");

  // background-image: url('./assets/img/bg1.jpg');
  // background-image: url('./assets/img/bg2.png');
  // background-size: contain;
  // background-image: url('./assets/img/bg5.jpg');
  background-image: url("./assets/img/banner背景 (4).jpg");
  background-size: contain;

  // background-size: contain;
}
.middle {
  width: 1200px;
  margin: 0 auto;
}
</style>