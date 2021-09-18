<template>
  <div class="appointment_block">
    <div
      id="appointment"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, .5)"
    >
      <!-- 页眉 -->
      <el-page-header @back="goBack" content="预约面试时间"> </el-page-header>
      <el-divider>目前预约：{{ data }}</el-divider>

      <!-- 预约 -->
      <div class="a_content" v-if="!close && stuId">
        <span>请选择预约时间：</span>
        <!-- 预约日期 -->
        <el-select
          v-model="value"
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
          <span>您已预约成功，预约时间为：{{ value }}</span>
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
      <div class="close" v-if="close && stuId">{{ closeMessage }}</div>

      <!-- 用户未登录 -->
      <div class="unLogin" v-if="!stuId">
        <span>您还未登录，请先登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElLoading } from "element-plus";
import "tailwindcss/tailwind.css";
import {
  listAppointment,
  getCurrentStatus,
  getUserStatus,
  updateUserInfo,
  cancelAppointment,
  checkAppointment,
  isAppointed,
} from "../../request/api.js";
import Select from "../signup/select.vue";
import { useRouter } from "vue-router";
// 当前所处时段
let data = ref("...");

// 预约日期
let day = reactive([]);
// 选择框的值
let value = ref("");
//判断是否已预约
let signupStatus = ref(false);
// 控制选择框禁止状态
let disabled = ref(false);
//设置选项的key值（即时间的id值）
let key = ref();
//判断预约是否能开放
let close = ref(true);
//存储用户id
let stuId = window.sessionStorage.getItem("userId");
//closeMessage
let closeMessage = ref(" ");
//loading
let loading = ref(true);

let warningMessage = ref("");
const router = useRouter();

//点击返回按钮
let goBack = () => {
  router.push({
    path: "/introduction",
  });
};

//定义提示函数：
const warning = (message) => {
  ElMessage.warning(message || warningMessage.value);
};

//当选择框里面的值改变时：(传递的参数就是选择框里的值)
let optionsChange = ($event) => {
  [...day].filter((item) => {
    if (item.totalTime === $event) {
      key.value = item.id;
    }
  });
};

//comfirm函数，点击预约时调用
let comfirm = () => {
  loading.value = true;
  if (value.value != "") {
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
          warningMessage.value = res.message;
          warning();
        }
      })
      .catch((err) => {
        loading.value = false;
        warningMessage.value = err.data.message;
        warning();
      });
  } else {
    loading.value = false;
    warningMessage.value = "请选择预约时间";
    warning();
  }
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
      warningMessage = err.data.message;
      warning();
    });
};

// 查看全部预约时间(调接口)
let check_Allappointment = () => {
  listAppointment({})
    .then((res) => {
      //当目前是报名阶段时，关闭预约功能
      console.log(res);
      if (res.data.id === 2 || res.data.id === 1) {
        close.value = true;
        console.log(close);
        data.value = "无";
        return;
      } else {
        // haorui 改
        // data.value = res.data.status;
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].totalTime =
            res.data[i].beginTime + " ~ " + res.data[i].endTime;
        }
        day.push(...res.data);
      }
    })

    .catch((err) => {
      warningMessage.value = err.data.message;
      warning();
    });
};

//检测用户是否报名

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

//判断用户是否能预约，已经预约返回true；还没预约返回false
let isAppointed = () => {
  isAppointed({}).then(res=>{
    if(res.data.)
  })
};

let check_Appointmenton = () => {
  checkAppointment({})
    .then((res) => {
      if (res.code === 1514) {
        //未开放预约：
        close.value = true;
        closeMessage.value = res.message;
        warningMessage.value = res.message;
        warning();
      } else if (res.code === 1208) {
        //已经开放预约
        close.value = false;
        getUserStatus({})
          .then((res) => {
            // data.value = res.data[0].recruitmentStatus;
            if (res.data.beginTime) {
              //用户已经预约的情况
              signupStatus.value = true;
              disabled.value = true;
              value.value = res.data.beginTime + "~" + res.data.endTime;
            } else {
              signupStatus.value = false;
            }
          })
          .catch((err) => {
            warningMessage.value = err.data.message;
            warning();
          });

        check_Allappointment();
      }
    })
    .catch((err) => {
      warningMessage.value = err.data.message;
      warning();
    });
};

onMounted(() => {
  data.value = "...";
  //查看目前总体招新状态
  getCurrentStatus({})
    .then((res) => {
      //当目前是报名阶段时，关闭预约功能
      if (res.data.id === 2 || res.data.id === 1) {
        close.value = true;
        closeMessage.value = "当前仍处于报名阶段，请先报名后耐心等候";
        data.value = res.data.status;
        return;
      } else {
        data.value = res.data.status;
      }

      //非报名阶段，全部用户可以预约
      //获取预约是否开放
      check_Appointmenton();
      // if (res.code === 1208) {
      //   //已经开放预约
      //   close.value = false;
      //   //当已经开放，但用户已经预约时，显示已预约成功的界面
      //   getUserStatus({})
      //     .then((res) => {
      //       if (res.data.beginTime) {
      //         //已经预约的情况
      //         signupStatus.value = true;
      //         disabled.value = true;
      //         value.value = res.data.beginTime + "~" + res.data.endTime;
      //         return;
      //       } else {
      //         signupStatus.value = false;
      //       }
      //     })
      //     .catch((err) => {
      //       warningMessage = err.data.message;
      //       warning();
      //     });

      //   // 查看全部预约时间(调接口)
      //   listAppointment({})
      //     .then((res) => {
      //       for (var i = 0; i < res.data.length; i++) {
      //         res.data[i].totalTime =
      //           res.data[i].beginTime + " ~ " + res.data[i].endTime;
      //       }
      //       day.push(...res.data);
      //     })
      //     .catch((err) => {
      //       warningMessage = err.data.message;
      //       warning();
      //     });
      // } else {
      //   data.value = res.data.status;
      //   check_Appointmenton();
      // }
    })
    .catch((err) => {
      warningMessage.value = err.data.message;
      warning();
    });

  loading.value = false;
});
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
.unLogin {
  padding: 100px 0;
}
</style>