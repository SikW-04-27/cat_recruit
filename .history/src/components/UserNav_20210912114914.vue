
<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="rgb(34 36 38 / 65%)"
    text-color="#fff"
    active-text-color="red"
  >
    <el-submenu index="2" v-if="isLoad">
      <template #title
        ><el-badge :is-dot="isDot">我的工作台</el-badge></template
      >
      <el-menu-item index="2-1"
        ><router-link to="/Form">报名表</router-link></el-menu-item
      >
      <el-menu-item index="2-2"
        ><router-link to="/appointment">预约面试</router-link></el-menu-item
      >
      <el-menu-item index="2-3"
        ><router-link to="/signIn">到场签到</router-link></el-menu-item
      >
      <el-menu-item index="2-4" @click="unDot"
        ><router-link to="/progress">查看进度</router-link></el-menu-item
      >
      <el-menu-item index="3"
        ><router-link to="/news"
          ><el-badge :is-dot="isDot">消息中心</el-badge></router-link
        ></el-menu-item
      >
      <el-menu-item @click="unLoad" v-if="isLoad">退出登录</el-menu-item>

      <!-- <el-submenu index="2-5">
        <template #title>选项4</template>
        <el-menu-item index="2-5-1">选项1</el-menu-item>
        <el-menu-item index="2-5-2">选项2</el-menu-item>
        <el-menu-item index="2-5-3">选项3</el-menu-item>
      </el-submenu> -->
    </el-submenu>
    <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item> -->

    <el-menu-item index="4">
      <a href="javascript:;" v-if="loginStatus">{{ `你好，${userName}` }}</a>
      <router-link to="/login" v-else>登录</router-link></el-menu-item
    >

    <el-menu-item index="1"
      ><router-link to="/introduction">工作室介绍</router-link></el-menu-item
    >
  </el-menu>
</template>

<script>
import {
  ref,
  onMounted,
  onUpdated,
  onBeforeUpdate,
  onUnmounted,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getCookie, removeCookie } from "../utils/myCookie";
import { openSocket } from "../utils/websocket";
import {
  getCurrentStatus,
  getSubmit,
  getBriefInfo,
  getUserStatus,
} from "../request/api";

export default {
  setup() {
    let activeIndex = ref("1");
    let activeIndex2 = ref("1");
    let loginStatus = ref("");
    let userName = ref("");

    let isLoad = ref(true);

    const store = useStore();

    const router = useRouter();

    let isDot = ref(false);

    onMounted(() => {
      // console.log(localStorage.getItem('token'));
      // console.log(getCookie('studentToken'));
      console.log(document.cookie);
      console.log(111);
      loginStatus.value = getCookie("studentToken") ? 1 : 0;
      if (loginStatus.value) {
        console.log(111);
        userName.value = sessionStorage.getItem("userName");
        isLoad.value = true;
      } else {
        isLoad.value = false;
      }
      console.dir(store.state.loginStatus);

      //获取当前招新状态
      getCurrentStatus({})
        .then((res) => {
          window.sessionStorage.setItem(
            "CurrentStatus",
            JSON.stringify(res.data)
          );
        })
        .catch((err) => {});
      //判断用户是否报名
      if (getCookie("studentToken")) {
        getSubmit({ uuid: window.sessionStorage.getItem("userId") })
          .then((res) => {
            if (res.data) {
              //已报名的状态
              window.sessionStorage.setItem("hasSignUp", true);
            } else {
              //未报名
              window.sessionStorage.setItem("hasSignUp", false);
            }
          })
          .catch((err) => {});
      }

      //websocket更新小红点
      openSocket().onmessage = function () {
        isDot.value = true;
        console.log("小红点");
      };
    });

    watch(
      () => store.state.loginStatus,
      () => {
        console.log(store.state.loginStatus, "改变了111111111");
        loginStatus.value =
          store.state.loginStatus || getCookie("studentToken") ? 1 : 0;
        if (loginStatus.value) {
          userName.value = sessionStorage.getItem("userName");
          isLoad.value = true;
        } else {
          isLoad.value = false;
        }
      }
    );

    function unLoad() {
      removeCookie("studentToken");
      store.state.loginStatus = false;
      isLoad.value = false;
      sessionStorage.clear();
      router.push({
        path: "/introduction",
      });
    }

    //点击消息中心，取消小红点
    const unDot = () => {
      isDot.value = false;
      console.log("取消小红点");
    };

    onUnmounted(() => {
      location.reload();
    });

    // watch(() => route.path,() => {
    // console.log('监听到变化');
    // console.log(route.path);
    // })

    return {
      activeIndex,
      activeIndex2,
      loginStatus,
      userName,
      isLoad,
      unLoad,
      isDot,
      unDot,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style  lang="scss">
ul {
  padding: 0 90px;
  /* height: 30px; */
  /* border-bottom: 0 !important; */
}

.activeIndex2 {
  background-color: green;
}
.el-menu-demo {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  width: 100%;
}
.nav_logo {
  margin-top: 10px;
  margin-left: 20px;
  width: 70px;
  float: left;
}
.el-menu {
  .el-menu-item,
  .el-submenu {
    padding: 0 20px;
    // float: right;
    a {
      display: inline-block;
      height: 100%;
      width: 100%;
    }
  }
}
.el-popper {
  .el-menu--horizontal {
    background-color: #000;
    a {
      display: inline-block;
      height: 100%;
      width: 100%;
      padding-left: 0;
    }
  }
}

  margin-top: 10px;
  margin-left: 20px;
  width: 70px;
  float: left;
}
.el-menu {
  .el-menu-item,
</style>
