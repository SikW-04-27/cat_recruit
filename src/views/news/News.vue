
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
      <div class="news-outline">消息中心</div>
      <ul id="news-ul" v-if="isFinishLoad" v-show="isHide">
        <li
          id="news-li"
          v-for="(item, index) of studentNews"
          :key="index"
          :style="{ backgroundColor: colorOptions[index%colorOptions.length] }"
        >
          <div
            class="li-line"
            :style="{ backgroundColor: colorOptions[index%colorOptions.length] }"
          ></div>
          <i :style="{ backgroundColor: colorOptions[index%colorOptions.length] }">{{index + 1}}</i>
          <span class="news-time">{{ item.time }}</span>
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
import {openSocket} from '../../utils/websocket'
import { useRouter } from "vue-router";


let studentNews = reactive([]);

let loading = ref(true);

let isFinishLoad = ref(true);

let newsTip = ref("请先登录！");
// console.dir(WebSocket);

let isHide = ref(false);

let colorOptions = reactive([
  "#0fb1a0",
  "#d08aba",
  "#f5a44c",
  "#e0529a",
  "#787cba",
  "#45afe5",
  "#bad874",
]);
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
    //未登录的话直接退出
  if (!getCookie("studentToken")) {
    console.log(11111111111);
    router.push({
      path: "/introduction/banner",
    });
  }



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
$distance: -50px;

#news-content {
  position: relative;
  top: 120px;
  margin: 0 auto;
  width: 70%;
  // background-color: #fff;

  .news-outline {
    position: relative;
    top: 20px;
    left: 42.5%;
    width: 110px;
    height: 32px;
    color: #fff;
    font-size: 13px;
    letter-spacing: 1px;
    text-align: center;
    line-height: 32px;
    border-radius: 20px;
    background-color: red;
  }

  #news-ul {
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    #news-li {
      position: relative;
      margin: 10px;
      padding: 10px 20px;
      width: 300px;
      height: 100px;
      border-radius: 12px;
      opacity: 0.7;
    color: #fff;

      .li-line {
        position: absolute;

        width: 20px;
        height: 130px;
        border-radius: 20px;
      }

      i {
        position: absolute;
        width: 25px;
        height: 25px;
        top: 40px;
        color: 12px;
        text-align: center;
        line-height: 25px;
        border-radius: 59%;
        background-color: red;
      }

      .news-time {
        font-size: 14px;
      }

      &:nth-child(2n + 1) {
        .li-line {
          right: -135px;
        }

        i {
          right: $distance;
        }
      }

      &:nth-child(2n) {
        left: 550px;

        .li-line {
          left: -135px;
        }
        i {
          left: $distance;
        }
      }
      .news-word {
        // background-color: red;
        width: 200px;
      }
    }
  }
}

.active {
  border: 1px solid red;
}

.noLoad {
  color: rgb(175 149 112);
  font-weight: 700;
  font-size: 20px;
}
</style>
