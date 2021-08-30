<template>
  <div class="signIn">
    <!-- 页眉 -->
    <router-link to="/introduction">
      <el-page-header @back="goBack" content="面试签到"> </el-page-header>
    </router-link>
    <el-divider>目前签到：{{ data }}</el-divider>
    <div class="s_btn">
      <el-button
        type="primary"
        round
        v-if="!signupStatus"
        @click="comfirm"
        class="c_btn"
        >确定预约</el-button
      >
      <el-button type="danger" round v-if="signupStatus" @click="cancel"
        >取消预约</el-button
      >
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "SignIn",
  setup() {
    const goBack = () => {
      console.log("goBack");
    };
    return {
      data: ref("一轮"),
      goBack,
    };
  },
};
</script>

<style>
</style>