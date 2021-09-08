
<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="rgb(34 36 38 / 65%)"
    text-color="#fff"
    active-text-color="#2f86b6"
  >
    <el-menu-item index="1"
      ><router-link to="/introduction">工作室介绍</router-link></el-menu-item
    >
    <el-submenu index="2">
      <template #title>我的工作台</template>
      <el-menu-item index="2-1"
        ><router-link to="/Form">报名</router-link></el-menu-item
      >
      <el-menu-item index="2-2"
        ><router-link to="/appointment">预约</router-link></el-menu-item
      >
      <el-menu-item index="2-3"
        ><router-link to="/progress">查看进度</router-link></el-menu-item
      >
      <el-menu-item index="2-4"
        ><router-link to="/signIn">签到</router-link></el-menu-item
      >
      <el-submenu index="2-5">
        <template #title>选项4</template>
        <el-menu-item index="2-5-1">选项1</el-menu-item>
        <el-menu-item index="2-5-2">选项2</el-menu-item>
        <el-menu-item index="2-5-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item> -->
    <el-menu-item index="3"
      ><router-link to="/news">消息中心</router-link></el-menu-item
    >
    <el-menu-item index="4">
      <a href="javascript:;" v-if="loginStatus">{{ `你好，${userName}` }}</a>
      <router-link to="/login" v-else>登录</router-link></el-menu-item
    >

    <el-menu-item index="5"
      ><router-link to="/Form">报名</router-link></el-menu-item
    >
    <el-menu-item index="6"
      ><router-link to="/appointment">预约面试时间</router-link></el-menu-item
    >
    <el-menu-item index="7"
      ><router-link to="/progress">查看面试进度</router-link></el-menu-item
    >
  </el-menu>
</template>

<script>
import { ref, onMounted, onUpdated, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { getCurrentStatus } from "../request/api";
export default {
  setup() {
    let activeIndex = ref("1");
    let activeIndex2 = ref("1");
    let loginStatus = ref("");
    let userName = ref("");

    const store = useStore();
    getCurrentStatus({})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});

    onMounted(() => {
      // console.log(localStorage.getItem('token'));
      loginStatus.value = localStorage.getItem("token") ? 1 : 0;
      if (loginStatus.value) {
        userName.value = localStorage.getItem("userName");
      }
      console.dir(store.state.loginStatus);
    });

    watch(
      () => store.state.loginStatus,
      () => {
        console.log(store.state.loginStatus, "改变了111111111");
        loginStatus.value =
          store.state.loginStatus || localStorage.getItem("token") ? 1 : 0;
        if (loginStatus.value) {
          userName.value = localStorage.getItem("userName");
        }
      }
    );

    console.log();
    const route = useRoute();

    // watch(() => route.path,() => {
    // console.log('监听到变化');
    // console.log(route.path);
    // })

    return {
      activeIndex,
      activeIndex2,
      loginStatus,
      userName,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
</style>
