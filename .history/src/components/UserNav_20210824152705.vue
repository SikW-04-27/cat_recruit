
<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#1b213a"
    text-color="#fff"
    active-text-color="red"
  >
    <el-menu-item index="1"
      ><router-link to="/introduction">工作室介绍</router-link></el-menu-item
    >
    <el-submenu index="2">
      <template #title>我的工作台</template>
      <el-menu-item index="2-1"><router-link to="/Form">报名</router-link></el-menu-item>
      <el-menu-item index="2-2"><router-link to="/appointment">预约</router-link></el-menu-item>
      <el-menu-item index="2-3"><router-link to="/introduction">查看进度</router-link></el-menu-item>
      <el-submenu index="2-4">
        <template #title>选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item> -->
    <el-menu-item index="3"
      ><router-link to="/news">消息中心</router-link></el-menu-item
    >
    <el-menu-item index="4"
      ><router-link to="/login">登录</router-link></el-menu-item
    >

    <!-- <el-menu-item index="5"
      ><router-link to="/Form">报名</router-link></el-menu-item
    >
    <el-menu-item index="6"
      ><router-link to="/appointment">预约面试时间</router-link></el-menu-item
    >
    <el-menu-item index="7"
      ><router-link to="/appointment">查看面试进度</router-link></el-menu-item
    > -->
  </el-menu>

  <router-view></router-view>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let activeIndex = ref("1");
    let activeIndex2 = ref("1");

    return {
      activeIndex,
      activeIndex2,
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
