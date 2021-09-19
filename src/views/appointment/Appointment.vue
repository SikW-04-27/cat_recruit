<template>
  <transition
    name="animate__animated animate__bounce"
    enter-active-class="animate__headShake"
  >

  <div class="appointment_block" v-show="hide">
    <div
      id="appointment"
      v-loading="loading"
      element-loading-background="rgb(255 255 255 / 41%)"
    >
      <!-- 页眉 -->
      <el-page-header @back="goBack" content="预约面试时间"> </el-page-header>
      <el-divider>目前阶段：{{ currentStatus }}</el-divider>

      <!-- 预约 -->
      <div class="a_content" v-if="!close">
        <span>请选择预约时间：</span>
        <!-- 预约日期 -->
        <el-select
          v-model="totalTime"
          filterable
          placeholder="请选择预约日期"
          :disabled="disabled"
          @change="optionsChange($event)"
        >
          <el-option
            v-for="item in day"
            :key="item.id"
            :label="item.totalTime"
            :value="item.totalTime"
          >
          </el-option>
        </el-select>

        <!-- （提示）已预约 -->
        <div class="tips text-center" v-if="signupStatus">
          <el-result icon="success"></el-result>
          <span>您已预约成功，预约时间为：{{ totalTime }}</span>
        </div>

        <!-- 预约按钮 -->
        <div class="a_btn">
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

      <!-- 未开放预约的状态  -->
      <div class="close" v-if="close">{{ closeMessage }}</div>
    </div>
  </div>

  </transition>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElLoading } from "element-plus";
import "tailwindcss/tailwind.css";
import {
  listAppointment,
  getUserStatus,
  updateUserInfo,
  cancelAppointment,
  checkAppointment,
  isAppointed,
  checkEnroll, //检查用户是否报名
  getBriefInfo,
  getCurrentStatus, //获取当前阶段
} from "../../request/api.js";
import { useRouter } from "vue-router";
import { warning, success, getSessionValue } from "../../utils/usualUse.js";
import { getCookie } from "../../utils/myCookie";

// 预约日期
let day = reactive([]);
//判断是否已预约
let signupStatus = ref(false);
// 控制选择框禁止状态
let disabled = ref(false);
//设置选项的key值（即时间的id值）
let key = ref();
//判断预约是否能开放
let close = ref(true);
//存储用户id
let stuId = getSessionValue("userId");
//closeMessage
let closeMessage = ref("加载中");
//loading
let loading = ref(true);
//totalTime
let totalTime = ref("");
//currentStatus
let currentStatus = ref("");
// getObjValue(currentStatus) = CurrentStatus();
const router = useRouter();
//hide
let hide = ref(false);

//点击返回按钮
let goBack = () => {
  router.push({
    path: "/introduction",
  });
};

//当选择框里面的值改变时：(传递的参数就是选择框里的值)
let optionsChange = ($event) => {
  day.forEach((item) => {
    if (item.totalTime === $event) {
      key.value = item.id;
    }
  });
};

//comfirm函数，点击预约时调用
const comfirm = () => {
  loading.value = true;
  if (totalTime.value != "") {
    //调用预约接口
    updateUserInfo({
      id: stuId,
      appointmentId: key.value,
    })
      .then((res) => {
        loading.value = false;
        if (res.code === 1204) {
          signupStatus.value = !signupStatus.value; //切换预约状态
          disabled.value = !disabled.value; //切换选择框是否禁选
        } else {
          warning(res.message);
        }
      })
      .catch((err) => {
        loading.value = false;
        warning(err.data.message);
      });
    return;
  }
  loading.value = false;
  warning("请选择预约时间");
};

//cancel取消函数，点击取消预约
let cancel = () => {
  loading.value = true;
  cancelAppointment({
    id: stuId,
  })
    .then((res) => {
      success(res.message);
      loading.value = false;
      signupStatus.value = !signupStatus.value; //切换预约状态
      disabled.value = !disabled.value; //切换选择框是否禁选
      totalTime.value = ""; //选择框内容清空
    })
    .catch((err) => {
      loading.value = false;
      warning(err.data.message);
    });
};

// 查看全部预约时间(调接口)
let listAppointments = () => {
  listAppointment({})
    .then((res) => {
      if(res.code === 1502){
        //暂无可预约时间
        warning(res.message)
        loading.value = false;
        return
      }
      // console.log(res);--------------------------------暂无预约时间可选
      day.push(...res.data);
      day.forEach((item) => {
        item.totalTime = item.beginTime + "~" + item.endTime;
      });
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
      warning(err.data.message);
      // warning("暂无可选时间，请耐心等候");
    });
};

//判断预约是否开放,已开放返回true；未开放返回false；否则返回null
let checkAllappointment = () => {
  checkAppointment({})
    .then((res) => {
      if (res.code === 1514) {
        //预约未开放
        return false;
      }
      if (res.code === 1208) {
        //预约已经开放
        return true;
      }
      return null;
    })
    .catch((err) => {
      warning(err.message);
      loading.value = false;
    });
};

//判断用户是否报名
// getObjValue(signupStatus) = checkEnrolls();

//判断用户是否能预约，已经预约返回true；还没预约返回false
let isAppointeds = () => {
  isAppointed({}).then((res) => {
    return res.data.isAppointed;
  });
};
//判断用户是否报名
let isEnroll = ref(false);

onMounted(() => {
    hide.value = true;

  //未登录的话直接退出
  if (!getCookie("studentToken")) {
    router.push({
      path: "/introduction/banner",
    });
  }

  currentStatus.value = "...";
  //获取当前阶段
  getCurrentStatus({})
    .then((res) => {
      currentStatus.value = res.data.status;
    })
    .catch((err) => {
      warning(err.message);
      loading.value = false;
    });
  //判断用户是否被淘汰
  function checkUserStatusFun() {
    getBriefInfo({})
      .then((res) => {
        //已被淘汰
        if (res.data.userStatus === "淘汰") {
          console.log(55555555555);
          close.value = true;
          closeMessage.value =
            "很抱歉你未能通过，感谢你对cat工作室招新工作的支持。";
          loading.value = false;
          return;
        }
        //未被淘汰
        else {
          iterator.next();
        }
      })
      .catch((err) => {
        //未报名
        warning("您还未报名，请先报名");
        closeMessage.value = "您未报名，请先报名"
        loading.value = false;  
      });
  }

  //检查用户是否报名
  function CheckEnrollFun() {
    console.log(1111111);
    //检查是否报名
    checkEnroll({})
      .then((res) => {
        //已经报名
        if (res.code === 800) {
          iterator.next();
        }
        //未报名
        if (res.code === 700) {
          close.value = true;
          closeMessage.value = "您还未报名，请先进行报名";
          warning("您还未报名，请先进行报名");
          loading.value = false;
          return;
        }
      })
      .catch((err) => {
        warning(err.message);
        loading.value = false;
      });
  }
  //检查阶段
  function GetCurrentStatusFun() {
    console.log(222222);
    //获取当前阶段
    getCurrentStatus({}).then((res) => {
      currentStatus.value = res.data.status;
      //当是1，2前两个阶段的时候，关闭预约功能
      if (res.data.id === 1 || res.data.id === 2) {
        close.value = true;
        closeMessage.value = "目前仍处于报名阶段，您已成功报名，请耐心等候";  
        loading.value = false;

        return;
      } else {
        //处于笔试等阶段，检查预约是否开放
        iterator.next();
      }
    });
  }
  //检查预约是否开放
  function checkAppointmentFun() {
    console.log(333333333);
    // 检查预约是否开放
    checkAppointment({})
      .then((res) => {
        //预约未开放
        if (res.code === 1514) {
          close.value = true;
          closeMessage.value = `当前处于 ${currentStatus.value} 阶段，预约暂未开放，请耐心等候`;
          loading.value = false;
          return;
        }
        //预约已开放
        else {
          iterator.next();
        }
      })
      .catch((err) => {
        warning(err.message);
        loading.value = false;
      });
  }
  listAppointments();
  //检查用户是否预约
  function isAppointedFun() {
    //检测用户是否预约
    console.log(444444);
    isAppointed({})
      .then((res) => {
        //已经预约
        if (res.data.isAppointed === true) {
          close.value = false;
          signupStatus.value = true; //切换状态为已预约
          disabled.value = true; //禁用报名表

          //获取用户预约的时间
          getUserStatus({})
            .then((res) => {
              totalTime.value = res.data.beginTime + "~" + res.data.endTime;
            })
            .catch((err) => {
              warning(err.message + "appointment:293");
             loading.value = false;
            });
          loading.value = false;
        } else {
          //未预约
          iterator.next();
        }
      })
      .catch((err) => {
        warning(err.message);
      });
  }

  function UnSignUpFun() {
    console.log(55555555);
    close.value = false;
    signupStatus.value = false;
    loading.value = false;
  }

  function* gen() {
    yield checkUserStatusFun();
    yield CheckEnrollFun();
    yield GetCurrentStatusFun();
    yield checkAppointmentFun();
    yield isAppointedFun();
    yield UnSignUpFun();
  }
  let iterator = gen();
  iterator.next();
  console.log(375983172985293);
  // loading.value = false;
});
</script>

<style lang="scss" scoped>
.appointment_block {
  padding-top: 70px;
}
#appointment {
  width: 1000px;
  height: 480px;
  margin: 10px auto 0;
  padding: 20px 50px 0 50px;
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
}
.el-result {
  :deep(.icon-success) {
    width: 30px;
    height: auto;
  }
}

.el-page-header {
  padding: 10px 0 30px 0;
  :deep(.el-page-header__content) {
    color: rgba(20, 20, 20, 0.678);
  }
}
.el-divider {
  margin-bottom: 120px;
  :deep(.el-divider__text){
    width: 300px;
    height: 40px;
    background-color: rgb(173, 230, 181);
    line-height: 40px;
    border-radius: 20px;
    color: rgb(255, 255, 255);
    font-weight: 600;
    font-size: 16px;
  }
}
.a_content {
  height: 250px;
}
span {
  color: rgb(216, 216, 216);
}
.el-select {
  display: inline-block;
  margin: 0 20px;
  width: 350px;
}
:deep(.el-input__inner) {
  border: none;
  background-color: transparent;
  border-color: transparent ;
  border-bottom: 1px solid rgb(174, 184, 183);
  border-radius: 0;
  &:focus{
    border-color: rgb(174, 184, 183) !important;
  }
}
.el-result {
  display: inline-block;
  padding: 0;
  width: 50px;
}
.el-result svg {
  width: 30px;
  height: 30px;
}
.a_btn {
  margin-top: 50px;
  .el-button {
    background-color: rgb(239 207 137);
    border: none;
    border-radius: 20px;
    font-weight: 600;
    letter-spacing: 2px;  }
}
.c_btn {
  margin-top: 50px;
}
.tips {
  height: 50px;
  padding: 30px 0px;
  text-align: center;
  .el-result {
    vertical-align: middle;
  }
  span {
    line-height: 30px;
    display: inline-block;
  }
}
.close {
  color:rgba(20, 20, 20, 0.678);
  padding-bottom: 100px;
}
</style>