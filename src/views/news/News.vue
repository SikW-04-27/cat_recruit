
<template>
<div class="block" id="content">
  <el-timeline>
      <el-timeline-item timestamp="2021/4/12" placement="top" color="#0bbd87">
      <el-card class="active">
        <h4>面试结果</h4>
        <p>你无了。。。</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/12" placement="top" color="#0bbd87">
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
    </el-timeline-item>
  </el-timeline>
</div>

</template>

<script setup>
import {onMounted} from 'vue'

console.dir(WebSocket);
</script>

<style lang="scss" scoped>

#content {
    margin: 50px auto 0;
    width: 70%;
}

.active {
    border: 1px solid red;
}

</style>
