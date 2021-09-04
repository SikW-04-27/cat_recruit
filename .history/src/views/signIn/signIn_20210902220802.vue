<template>
  <div class="signIn">
    <!-- 页眉 -->
    <router-link to="/introduction">
      <el-page-header @back="goBack" content="面试签到"> </el-page-header>
    </router-link>
    <el-divider>{{ data }}</el-divider>

    <!-- 当签到开放 && 用户未签到 -->
    <div class="s_btn" v-if="opening && !UserCheck">
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
    <div class="hasCheck" v-if="opening && UserCheck">
      <el-result icon="success"></el-result>
      <span>您已签到，你的排位是{{ value }}，请等待叫号</span>
    </div>

    <!-- 签到未开放时 -->
    <div class="close" v-if="!opening">
      <el-result icon="danger"></el-result>
      <span>签到暂未开放，请耐心等候</span>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import {
  queue,
  queueStatus,
  checkUserStatus,
  getUserStatus,
} from "../../request/api";
export default {
  name: "SignIn",
  setup() {
    //是否开放签到
    let opening = ref(true);
    //标题显示签到状态
    let data = ref("未开放签到");
    //用户是否已签到
    let UserCheck = ref(false);
    //是否点击签到
    let signupStatus = ref(false);
    //签到后的排号
    let value = ref("1");
    //消息提示
    let message = ref("");
    //warning:
    let warningMessage = ref("");
    let stuId = JSON.parse(window.sessionStorage.getItem("user_register"))
      .studentId;
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

    //1.获取当前签到是否开启（在挂载之前）
    queueStatus({}).then((res) => {
      console.log(res);
      if (res.code === 1101) {
        data.value = res.message;
        opening.value = true;
      } else {
        //未处于签到状态
        opening.value = false;
      }
    });

    //2.检测用户是否已经签到
    checkUserStatus({ id: stuId })
      .then((res) => {
        console.log(res);
        UserCheck.value = true;
      })
      .catch((err) => {
        console.log(err);
        warningMessage.value = err.data.message;
        warning();
      });

    //3.用户未签到时，点击签到按钮
    let comfirm = () => {
      queue({ id: "f6a4d743bdce40e699a6cdbb1fd1f84f" })
        .then((res) => {
          console.log("成功");
          console.log(res);
          signupStatus.value = !signupStatus.value;
        })
        .catch((err) => {
          console.log(err.data.message);
          warningMessage.value = err.data.message;
          warning();
        });
      //获取用户的排位(等接口ing)
    };

    return {
      data,
      goBack,
      comfirm,
      signupStatus,
      value,
      opening,
      UserCheck,
      stuId,
    };
  },
};
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
  padding
  span {
    line-height: 30px;
    display: inline-block;
    vertical-align: middle;
  }
  .el-result {
    vertical-align: middle;
    :deep .icon-success {
      display: block;
      width: 30px;
      height: 30px;
    }
  }
}
</style>