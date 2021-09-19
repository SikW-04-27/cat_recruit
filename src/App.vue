<template>
  <!-- <Background></Background> -->
  <NewNav> </NewNav>
  <router-view class="userNav"></router-view>

  <!-- <MyButton padding="10px 20px" color="blue">点击</MyButton> -->
</template>

<script>
import { onMounted, onBeforeMount } from "vue";

import { useStore } from "vuex";

import { setCookie, getCookie } from "./utils/myCookie";

import { getStudentInfo } from "./request/api";

import UserNav from "./components/UserNav.vue";

import NewNav from './components/NewNav.vue'

import Background from "./views/background/background.vue";

export default {
  name: "App",
  components: {
    NewNav,
  },

  setup() {
    const store = useStore();

    onMounted(() => {
      // document.cookie = "nameqq=wwww"
      // 页面在挂载之前，就判断是否有登录
      if (getCookie("studentToken")) {
        console.log('000000000000000000000');
        getStudentInfo({})
          .then((result) => {
            console.log(result);
            window.sessionStorage.setItem(
              "userName",
              result.data.user.userName
            );
            window.sessionStorage.setItem("userId", result.data.user.id);
            store.state.loginStatus = true;
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
  background-color: rgb(233, 233, 233);
  background: url(./assets/img/background.png);
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
  min-width: 1200px;
}
.middle {
  width: 1200px;
  margin: 0 auto;
}

</style>