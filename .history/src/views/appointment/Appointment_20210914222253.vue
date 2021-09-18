<template>
  <div class="appointment_block">
    <div
      id="appointment"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, .5)"
    >
      <!-- 页眉 -->
      <el-page-header @back="goBack" content="预约面试时间"> </el-page-header>
      <el-divider>目前预约：{{ currentStatus }}</el-divider>

      <!-- 预约 -->
      <div class="a_content" v-if="!close">
        <span>请选择预约时间：</span>
        <!-- 预约日期 -->
        <el-select
          v-model="totalTime"
          filterable
          placeholder="请选择预约日期"
          class="el-select"
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
} from "../../request/api.js";
import { useRouter } from "vue-router";
import {
  warning,
  getSessionValue,
  getObjValue,
  getCurrentStatusId,
  checkEnrolls,
  CurrentStatus,
} from "../../utils/usualUse.js";
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
let closeMessage = ref("无");
//loading
let loading = ref(true);
//totalTime
let totalTime = ref("");
//currentStatus
let currentStatus = ref("");
// getObjValue(currentStatus) = CurrentStatus();
console.log(currentStatus);
const router = useRouter();

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
      loading.value = false;
      signupStatus.value = !signupStatus.value; //切换预约状态
      disabled.value = !disabled.value; //切换选择框是否禁选
      value.value = ""; //选择框内容清空
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
      day.push(...res.data);
      day.forEach((item) => {
        item.totalTime = item.beginTime + "~" + item.endTime;
      });
    })
    .catch((err) => {
      warning(err.data.message + "Appointment:200");
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

onMounted(() => {
  console.log(121);
  currentStatus.value = "...";

  //检测用户是否已经报名
  if (!checkEnrolls()) {
    console.log("用户未报名");
    //未报名的情况
    close.value = true;
    // getObjValue(closeMessage) = "您还未报名，请先进行报名";
    // warning("您还未报名，请先进行报名");
  }

  // //已报名的情况：

  // //1、查看目前总体招新状态
  // if (grtCurrentStatus() === 1 || grtCurrentStatus() === 2) {
  //   console.log("处于报名状态");
  //   //当是1，2前两个阶段的时候，关闭预约功能
  //   getObjValue(close) = true;
  //   getObjValue(closeMessage) = "目前仍处于报名阶段，您已成功报名，请耐心等候";
  //   return;
  // }

  // //2、目前是笔试等阶段，可以进行预约，检测预约是否开放：
  // if (!checkAllappointment()) {
  //   console.log("预约不能开饭");
  //   getObjValue(close) = true;
  //   getObjValue(
  //     closeMessage
  //   ) = `当前处于 ${currentStatus} 阶段，预约暂未开放，请耐心等候`;
  //   return;
  // }

  // //预约已经开放的情况：当用户已经预约：
  // if (isAppointeds()) {
  //   console.log("用户已经预约");
  //   getObjValue(close) = false;
  //   getObjValue(disabled).value = true; //禁用报名表
  //   getObjValue(signupStatus) = true;
  //   //获取用户预约的时间
  //   getUserStatus({})
  //     .then((res) => {
  //       totalTime = res.data.beginTime + "~" + res.data.endTime;
  //     })
  //     .catch((err) => {
  //       warning(err.message + "appointment:293");
  //     });
  //   getObjValue(closeMessage) = `您已成功预约，预约时间段为${totalTime}`;
  //   return;
  // }

  // //当预约开放，用户未预约的情况：
  // if (!isAppointed()) {
  //   console.log("用户未预约");
  //   getObjValue(close) = false;
  //   getObjValue(signupStatus) = false;
  //   //获取所有预约时间
  //   listAppointments();
  // }

  loading.value = false;
});

// return {
//   goBack,
//   close,
//   day,
//   signupStatus,
//   disabled,
//   key,
//   stuId,
// };
</script>

<style lang="scss" scoped>
.appointment_block {
  padding-top: 70px;
}
#appointment {
  width: 1000px;
  height: 480px;
  margin: 60px auto 0;
  padding: 0 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  text-align: center;
  position: relative;
  background-color: rgba(78, 78, 78, 0.5);
  color: azure;
}
.el-result {
  :deep .icon-success {
    width: 30px;
    height: auto;
  }
}

.el-page-header {
  padding: 30px 0 0 0;
  :deep .el-page-header__content {
    color: azure;
  }
}
.el-divider {
  margin-bottom: 80px;
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
.el-input__inner {
  text-align: center;
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
.el-page-header__left {
  color: rgb(216, 216, 216);
}
:deep.el-page-header__content {
  color: rgb(216, 216, 216);
}
.a_btn {
  margin-top: 50px;
  .el-button {
    background-color: #2f86b6;
    border: #ffffff00;
    border-radius: 5px;
  }
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
  padding-bottom: 100px;
}
</style>