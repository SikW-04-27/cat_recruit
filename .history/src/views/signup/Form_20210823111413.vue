<template>
  <div id="form">
    <router-link to="/introduction">
      <el-page-header @back="goBack" content="报名表"> </el-page-header>
    </router-link>
    <div class="content">
      <!-- 姓名 -->
      <div class="name">
        <span>姓名：</span>
        <div class="c_input">
          <el-input placeholder="请输入姓名" v-model="input" clearable>
          </el-input>
        </div>
      </div>
      <!-- 学号 -->
      <div class="stuNumber">
        <span>学号：</span>
        <div class="c_input">
          <el-input placeholder="请输入姓名" v-model="input" clearable>
          </el-input>
        </div>
      </div>

      <!-- 学院 -->
      <div class="institute">
        <span>学院：</span>
        <Select></Select>
      </div>
      <!-- 专业 -->
      <div class="majors">
        <span>专业：</span>
        <Select></Select>
      </div>
      <!-- 班级 -->
      <div class="majors">
        <span>班级：</span>
        <Select></Select>
      </div>
      <!-- 方向 -->
      <div class="direction">
        <span>报名组别：</span>
        <Choice></Choice>
      </div>
      <!-- 自我介绍 -->
      <div class="self_intro">
        <span>自我介绍：</span>
        <div class="s_input">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
            placeholder="请做一段简单的自我介绍"
            v-model="textarea2"
          >
          </el-input>
        </div>
      </div>
      <!-- 提交按钮 -->
      <div class="commit_btn">
        <el-button type="primary" round>提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import submit from "../../request/api.js";
import Select from "./select.vue";
import Choice from "./choice.vue";
export default defineComponent({
  name: "Form",
  components: {
    Select,
    Choice,
  },
  setup() {
    return {
      input: ref(""),
      textarea2: ref(""),
    };
  },
});
</script>

<style lang="scss" scoped>
$zhutise: rgb(41, 45, 63);
#form {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 80%;
  height: 90%;
  margin: 0 auto;
  padding: 20px;
}
.title {
}
.content {
  height: auto;
  .name {
    height: 50px;
    .c_input {
      display: inline-block;
      height: 30px;
      .el-input {
        margin: 0 20px;
      }
    }
  }
  .institute,
  .majors,
  .direction {
    height: 60px;
    .i_select {
      display: inline-block;
    }
  }
  .self_intro {
    width: 400px;
    height: 130px;
    span {
      float: left;
    }
    .s_input {
      width: 300px;
      display: inline-block;
    }
  }
  .commit_btn {
    margin: 0 auto;
  }
  .el-radio-group,
  .el-textarea {
    margin: 0 20px;
  }
}
</style>>
