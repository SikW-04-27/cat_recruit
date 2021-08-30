<template>
  <div class="signIn">
    <!-- 页眉 -->
    <router-link to="/introduction">
      <el-page-header @back="goBack" content="预约面试时间"> </el-page-header>
    </router-link>
    <el-divider>目前预约：{{ data }}</el-divider>
  </div>
</template>

<script>
export default {
  name:'SignIN',
    setup() {
     return{
         data:ref("")
     }   
    }
};
</script>

<style>
</style>