<template>
  <div id="progress">
    <router-link to="/introduction">
      <el-page-header @back="goBack" content="面试进度"> </el-page-header>
    </router-link>
    <div class="block" v-if="allowing && stuId">
      <el-timeline>
        <!-- <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        > -->
        <el-timeline-item v-for="(activity, index) in activities" :key="index">
          <el-alert :title="activity" type="info" :closable="false"> </el-alert>
          <!-- {{ activity.content }} -->
        </el-timeline-item>
      </el-timeline>
    </div>
    <!-- 当无法查询时的页面 -->
    <div class="close" v-if="!allowing && stuId">{{ closeMessage }}</div>
  </div>
  <!-- 未登陆时 -->
  <div class="unLogin" v-if="!stuId">
    <span>您还未登录，请先登录</span>
  </div>
</template>

<script setup>
import { ref, reactive, defineComponent, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { getBriefInfo } from "../../request/api";
import _ from "lodash";
//点击返回按钮
const goBack = () => {
  console.log("go back");
};
//检测用户是否能查询
let allowing = ref(true);
let closeMessage = ref("查询进度失败，请先报名");
let stuId = window.localStorage.getItem("userId");
let activities = reactive([]);
let warningMessage =""
//定义提示函数：
const warning = () => {
  ElMessage.warning({
    message: warningMessage,
    type: "warning",
  });
};
onMounted(() => {
  getBriefInfo({})
    .then((res) => {
      activities.push(...res.data.recruitmentHistoryInfo);
    })
    .catch((err) => {
      allowing.value = false;
      warningMessage = err.data.message;
      warning();
    });
});
</script>

<style scoped lang="scss">
#progress {
  width: 80%;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  // background-color: #fff;
}
.el-page-header {
  padding: 30px;
  color: #727272;
}
.block,
.close {
  padding: 0 60px;
}
.close {
  width: 100%;
  height: 300px;
  padding: 100px;
  color: aliceblue;
  text-align: center;
}
.rank {
  margin: 0px 100px 30px;
  display: inline-block;
  color: #606266;
}
.unLogin {
  text-align: center;
  padding: 100px 0;
  color: #fff;
}
</style>