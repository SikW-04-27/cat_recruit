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
      >
        <el-option
          v-for="item in day"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <!-- 预约具体时间 -->
      <el-select
        v-model="value1"
        filterable
        placeholder="请选择预约时间"
        class="el-select"
      >
        <el-option
          v-for="item in time"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <!-- （提示）已预约 -->
      <div class="tips text-center" v-if="signupStatus">
        <!-- <el-col :sm="12" :lg="6"></el-col> -->
        <el-result icon="success" class="float-left"></el-result>
        <span class="float-left">预约成功，预约时间为：</span>
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
import Select from "../signup/select.vue";
import Tips from "./Tips.vue";
export default {
  name: "Appointment",
  components: {
    Tips,
  },
  setup() {
    let el_select = document.getElementsByClassName("el-select");
    console.log(el_select);
    let data = ref([
      "一轮面试",
      "二轮面试",
      "一轮考核答辩",
      "二轮考核答辩",
      "最终答辩",
    ]);
    let day = ref([
      {
        value: "选项1",
        label: "2021-8-12",
      },
      {
        value: "选项2",
        label: "2021-8-13",
      },
    ]);
    let time = ref([
      {
        value: "选项1",
        label: "12:00-12:30",
      },
      {
        value: "选项2",
        label: "12:30-13:00",
      },
    ]);
    //tip
    let tipStatus = ref(false);
    // 两个选择框的值
    let value = ref("");
    let value1 = ref("");

    //点击返回按钮
    const goBack = () => {
      console.log("go back");
    };

    //判断是否已预约
    let signupStatus = ref(false);
    el_select.disabled = true;
    console.log(el_select);

    //comfirm函数，点击预约时调用
    let comfirm = () => {
      if (value.value != "" && value1.value != "") {
        signupStatus.value = !signupStatus.value;
        console.log("这是两个都不为空的情景");
      } else {
        tipStatus.value = !tipStatus.value;
        //定时器：两秒后tips框消失
        setTimeout(function () {
          tipStatus.value = false;
        }, 2000);
        console.log("这是起码有一个为空的情景");
      }
    };

    //cancel取消函数，点击取消预约
    let cancel = () => {
      signupStatus.value = !signupStatus.value;
      value.value = value1.value = "";
    };

    return {
      data,
      day,
      time,
      goBack,
      value,
      value1,
      signupStatus,
      tipStatus,
      comfirm,
      cancel,
    };
  },
};
</script>

<style>
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
.el-select {
  display: inline-block;
  margin: 0 20px;
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
  color: rgb(121, 121, 121);
}
.a_btn {
  margin-top: 50px;
}
.c_btn {
  margin-top: 50px;
}
.tips {
  height: 50px;
  padding: 30px 20px 0px 300px;
}
</style>