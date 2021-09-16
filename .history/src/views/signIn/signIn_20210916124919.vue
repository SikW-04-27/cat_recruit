<template>
  <div
    class="signIn"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, .5)"
  >
    <div class="s-main">
      <!-- 页眉 -->
      <el-page-header @back="goBack" content="面试签到"> </el-page-header>
      <el-divider>当前阶段：{{ currentStatus }}</el-divider>

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
          <span class="float-left">签到成功，你的排位是{{ ranking }}</span>
        </div>
      </div>

      <!-- 当签到开放 && 用户已签到 -->
      <div class="hasCheck" v-if="opening && UserCheck">
        <el-result icon="success"></el-result>
        <span>您已签到，你的排位是{{ ranking }}，请等待叫号</span>
      </div>

      <!-- 签到未开放、 用户未报名、 用户未预约 -->
      <div class="close" v-if="!opening">
        <el-result icon="danger"></el-result>
        <span>{{ closeMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { openSocket } from "../../utils/websocket";
import { useRouter } from "vue-router";
import {
  queue,
  queueStatus,
  checkUserStatus,
  getUserStatus,
  cancelSignIn,
  listWaitingUser,
  checkEnroll,
  getCurrentStatus,
  isAppointed,
  getBriefInfo,
} from "../../request/api";
import { warning, success } from "../../utils/usualUse";

const router = useRouter();
//点击返回按钮
let goBack = () => {
  router.push({
    path: "/introduction",
  });
};

//签到后的排号
let ranking = ref("0");
//消息提示
let message = ref("");
//其他情况下显示的提示
let closeMessage = ref("未开放签到");
//学生id
let stuId = window.sessionStorage.getItem("userId");
let currentStatus = ref("");
let CurrentStatusId = JSON.parse(window.sessionStorage.getItem("CurrentStatus"))
  .id;

//1、是否报名
let hasSignUp = JSON.parse(window.sessionStorage.getItem("hasSignUp"));
//2、是否开放签到
let opening = ref(false);
//3、用户是否已签到
let UserCheck = ref(false);
//4、是否点击签到（点击签到后改变）
let signupStatus = ref(false);
//loading
let loading = ref(true);

//点击签到按钮
let comfirm = () => {
  queue({})
    .then((res) => {
      if (res.code === 1102) {
        //签到成功
        signupStatus.value = !signupStatus.value;
        //获取用户的排位(等接口ing)
        getUserQueue();
      } else {
        warning(res.message);
      }
    })
    .catch((err) => {
      warning("签到失败");
    });
};

//获取用户排名
let getUserQueue = function () {
  listWaitingUser({})
    .then((res) => {
      if (res.code === 1309) {
        //等待队列未空
        ranking.value = 0;
        return;
      }
      //获取等待队列成功
      if (res.code === 1106) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].id === stuId) {
            ranking.value = ref(i + 1);
            break;
          }
        }
      }
    })
    .catch((err) => {
      warning(err.message);
    });
};

onMounted(() => {
  openSocket("http://112.74.33.254:2358/ws/queue/", undefined, {
    onopen: () => {
      console.log(1212121212);
    },
  }).onmessage = getUserQueue;

  // const isValid = (CurrentStatusId) => {
  //   return CurrentStatusId === 1 || CurrentStatusId === 2
  // }
  //判断用户是否被淘汰
  function checkUserStatusFun() {
    getBriefInfo({})
      .then((res) => {
        //已被淘汰
        if (res.data.userStatus === "淘汰") {
          close.value = true;
          closeMessage.value ===
            "感谢你对cat工作室招新工作的支持，很抱歉你未能通过上一轮阶段。&nbsp";
          return;
        }
        //未被淘汰
        else {
          iterator.next();
        }
      })
      .catch((err) => {
        warning(err.message);
      });
  }

  //检查是否报名
  function CheckEnrollFun() {
    console.log(1111111);
    checkEnroll({})
      .then((res) => {
        //已经报名
        if (res.code === 800) {
          iterator.next();
        }
        //未报名
        if (res.code === 700) {
          opening.value = false;
          closeMessage.value = "您还未报名，请先进行报名";
          warning("您还未报名，请先进行报名");
          return;
        }
      })
      .catch((err) => {
        warning(err.message);
      });
  }

  //检测当前阶段
  function GetCurrentStatusFun() {
    console.log(222222);
    getCurrentStatus({}).then((res) => {
      currentStatus.value = res.data.status;
      //当是1，2前两个阶段的时候，关闭预约功能
      if (res.data.id === 1 || res.data.id === 2) {
        opening.value = false;
        closeMessage.value = "目前仍处于报名阶段，您已成功报名，请耐心等候";
        return;
      } else {
        //处于笔试等阶段，检查用户是否预约
        iterator.next();
      }
    });
  }

  //检测用户是否预约
  function isAppointedFun() {
    console.log(333333);
    isAppointed({})
      .then((res) => {
        //已经预约,检测签到是否开放
        if (res.code === 1519) {
          opening.value = true;
          iterator.next();
        }
        //用户未预约且当前系统已开放预约
        if (res.code === 1523) {
          opening.value = false;
          closeMessage.value =
            "您未预约，无法进行签到。当前系统已开放预约，请前往预约";
          return;
        }
        //用户未预约且当前系统未开放预约
        if (res.code === 1522) {
          opening.value = false;
          closeMessage.value =
            "您未预约，无法进行签到。当前系统未开放预约，请耐心等候";
          return;
        }
        //已在预约的时间内参加本轮招新
        if (res.code === 1520) {
          opening.value = false;
          closeMessage.value =
            "您已在预约时间内参与本轮面试，请耐心等候面试结果";
          return;
        }
        if (res.code === 1521) {
          opening.value = false;
          closeMessage.value =
            "您未在预约时间内参与本轮面试，请耐心等候面试结果";
          return;
        }
      })
      .catch((err) => {
        warning(err.message);
      });
  }

  //检测签到是否开放
  function isSignUpOpen() {
    console.log(444444444);
    queueStatus({}).then((res) => {
      //签到未开放
      if (res.code === 1301) {
        opening.value = false;
        closeMessage.value = "您已预约，请耐心等候签到开放";
        warning("您已预约，请耐心等候签到开放");
        return;
      }
      //签到已开放，去检测用户是否签到
      opening.value = true;
      iterator.next();
    });
  }

  //检测用户是否签到
  function isSignUp() {
    console.log(55555555);
    checkUserStatus({})
      .then((res) => {
        //用户未签到
        if (res.code === 1103) {
          UserCheck.value = false;
          signupStatus.value = false;
          return;
        }
        //用户已签到，未被叫号
        if (res.code === 1303) {
          UserCheck.value = true;
          getUserQueue(); //获取用户排名
          return;
        }
        //用户已签到且已被叫号,需要前往面试
        if (res.code === 1308) {
          console.log(123456789);
          opening.value = false;
          UserCheck.value = false;
          closeMessage.value = "您已签到且被叫号，请尽快前往面试";
          warning("您已签到且被叫号，请尽快前往面试");
          return;
        }
      })
      .catch((err) => {});
  }

  function* gen() {
    yield checkUserStatusFun();
    yield CheckEnrollFun();
    yield GetCurrentStatusFun();
    yield isAppointedFun();
    yield isSignUpOpen();
    yield isSignUp();
  }
  let iterator = gen();
  iterator.next();

  //点击签到按钮
  //4，取消签到（不在页面展示该功能）
  // cancelSignIn({})
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.el-page-header {
  padding: 30px 0 0 0;
  // :deep .el-page-header__content {
  //   color: #fff;
  // }
}
.signIn {
  margin: 0 auto 0;
  padding: 80px 50px 0 50px;
  color: #fff;
}
.s-main {
  background-color: rgba(78, 78, 78, 0.5);
  width: 1000px;
  height: 480px;
  padding: 0 50px;
  margin: 50px auto 0;
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
    color: #fff;
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
.el-page-header :deep {
  .el-page-header__content {
    color: rgb(236, 236, 236);
  }
}
</style>