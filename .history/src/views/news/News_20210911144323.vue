
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
          <!-- <p>你无了。。。</p> -->
        </el-card>
      </el-timeline-item>
      <!-- <el-timeline-item timestamp="2018/4/12" placement="top" color="#0bbd87">
        <el-card>
          <h4>面试结果</h4>
          <p>你无了。。。</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <h4>面试</h4>
          <p>林。。 将于 2018/4/3 20:46 面试</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>报名</h4>
          <p>报名成功</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>报名</h4>
          <p>报名成功</p>
        </el-card>
      </el-timeline-item> -->
    </el-timeline>
    <div v-else class="noLoad">{{ newsTip }}</div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, reactive, ref } from "vue";

import { getStudentNews } from "../../request/api";
import { getCookie } from "../../utils/myCookie";
//引入修改时间戳
import '../../../../node_modules/dayjs/dayjs.min.js'

let studentNews = reactive([]);

let loading = ref(true);

let isFinishLoad = ref(true);

let newsTip = ref("请先登录！");
// console.dir(WebSocket);

//实时更新数据
let openSocket = function () {
  var socket;
  let token = getCookie("studentToken");
  var socketUrl = `http://112.74.33.254:2358/ws/message/${token}`;
  socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
  if (socket != null) {
    socket.close();
    socket = null;
  }
  socket = new WebSocket(socketUrl);
  socket.onopen = function () {
    console.log("websocket已打开");
  };
  socket.onmessage = function (msg) {
    console.log(msg);
    let msgDay JSON.parse(msg.data)
    studentNews.push();
    console.log(studentNews);
    // studentNews = result.data;
    studentNews.reverse();

    // let mesData = JSON.parse(msg.data);
    // tableData.splice(0, tableData.length);
    // tableData.push(...mesData);
  };
  socket.onclose = function (e) {
    console.log(
      "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
    );
    openSocket();
  };
};

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
  openSocket();
});
/*

const token = localStorage.getItem("token");
let socketUrl = `http://112.74.33.254:2358/ws/"+${token}`;
socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");

// if (socket != null) {
//   socket.close();
//   socket = null;
// }

let socket = new WebSocket(socketUrl);

socket.onopen = function() {
console.log('socket打开了');
}

socket.onmessage = function() {
  
}

socket.onclose = function() {

}

socket.onerror = function() {

}

*/
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
