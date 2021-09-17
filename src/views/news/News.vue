
<template>
  <div class="block" id="news-content" key="1" v-loading="loading">
    <transition-group
      name="animate__animated animate__bounce"
      enter-active-class="animate__rubberBand"
    >
      <!-- <el-timeline v-if="isFinishLoad" v-show="isHide">
      <el-timeline-item
        :timestamp="item.time"
        placement="top"
        color="#4eb5ff"
        v-for="(item, index) of studentNews"
        :key="index"
      >
        <el-card class="active">
          <h4>{{ item.content }}</h4>
        </el-card>
      </el-timeline-item>
    </el-timeline> -->
      <ul id="news-ul" v-if="isFinishLoad" v-show="isHide">
        <li id="news-li" v-for="(item, index) of studentNews" :key="index">
          <div class="news-word">{{ item.content }}</div>
        </li>
      </ul>
      <div v-else class="noLoad">{{ newsTip }}</div>
    </transition-group>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, reactive, ref } from "vue";

import { getStudentNews } from "../../request/api";
import { getCookie } from "../../utils/myCookie";
//引入修改时间戳
import "../../../node_modules/dayjs/dayjs.min.js";
import { openSocket } from "../../utils/websocket";

let studentNews = reactive([]);

let loading = ref(true);

let isFinishLoad = ref(true);

let newsTip = ref("请先登录！");
// console.dir(WebSocket);

let isHide = ref(false);
//实时更新数据
// let openSocket = function () {
//   var socket;
//   let token = getCookie("studentToken");
//   var socketUrl = `http://112.74.33.254:2358/ws/message/${token}`;
//   socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
//   if (socket != null) {
//     socket.close();
//     socket = null;
//   }
//   socket = new WebSocket(socketUrl);
//   socket.onopen = function () {
//     console.log("websocket已打开");
//   };
//   socket.onmessage = function (msg) {
//     console.log(msg);
//     let msgDay = JSON.parse(msg.data);
//     msgDay.time = dayjs(msgDay.time).format("YYYY-MM-DD HH:mm:ss");
//     msgDay.id = 1;
//     studentNews.unshift(msgDay);
//   };
//   socket.onclose = function (e) {
//     console.log(
//       "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
//     );
//     openSocket();
//   };
// };

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
          // isFinishLoad.value = true;
          // studentNews = result.data;
          studentNews.reverse();
          console.log(studentNews);
          setTimeout(() => {
            isHide.value = true;
          }, 1000);
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
  background-color: #fff;

  .el-timeline {
    background-color: #fff;

    .el-timeline-item {
      // float: right;
      // margin: 10px 10px;
      // padding: 20px;
      width: 400px;
      background-color: red;
    }
  }

#news-ul {
  position: relative;

#news-li {

  position: absolute;
  margin: 10px;
  width: 200px;
  height: 200px;
&:nth-child(2n) {
  right: 10px;
  }
   .news-word {
    background-color: red;
  }
}
  

}

 
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
