<template>
  <div id="appointment">
    <Tips v-if="tipStatus"></Tips>
    <!-- 页眉 -->
    <el-page-header @back="goBack" content="预约面试时间"> </el-page-header>
    <el-divider>目前预约：{{ data[0] }}</el-divider>

    <!-- 预约 -->
    <div class="a_content">
      <span>请选择预约时间：</span>
      <!-- 预约日期 -->
      <el-select
        v-model="value"
        filterable
        placeholder="请选择预约日期"
        class="el-select"
        disabled:false
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
        <!-- <el-col :sm="12" :lg="6"></el-col> -->
        <el-result icon="success" class="float-left"></el-result>
        <span class="float-left">预约成功，预约时间为：{{ value }}</span>
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
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import "tailwindcss/tailwind.css";
import {
  listAppointment,
  // saveNewAppointmentInfo,
  // deleteAppointmentInfo,
  // deleteAllAppointmentInfo,
} from "../../request/api.js";
import Select from "../signup/select.vue";
import Tips from "./Tips.vue";
export default {
  name: "Appointment",
  components: {
    Tips,
  },
  mounted() {
    let el_select = document.getElementsByClassName("el-select");
    console.log(el_select[0]);
  },
  setup() {
    // 当前所处时段
    let data = ref([
      "一轮面试",
      "二轮面试",
      "一轮考核答辩",
      "二轮考核答辩",
      "最终答辩",
    ]);

    // 预约日期
    let day = reactive([]);
    //控制tips框是否显示
    let tipStatus = ref(false);
    // 两个选择框的值
    let value = ref("");
    //判断是否已预约
    let signupStatus = ref(false);
    //点击返回按钮
    const goBack = () => {
      console.log("go back");
    };

    // 查看全部预约时间
    listAppointment({}).then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].totalTime =
          res.data[i].beginTime + " ~ " + res.data[i].endTime;
      }
      day.push(...res.data);
    });

    //comfirm函数，点击预约时调用
    let comfirm = () => {
      // 当两个选择框都选中时
      if (value.value != "") {
        signupStatus.value = !signupStatus.value;
        // console.log(el_select[0]);
        // el_select[0].disabled = true;
      }
      // 当两个选择框不全选中时
      else {
        tipStatus.value = !tipStatus.value;
        //定时器：两秒后tips框消失
        setTimeout(function () {
          tipStatus.value = false;
        }, 2000);
      }
    };

    //cancel取消函数，点击取消预约
    let cancel = () => {
      signupStatus.value = !signupStatus.value;
      value.value = "";
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
    };
  },
};
</script>

<style lang="scss">
#appointment {
  width: 80%;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  text-align: center;
  position: relative;
}
.el-page-header {
  /* padding: 30px; */
}
.el-divider {
  margin-bottom: 80px;
}
.a_content {
  height: 200px;
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
.el-page-header__content {
  color: rgb(216, 216, 216);
}
.a_btn {
  margin-top: 50px;
}
.c_btn {
  margin-top: 50px;
}
.tips {
  height: 50px;
  padding: 30px 20px 0px 230px;
}
</style>