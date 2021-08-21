<template>
  <el-radio-group v-model="radio1">
    <el-radio-button label="前端"></el-radio-button>
    <el-radio-button label="后台"></el-radio-button>
  </el-radio-group>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Choice",
  setup() {
    return {
      radio1: ref("上海"),
      radio2: ref("上海"),
      radio3: ref("上海"),
      radio4: ref("上海"),
    };
  },
});
</script>

<style>
</style>