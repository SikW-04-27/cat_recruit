
<template>

  <div class="block" id="news-content" key="1" v-loading="loading">
<transition-group name="animate__animated animate__bounce" enter-active-class="animate__rubberBand">
    <el-timeline v-if="isFinishLoad" v-show="isHide">
      <el-timeline-item
        :timestamp="item.time"
        placement="top"
        color="#4eb5ff"
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
    <div v-else class="noLoad">{{newsTip}}</div>
 
</transition-group>
 </div>
</template>

<script setup>
import { onMounted, onBeforeMount, reactive, ref } from "vue";

import { getStudentNews } from "../../request/api";
import { getCookie } from "../../utils/myCookie";

let studentNews = reactive([]);

let loading = ref(true);

let isFinishLoad = ref(true);

let newsTip = ref("请先登录！");
// console.dir(WebSocket);

let isHide = ref(false);

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
          }, 1000)
          
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
