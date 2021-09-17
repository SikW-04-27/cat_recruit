<template>
  <div class="nav">
      <div class="logo">
          <img src="../../src/assets/img/catlogo.png" alt="">
      </div>
      <ul class="login_after" v-if="isLoad">
          <li><router-link to="/Form">报名表</router-link></li>
          <li><router-link to="/appointment">预约面试</router-link></li>
          <li><router-link to="/signIn">到场签到</router-link></li>
          <li><router-link to="/progress">查看进度</router-link></li>
          <li><router-link to="/news"><el-badge :is-dot="isDot">消息中心</el-badge></router-link></li>
          <li  @click="unLoad" v-if="isLoad"><router-link to="/introduction">退出登录</router-link></li>
      </ul>
      <ul class="login_before" v-else>
          <!-- <li><router-link to="/introduction/banner">工作室介绍</router-link></li>
          <span class="line">|</span> -->
          <li ><router-link to="/loginregister/login">登录 / 注册</router-link></li>
      </ul>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  onUpdated,
  onBeforeUpdate,
  onUnmounted,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getCookie, removeCookie } from "../utils/myCookie";
import { openSocket } from "../utils/websocket";
import {
  getCurrentStatus,
  getSubmit,
  getBriefInfo,
  getUserStatus,
} from "../request/api";

export default {
  setup() {
    let activeIndex = ref("1");
    let activeIndex2 = ref("1");
    let loginStatus = ref("");
    let userName = ref("");

    let isLoad = ref(true);

    const store = useStore();

    const router = useRouter();

    let isDot = ref(false);

    onMounted(() => {
      loginStatus.value = getCookie("studentToken") ? 1 : 0;
      if (loginStatus.value) {
        userName.value = sessionStorage.getItem("userName");
        isLoad.value = true;
      } else {
        isLoad.value = false;
      }
      console.dir(store.state.loginStatus);

      //获取当前招新状态
      getCurrentStatus({})
        .then((res) => {
          window.sessionStorage.setItem(
            "CurrentStatus",
            JSON.stringify(res.data)
          );
        })
        .catch((err) => {});
      //判断用户是否报名
      if (getCookie("studentToken")) {
        getSubmit({ uuid: window.sessionStorage.getItem("userId") })
          .then((res) => {
            if (res.data) {
              //已报名的状态
              window.sessionStorage.setItem("hasSignUp", true);
            } else {
              //未报名
              window.sessionStorage.setItem("hasSignUp", false);
            }
          })
          .catch((err) => {});
      }

      //websocket更新小红点
      openSocket().onmessage = function () {
        isDot.value = true;
        console.log("小红点");
      };
    });

    watch(
      () => store.state.loginStatus,
      () => {
        console.log(store.state.loginStatus, "改变了111111111");
        loginStatus.value =
          store.state.loginStatus || getCookie("studentToken") ? 1 : 0;
        if (loginStatus.value) {
          userName.value = sessionStorage.getItem("userName");
          isLoad.value = true;
        } else {
          isLoad.value = false;
        }
      }
    );

    function unLoad() {
      removeCookie("studentToken");
      store.state.loginStatus = false;
      isLoad.value = false;
      sessionStorage.clear();
      router.push({
        path: "/introduction",
      });
    }

    //点击消息中心，取消小红点
    const unDot = () => {
      isDot.value = false;
      console.log("取消小红点");
    };

    onUnmounted(() => {
      location.reload();
    });

    // watch(() => route.path,() => {
    // console.log('监听到变化');
    // console.log(route.path);
    // })

    return {
      activeIndex,
      activeIndex2,
      loginStatus,
      userName,
      isLoad,
      unLoad,
      isDot,
      unDot,
    };
  },
};
</script>

<style lang='scss' scoped>
    .nav{
        width: 1200px;
        height: 80px;
        position: fixed;
        top: 0;
        z-index: 1;
        left: 50%;
        margin-left: -600px;
        // background-color: chartreuse;
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 600;
        color: rgb(87, 87, 87);
        .logo{
            padding-left: 40px;
            padding-top: 10px;
            img{
                width: 80px;
                line-height: 80px;
            }
        }
        .login_before,.login_after{
            width: 300px;
            height: 80px;
            line-height: 80px;
            display: flex;
            justify-content: flex-end;
            li{
                text-align: center;
                height: 80px;
                line-height: 80px;
                padding: 0 20px;
                cursor: pointer;
                &:hover{
                    color: rgb(154, 158, 152);
                }
                &:active{
                    color: rgb(176, 179, 175);
                }
            }
        }
        .login_after{
            width: 750px;
        }
    }
    .line{
        height: 30px;
        font-size: 12px;
    }

</style>