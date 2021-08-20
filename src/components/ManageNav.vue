<template>
  
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="RGB(41,45,63)" text-color="#fff" active-text-color="#fff">
    <img class="nav_logo" src="../assets/img/catlogo.png" alt="">
    <el-menu-item index="3">个人中心</el-menu-item>
  <el-menu-item index="1">已报名</el-menu-item>
  <el-submenu index="2">
    <template #title>评分</template>
    <el-menu-item index="2-1">笔试</el-menu-item>
    <el-menu-item index="2-2">一轮面试</el-menu-item>
    <el-menu-item index="2-3">二轮面试</el-menu-item>
    <el-menu-item index="2-4">一轮考核</el-menu-item>
    <el-menu-item index="2-5">二轮考核</el-menu-item>
  </el-submenu>
  
  <el-menu-item index="4">操作管理</el-menu-item>
</el-menu>
<div class="line"></div>

</template>

<script>
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    setup() {
      const activeIndex = ref('1');
      const activeIndex2 = ref('1');
      const handleSelect = (key, keyPath) => {
        console.log(key, keyPath);
      };
      return {
        activeIndex,
        activeIndex2,
        handleSelect,
      };
    },
  });
</script>




<style lang="scss" scoped>
    .nav_logo{
      margin-top: 10px;
      margin-left: 20px;
      width: 70px;
    }
    .el-menu{
        .el-menu-item,.el-submenu{
          float: right;
        }
    }

</style>