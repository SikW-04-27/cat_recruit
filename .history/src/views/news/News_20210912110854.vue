
<template>
  <div class="block" id="news-content">
    <el-timeline v-loading="loading" v-if="isFinishLoad">
      <el-timeline-item
        :timestamp="item.time"
        placement="top"
        color="#0bbd87"
        v-for="(item, index) of studentNews"
        :key="index"
      >
        <el-card class="active">
          <h4>{{ item.content }}</h4>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div v-else class="noLoad">{{ newsTip }}</div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, reactive, ref } from "vue";

import { getStudentNews } from "../../request/api";
import { getCookie } from "../../utils/myCookie";
//引入修改时间戳
import "../../../../node_modules/dayjs/dayjs.min.js";
import {openSocket} from '../../utils/websocket'

let studentNews = reactive([]);

let loading = ref(true);

let isFinishLoad = ref(true);

let newsTip = ref("请先登录！");
// console.dir(WebSocket);


onBeforeMount(() => {
  const studentToken = getCookie("studentToken");
  console.log(studentToken);
  if (studentToken) {
    getStudentNews()
      .then((result) => {
        loading.value = false;
        console.log(result);
        if (result.code === 1801) {
          console.log(result.data);
          studentNews.push(...result.data);
          // studentNews = result.data;
          studentNews.reverse();
          console.log(studentNews);
        } else {
          newsTip.value = result.message;
          isFinishLoad.value = false;
        }
      })
      .catch((e) => {
        // console.log(e);
        // isFinishLoad.value = false;
      });
  } else {
    isFinishLoad.value = false;
  }
});

onMounted(() => {
  openSocket().onmessage = function (msg) {
    console.log(msg);
    let msgDay = JSON.parse(msg.data);
    msgDay.time = dayjs(msgDay.time).format("YYYY-MM-DD HH:mm:ss");
    msgDay.id = 1;
    studentNews.unshift(msgDay);
  };
});
</script>

<style lang="scss" scoped>
#news-content {
  position: relative;
  top: 120px;
  margin: 0 auto;
  width: 70%;
}

.active {
  border: 1px solid red;
}

.noLoad {
  color: #fff;
  font-weight: 700;
  font-size: 20px;
}
</style>
