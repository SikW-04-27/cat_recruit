<template>
  <div class="signIn">
    <!-- 页眉 -->
    <router-link to="/introduction">
      <el-page-header @back="goBack" content="面试签到"> </el-page-header>
    </router-link>
    <el-divider>{{ data }}</el-divider>

    <!-- 当签到开放 && 用户未签到 -->
    <div class="s_btn" v-if="opening && !UserCheck && stuId">
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

    <!-- 当签到开放 && 用户已签到 -->
    <div class="hasCheck" v-if="opening && UserCheck && stuId">
      <el-result icon="success"></el-result>
      <span>您已签到，你的排位是{{ value }}，请等待叫号</span>
    </div>

    <!-- 签到未开放时 或者用户未报名 或用户未签到 -->
    <div class="close" v-if="!opening && stuId">
      <el-result icon="danger"></el-result>
      <span>{{closeMessage}}</span>
    </div>

    <!-- 当用户未登录 -->
    <div class="unLogin" v-if="!stuId">
      <span>您还未登录，请先登录</span>
    </div>

</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import {
  queue,
  queueStatus,
  checkUserStatus,
  getUserStatus,
  cancelSignIn,
  listWaitingUser,
} from "../../request/api";
    //是否开放签到
    let opening = ref(false);
    //标题显示签到状态
    let data = ref("未开放签到");
    //用户是否已签到
    let UserCheck = ref(false);
    //是否点击签到
    let signupStatus = ref(false);
    //签到后的排号
    let value = ref("*");
    //消息提示
    let message = ref("");
    //其他情况下显示的提示
    let closeMessage = ref("");
    //warning:
    let warningMessage = ref("");
    let stuId = window.localStorage.getItem("userId");
    console.log(stuId);
    const warning = () => {
      ElMessage.warning({
        message: warningMessage,
        type: "warning",
      });
    };

    const goBack = () => {
      console.log("goBack");
    };
    onMounted(()=>{

    })

</script>

<style lang="scss" scoped>
.signIn {
  background-color: #fff;
  margin: 40px auto 0;
  width: 80%;
  padding: 20px 50px 0 50px;
}
.s_btn {
  margin-top: 100px;
  padding-bottom: 50px;
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
.close,
.hasCheck {
  display: block;
  text-align: center;
  padding: 50px 0;
  span {
    line-height: 30px;
    display: inline-block;
    vertical-align: middle;
  }
}
.el-result {
  vertical-align: middle;
  :deep .icon-success {
    display: block;
    width: 30px;
    height: 30px;
  }
  :deep .icon-info {
    display: block;
    width: 30px;
    height: 30px;
  }
}
.tips,
.close {
  .el-result {
    padding: 0;
    margin-right: 20px;
    display: inline-block;
  }
}
.unLogin {
  text-align: center;
  padding: 100px 0;
}
</style>