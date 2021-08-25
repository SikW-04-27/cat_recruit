<template>
  <div id="progress">
        <router-link to="/introduction">

    <el-page-header @back="goBack" content="面试进度"> </el-page-header>
    <span class="rank">当前排名：{{ rank }}</span>
    <div class="block">
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
          <el-alert title="不可关闭的 alert" type="success" :closable="false">
          </el-alert>
          <!-- {{ activity.content }} -->
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { ref, reactive, defineComponent } from "vue";
export default defineComponent({
  name: "Progress",
  setup() {
    //点击返回按钮
    const goBack = () => {
      console.log("go back");
    };
    let activities = reactive([
      {
        content: "支持使用图标",
        timestamp: "2018-04-12 20:46",
        size: "large",
        type: "primary",
        icon: "el-icon-more",
      },
      {
        content: "支持自定义颜色",
        timestamp: "2018-04-03 20:46",
        color: "#0bbd87",
      },
      {
        content: "支持自定义尺寸",
        timestamp: "2018-04-03 20:46",
        size: "large",
      },
      {
        content: "默认样式的节点",
        timestamp: "2018-04-03 20:46",
      },
    ]);

    return {
      goBack,
      activities,
      rank: ref("1"),
    };
  },
});
</script>

<style>
#progress {
  width: 80%;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-page-header {
  padding: 30px;
  color: #727272;
}
.block {
  padding: 0 60px;
}
.rank {
  margin: 0px 100px 30px;
  display: inline-block;
  color: #606266;
}
</style>