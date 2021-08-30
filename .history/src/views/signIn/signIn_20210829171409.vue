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
        >点击签到</el-button
      >
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "SignIn",
  setup() {
    let signupStatus = ref(false);
    const goBack = () => {
      console.log("goBack");
    };
    let comfirm = () => {
      console.log("点击了签到");
      signupStatus.value = !signupStatus.value;
    };
    return {
      data: ref("一轮"),
      goBack,
      comfirm,
      signupStatus,
    };
  },
};
</script>

<style lang="scss" scoped>
.s_btn {
  margin-top: 20px;
  .c_btn {
    display: block;
    margin: 0 auto;
  }
}
</style>