<template>
  <transition
    name="animate__animated animate__bounce"
    enter-active-class="animate__headShake"
  >

  <div class="progress_block" v-show="hide">
    <div 
      id="progress"
      >
      <el-page-header @back="goBack" content="面试进度"> </el-page-header>
      <div class="block" v-if="allowing && stuId">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
          >
            <el-alert :title="activity" type="info" :closable="false">
            </el-alert>
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

  </transition>
</template>

<script setup>
import { ref, reactive, defineComponent, onMounted } from "vue";
import { ElMessage, ElLoading } from "element-plus";
import { getBriefInfo } from "../../request/api";
import _ from "lodash";
import { useRouter } from "vue-router";
import { success, warning } from "../../utils/usualUse";
import { getCookie } from "../../utils/myCookie";

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
let hide = ref(false)
//定义提示函数：
onMounted(() => {
  //未登录的话直接退出
  if (!getCookie("studentToken")) {
    console.log(11111111111);
    router.push({
      path: "/introduction/banner",
    });
    loading.value = false;
  }

  getBriefInfo({})
    .then((res) => {
      if (res.code === 1405) {
        warning(res.message);
        allowing.value = false;
<<<<<<< HEAD
        loading.value = false;
        return;
      }
      activities.push(...res.data.recruitmentHistoryInfo);
      loading.value = false;
    })
    .catch((err) => {
      allowing.value = false;
      warning("请先报名");
      loading.value = false;
=======
        loading.close()
        return
      }
      activities.push(...res.data.recruitmentHistoryInfo);
      loading.close()
    })
    .catch((err) => {
      allowing.value = false;
      warning(err.message);
      loading.close()
>>>>>>> 9266541b2ff39079d5e4e0e33baba24bc5bf0a2b
    });
});
</script>

<style scoped lang="scss">
//-----------------------------------------------------------------------------------------
$fontColor: rgba(20, 20, 20, 0.68);
.progress_block {
  padding-top: 40px;
}
#progress {
  width: 1000px;
  height: 480px;
  background-color: transparent;
  margin: 40px auto 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  font-weight: 600;
  border-radius: 20px;
}
.el-page-header {
  padding: 30px;
  color: $fontColor;
}

:deep(.el-page-header__content) {
  color: $fontColor;
}

.block,
.close {
  padding: 0 60px;
  width: 1000px;
  background: rgba(0, 0, 0, 0);
}
.close {
  width: 100%;
  height: 300px;
  padding: 100px;
  color: $fontColor;
  text-align: center;
}
.rank {
  margin: 0px 100px 30px;
  display: inline-block;
  color: $fontColor;
}
.unLogin {
  text-align: center;
  padding: 100px 0;
  color: $fontColor;
}

.el-timeline-item{
  :deep(.el-timeline-item__node){
    background-color: rgb(226 179 93);
    top: 8px;
  }
  .el-alert{
    background-color: rgba(160, 209, 107, 0.95);
    border-radius: 7px;
    :deep(.el-alert__content){
      color: #f9f9f9;
    }
  }
}
</style>