<template>
  <div class="signIn">
    <!-- 页眉 -->
    <router-link to="/introduction">
      <el-page-header @back="goBack" content="面试签到"> </el-page-header>
    </router-link>
    <el-divider>目前签到：{{ data }}</el-divider>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "SignIn",
  setup() {
    return {
      data: ref("一轮")
    };
  },
};
</script>

<style>
</style>