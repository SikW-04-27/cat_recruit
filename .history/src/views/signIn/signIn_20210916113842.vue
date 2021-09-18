<template>
  <div
    class="signIn"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, .5)"
  >
    <div class="s-main">
      <!-- 页眉 -->
      <el-page-header @back="goBack" content="面试签到"> </el-page-header>
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
} from "../../request/api";
import { warning, success } from "../../utils/usualUse";

const router = useRouter();
//点击返回按钮
let goBack = () => {
  router.push({
    path: "/introduction",
  });
};

//标题显示签到状态
let data = ref("未开放签到");
//签到后的排号
let ranking = ref("0");
//消息提示
let message = ref("");
//其他情况下显示的提示
let closeMessage = ref("未开放签到");
//学生id
let stuId = window.sessionStorage.getItem("userId");

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
  loading.value = false;
  openSocket("http://112.74.33.254:2358/ws/queue/", undefined, {
    onopen: () => {
      console.log(1212121212);
    },
  }).onmessage = getUserQueue;

  // const isValid = (CurrentStatusId) => {
  //   return CurrentStatusId === 1 || CurrentStatusId === 2
  // }

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
        //已经预约,检测用户是否签到
        if (res.data.isAppointed === true) {
          opening.value = true;
          iterator.next();
        }
        //未预约
        else {
          opening.value = false;
          closeMessage.value = "您未预约，无法进行签到";
        }
      })
      .catch((err) => {
        warning(err.message);
      });
  }

  //检测用户是否签到
  function isSignUp() {
    checkUserStatus({}).then(res=>{
      
    })
  }

  // //2.若处于前两个阶段
  // if (CurrentStatusId === 1 || CurrentStatusId === 2) {
  //   //处于前两阶段,即需要检测用户是否报名
  //   if (hasSignUp === true) {
  //     //若已经报名,就检测签到是否开放
  //     console.log("已经报名");
  //     opening.value = false;
  //     closeMessage.value = "您已报名，暂未开放签到，请耐心等候";
  //   } else {
  //     //若还未报名
  //     console.log("未报名");
  //     opening.value = false;
  //     closeMessage.value = "用户未报名，请先报名";
  //   }
  //   return;
  // }

  //3.处于面试考核等阶段，需要获取用户是否已经预约时间
  //是否预约
  getUserStatus({})
    .then((res) => {
      if (res.data.beginTime) {
        //已经预约的情况
        console.log(11);
        //4.获取当前签到是否开启
        queueStatus({}).then((res) => {
          console.log(res);
          if (res.code === 1101) {
            //处于签到状态
            data.value = res.message;
            opening.value = true;
            console.log(opening);
            //5.检测用户是否已经签到
            checkUserStatus({ id: stuId })
              .then((res) => {
                if (res.code === 1303 || res.code === 1308) {
                  //用户已签到,已处于等待队列，等待叫号
                  console.log(res);
                  console.log("12345678765432");
                  UserCheck.value = true;
                  getUserQueue();
                } else if (res.code === 1103) {
                  //未签到，未处于等待队列，请签到
                  UserCheck.value = false;
                } else {
                  closeMessage.value = res.message;
                  opening.value = false;
                }
              })
              .catch((err) => {
                warning(err.message);
              });
          } else {
            //未处于签到状态
            opening.value = false;
            closeMessage.value = "您已预约时间，暂未开放签到，请耐心等候";
          }
        });
      } else {
        //未预约
        opening.value = false;
        closeMessage.value = "用户未预约，请先预约";
      }
    })
    .catch((err) => {
      closeMessage.value = err.data.message;
      warning(err.data.message);
    });

  function* gen() {
    yield CheckEnrollFun();
    yield GetCurrentStatusFun();
    yield isAppointedFun();
    yield four();
    yield five();
  }

  //点击签到按钮
  //4，取消签到（不在页面展示该功能）
  // cancelSignIn({})
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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
</style>