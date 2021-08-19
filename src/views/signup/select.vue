<template>
  <div class="i_select">
    <el-select v-model="value" filterable placeholder="请选择所在学院">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name: "Select",
  setup() {
    let options = ref([
      {
        value: "选项1",
        label: "计算机学院",
      },
      {
        value: "选项2",
        label: "自动化学院",
      },
      {
        value: "选项3",
        label: "机械学院",
      },
      {
        value: "选项4",
        label: "数学学院",
      },
      {
        value: "选项5",
        label: "其他",
      },
    ]);
    return {
      options,
      value: ref(""),
    };
  },
};
</script>

<style>
</style>