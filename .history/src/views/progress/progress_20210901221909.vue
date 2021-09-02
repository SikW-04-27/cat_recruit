<template>
  <div id="progress">
    <router-link to="/introduction">
      <el-page-header @back="goBack" content="面试进度"> </el-page-header>
    </router-link>
    <div class="block" v-if="allowing">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        >
          <el-alert :title="activity.content" type="info" :closable="false">
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
import { getUserStatus } from "../../request/api";
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
    let activities = reactive([
      {
        content: "成功报名",
        timestamp: "2018-04-12", //页面下会显示时间
        size: "large",
        type: "success",
        icon: "el-icon-success", //图标
        color: "green",
      },
      {
        content: "一轮面试通过",
        timestamp: "2018-04-12", //页面下会显示时间
        size: "large",
        type: "warning",
        icon: "el-icon-success", //图标
        color: "green",
      },
      {
        content: "二轮面试通过",
        timestamp: "2018-04-12", //页面下会显示时间
        size: "large",
        type: "primary",
        icon: "el-icon-success", //图标
        color: "green",
      },
      {
        content: "等待一轮考核答辩",
        timestamp: "2018-04-12", //页面下会显示时间
        size: "large",
        type: "primary",
        icon: "el-icon-more", //图标
        color: "grey",
      },
    ]);
    let messages = reactive([
      { id: 0, status: "报名成功" },
      { id: 1, status: "通过一轮面试" },
      { id: 2, status: "通过二轮面试" },
      { id: 3, status: "通过一轮考核" },
      { id: 4, status: "通过二轮考核" },
    ]);
    //调用查询接口
    getUserStatus({ id: "f6a4d743bdce40e699a6cdbb1fd1f84f" })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        allowing.value = false;
        closeMessage.value = err.data.message;
      });

    return {
      goBack,
      activities,
      allowing,
      closeMessage,
      messages,
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