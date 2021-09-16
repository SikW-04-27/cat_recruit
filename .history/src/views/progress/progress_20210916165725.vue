<template>
  <div class="progress_block">
    <div id="progress" :v-loading="loading">
      <el-page-header @back="goBack" content="面试进度"> </el-page-header>
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
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
          >
            <el-alert :title="activity" type="info" :closable="false">
            </el-alert>
            <!-- {{ activity.content }} -->
          </el-timeline-item>
        </el-timeline>
      </div>
      <!-- 当无法查询时的页面 -->
      <div class="close" v-if="!allowing && stuId">{{ closeMessage }}</div>

      <!-- 未登陆时 -->
      <div class="unLogin" v-if="!stuId">
        <span>您还未登录，请先登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineComponent, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { getBriefInfo } from "../../request/api";
import _ from "lodash";
import { useRouter } from "vue-router";
import { success, warning } from "../../utils/usualUse";
const router = useRouter();
//点击返回按钮
let goBack = () => {
  router.push({
    path: "/introduction",
  });
};
//检测用户是否能查询
let allowing = ref(true);
let closeMessage = ref("查询进度失败，请先报名");
let stuId = window.sessionStorage.getItem("userId");
let activities = reactive([]);
let loading = ref(true);
//定义提示函数：
onMounted(() => {
  getBriefInfo({})
    .then(({ res }) => {
      activities.push(...res.data.recruitmentHistoryInfo);
    })
    .catch(err => {
      log
      allowing.value = false;
      warning(err.message + "1232131312" );
    });
  loading.value = false;
});
</script>

<style scoped lang="scss">
//-----------------------------------------------------------------------------------------
.progress_block {
  padding-top: 40px;
}
#progress {
  width: 1000px;
  height: 480px;
  background-color: rgba(78, 78, 78, 0.5);
  margin: 60px auto 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  // background-color: #fff;
}
.el-page-header {
  padding: 30px;
  color: #ffffff;
}

:deep(.el-page-header__content) {
  color: #fff;
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