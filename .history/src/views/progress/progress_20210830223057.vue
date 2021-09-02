<template>
  <div id="progress">
    <router-link to="/introduction">
      <el-page-header @back="goBack" content="面试进度"> </el-page-header>
    </router-link>
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
          <el-alert title="不可关闭的alert" type="info" :closable="false">
          </el-alert>
          <!-- {{ activity.content }} -->
        </el-timeline-item>
      </el-timeline>
    </div>
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
    let allowing = ref(true)
    let activities = reactive([
      {
        content: "支持使用图标",
        timestamp: "2018-04-12 20:46", //页面下会显示时间
        size: "large",
        type: "primary",
        icon: "el-icon-more", //图标
      },
    ]);
    getUserStatus({ id: "f6a4d743bdce40e699a6cdbb1fd1f84f" }).then((res) => {
      console.log(res);
    });

    return {
      goBack,
      activities,
    };
  },
});
</script>

<style scoped lang="scss">
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