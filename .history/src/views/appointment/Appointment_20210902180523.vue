<template>
  <div id="appointment">
    <Tips v-if="tipStatus"> </Tips>
    <!-- 页眉 -->
    <router-link to="/introduction">
      <el-page-header @back="goBack" content="预约面试时间"> </el-page-header>
    </router-link>
    <el-divider>目前预约：{{ data }}</el-divider>

    <!-- 预约 -->
    <div class="a_content" v-if="close">
      <span>请选择预约时间：</span>
      <!-- 预约日期 -->
      <el-select
        v-model="value"
        filterable
        placeholder="请选择预约日期"
        class="el-select"
        :disabled="disabled"
        @change="options_Change($event)"
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
        <span>预约成功，预约时间为：{{ value }}</span>
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
    <!-- 未开放预约的状态 -->
    <!-- <div class="close" v-if="close">暂未开放预约，请耐心等候</div>
  </div> -->
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import "tailwindcss/tailwind.css";
import {
  listAppointment,
  getCurrentStatus,
  getUserStatus,
  updateUserInfo,
  cancelAppointment,
} from "../../request/api.js";
import Select from "../signup/select.vue";
import Tips from "./Tips.vue";
export default {
  name: "Appointment",
  components: {
    Tips,
  },
  setup() {
    // 当前所处时段
    let data = ref("");

    // 预约日期
    let day = reactive([]);
    //控制tips框是否显示
    let tipStatus = ref(false);
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
    //点击返回按钮
    const goBack = () => {
      console.log("go back");
    };
    let warningMessage = ref("");
    //定义提示函数：
    const warning = () => {
      ElMessage.warning({
        message: warningMessage,
        type: "warning",
      });
    };
    //当选择框里面的值改变时：(传递的参数就是选择框里的值)
    let options_Change = ($event) => {
      [...day].filter((item) => {
        if (item.totalTime === $event) {
          key = item.id;
        }
      });
    };

    // 查看全部预约时间(调接口)
    listAppointment({}).then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].totalTime =
          res.data[i].beginTime + " ~ " + res.data[i].endTime;
      }
      day.push(...res.data);
    });

    //查看目前总体招新状态
    getCurrentStatus({}).then((res) => {
      //当目前是报名阶段时，关闭预约功能
      if (res.data.id === 2) {
        close.value = true;
        data.value = "无";
      } else {
        close.value = false;
        data.value = res.data.status;
      }
    });

    //用户已经预约时，显示预约成功的界面
    getUserStatus({}).then((res) => {
      if (res.data.userStatus == "等待") {
        signupStatus.value = false;
      } else {
        signupStatus.value = false;
      }
    });

    //comfirm函数，点击预约时调用
    let comfirm = () => {
      // 当选择框内有内容时
      if (value.value != "") {
        updateUserInfo({
          id: "fTbQodpa",
          appointmentId: key,
        })
          .then((res) => {
            signupStatus.value = !signupStatus.value; //切换预约状态
            disabled.value = !disabled.value; //切换选择框是否禁选
            //预约成功后查看用户的状态
            getUserStatus({}).then((res) => {
              console.log(res);
            });
          })
          .catch((err) => {
            warningMessage = err.data.message;
            warning();
          });
      }
      // 当选择框没内容时
      else {
        warningMessage = "请选择预约时间";
        warning();
      }
    };

    //cancel取消函数，点击取消预约
    let cancel = () => {
      //取消预约
      cancelAppointment({
        id: "fTbQodpa",
      })
        .then((res) => {
          signupStatus.value = !signupStatus.value;
          value.value = "";
          disabled.value = !disabled.value;
          //预约成功后查看用户的状态
          getUserStatus({}).then((res) => {
            console.log(res);
          });
        })
        .catch((err) => {
          warningMessage = err.data.message;
          warning();
        });
    };

    return {
      data,
      day,
      goBack,
      value,
      signupStatus,
      tipStatus,
      comfirm,
      cancel,
      disabled,
      key,
      options_Change,
      warning,
      warningMessage,
      close,
    };
  },
};
</script>

<style lang="scss" scoped>
#appointment {
  width: 80%;
  margin: 40px auto;
  padding: 0 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  text-align: center;
  position: relative;
  background-color: rgba(78, 78, 78, 0.5);
  color: azure;
  border-radius: 10px;
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