<template>
  <Background></Background>
  <UserNav> </UserNav>
  <router-view class="userNav"></router-view>

  <!-- <MyButton padding="10px 20px" color="blue">点击</MyButton> -->
</template>

<script>
import { onMounted, onBeforeMount } from "vue";

import { useStore } from "vuex";

import { setCookie, getCookie } from "./utils/myCookie";

import { getStudentInfo } from "./request/api";

import UserNav from "./components/UserNav.vue";

import Background from "./views/background/background.vue";

export default {
  name: "App",
  components: {
    UserNav,
    Background,
  },

  setup() {
    const store = useStore();

    onMounted(() => {
      // document.cookie = "nameqq=wwww"
      // 页面在挂载之前，就判断是否有登录
      if (getCookie("studentToken")) {
        getStudentInfo({})
          .then((result) => {
            console.log(result);
            window.sessionStorage.setItem(
              "userName",
              result.data.user.userName
            );
            window.sessionStorage.setItem("userId", result.data.user.id);
            store.state.loginStatus = true;
            console.log("loginstatus修改了");
          })
          .catch((error) => {
            console.log(error);
          });
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
  // background-image: url("./assets/img/banner背景 (4).jpg");
  // background-size: contain;

  // background-size: contain;
  background-color: rgb(1, 5, 61);
}
.middle {
  width: 1200px;
  margin: 0 auto;
}
.nav_logo {
  margin: 10px;
  margin-top: 10px;
  margin-left: 20px;
  width: 70px;
  float: left;
}
.el-menu{
    .el-menu-item,.el-submenu{
      padding: 0;
      float: right;
      a{
        padding: 0 20px;
        display: inline-block;
        height: 60px;
        line-height: 60px;
        color: #fff;
      }
    }
}
.el-popper{
    .el-menu--horizontal{
      background-color: #000;
      a{
        height: 36px;
        line-height: 36px;
        padding-left: 0;
      }
    }
}
</style>