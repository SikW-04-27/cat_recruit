<template>
  <div id="progress">
    <router-link to="/introduction">
      <el-page-header @back="goBack" content="面试进度"> </el-page-header>
    </router-link>
    <div class="block" v-if="allowing">
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
          <el-alert :title="activity.status" type="info" :closable="false">
          </el-alert>
          <!-- {{ activity.content }} -->
        </el-timeline-item>
      </el-timeline>
    </div>
    <!-- 当无法查询时的页面 -->
    <div class="close" v-if="!allowing">{{ closeMessage }}</div>
  </div>
</template>

<script>
import { ref, reactive, defineComponent } from "vue";
import { getUserStatus, getAllStatus } from "../../request/api";
import _ from "lodash";
export default defineComponent({
  name: "Progress",
  setup() {
    //点击返回按钮
    const goBack = () => {
      console.log("go back");
    };
    //检测用户是否能查询
    let allowing = ref(true);
    let closeMessage = ref("无法加载");
    let stuId =window.localStorage.getItem("user_register");
    let activities = reactive([]);

    //获取所有阶段
    getAllStatus({})
      .then((res) => {
        console.log(res);
        activities.push(...res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //调用查询接口
    getUserStatus({})
      .then((res) => {
        console.log(res);
        console.log(activities[0]);
        //处理用户经历过的阶段
        for (let i = 0; i < activities.length; i++) {
          if (activities[i].status === res.data.recruitmentStatus) {
            let n = i;
            console.log(n);
          }
        }
        _.dropRight(...activities, 2);
        console.log(activities);
      })
      .catch((err) => {
        console.log(err);
        allowing.value = false;
        if (err.data.message) {
          closeMessage.value = err.data.message;
        }
      });

    return {
      goBack,
      activities,
      allowing,
      closeMessage,
      stuId,
    };
  },
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
</style>