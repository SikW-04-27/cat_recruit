<template>
  <div class="signIn">
    <!-- 页眉 -->
    <router-link to="/introduction">
      <el-page-header @back="goBack" content="面试签到"> </el-page-header>
    </router-link>
    <el-divider>目前签到：{{ data }}</el-divider>
    <!-- 当签到开放时 -->
    <div class="s_btn" v-model="opening">
      <!-- 点击签到的按钮 -->
      <el-button
        type="primary"
        round
        v-if="!signupStatus"
        @click="comfirm"
        class="c_btn"
        >点击签到</el-button
      >
      <!-- 显示签到成功的信息 -->
      <div class="tips text-center" v-if="signupStatus">
        <el-result icon="success" class="float-left"></el-result>
        <span class="float-left">签到成功，你的排位是{{ value }}</span>
      </div>
    </div>
    <!-- 签到未开放时 -->
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "SignIn",
  setup() {
    let signupStatus = ref(false);
    let value = ref("1");
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
      value,
    };
  },
};
</script>

<style lang="scss" scoped>
.s_btn {
  margin-top: 20px;
  text-align: center;
  .c_btn {
    display: block;
    margin: 0 auto;
  }
  .tips {
    display: inline-block;
    margin: 0;
    padding: 0;
    span {
      line-height: 30px;
    }
  }
}
</style>