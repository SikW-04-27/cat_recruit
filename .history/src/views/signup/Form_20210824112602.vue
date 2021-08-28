<template>
  <div id="form">
    <router-link to="/introduction">
      <el-page-header content="报名表"> </el-page-header>
    </router-link>
    <div class="content">
      <!-- 姓名 -->
      <div class="name">
        <span>姓名：</span>
        <div class="n_input">
          <el-input
            placeholder="请输入姓名"
            v-model="name"
            @change="change($event)"
          >
          </el-input>
        </div>
        <el-result icon="success" v-show="name"> </el-result>
      </div>
      <!-- 学号 -->
      <div class="stuNumber">
        <span>学号：</span>
        <div class="n_input">
          <el-input
            placeholder="请输入十位学号"
            v-model="stuNumber"
            clearable
            maxlength="10"
            @input="numChange($event)"
          >
          </el-input>
        </div>
        <el-result icon="success" v-show="numCheck"> </el-result>
      </div>
      <!-- 学院 -->
      <div class="institute">
        <span>学院：</span>
        <div class="i_select">
          <el-select
            v-model="institute"
            filterable
            placeholder="请选择所在学院"
          >
            <el-option
              v-for="item in institutes"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </div>
        <el-result icon="success" v-show="institute"> </el-result>
      </div>
      <!-- 专业 -->
      <div class="majors">
        <span>专业：</span>
        <div class="i_select">
          <el-select v-model="major" filterable placeholder="请选择所在专业">
            <el-option
              v-for="item in majors"
              :key="item.value"
              :label="item.label"
              :value="item.majorName"
            >
            </el-option>
          </el-select>
        </div>
        <el-result icon="success" v-show="major"> </el-result>
      </div>
      <!-- 班级 -->
      <div class="classes">
        <span>班级：</span>
        <div class="i_select">
          <el-select v-model="clazz" filterable placeholder="请选择所在班级">
            <el-option
              v-for="item in classes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <el-result icon="success" v-show="clazz"> </el-result>
      </div>
      <!-- 手机号码 -->
      <div class="phone">
        <span>手机号码：</span>
        <div class="p_input">
          <el-input
            placeholder="请输入十一位手机号码"
            v-model="phone"
            clearable
            maxlength="11"
            @input="phoneChange($event)"
          >
          </el-input>
        </div>
        <el-result icon="success" v-show="phoneCheck"> </el-result>
      </div>

      <!-- 方向 -->
      <div class="direction">
        <span>报名组别：</span>
        <Choice></Choice>
        <el-result icon="success" v-show="direction"> </el-result>
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
            resize="none"
            show-word-limit
          >
          </el-input>
        </div>
        <el-result icon="success" v-show="textarea2"> </el-result>
      </div>
      <!-- 提交按钮 -->
      <div class="commit_btn">
        <el-button type="primary" round @click="btnClick()">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
// import submit from "../../request/api.js";
import { listAllCollege, listAllMajor, listMajor } from "../../request/api";
import Choice from "./choice.vue";
export default defineComponent({
  name: "Form",
  components: {
    Choice,
  },
  setup() {
    let change = ($event) => {};
    //定义各个值
    let name = ref("");
    let institute = ref("");
    let major = ref("");
    let clazz = ref("");
    let direction = ref("");
    let textarea2 = ref("");
    //获取学院
    let institutes = reactive([]);
    listAllCollege({}).then((res) => {
      institutes.push(...res.data);
    });
    //获取专业
    let majors = reactive([]);
    //获取全部专业：
    listAllMajor({}).then((res) => {
      majors.push(...res.data);
    });
    //根据学院获取专业：
    listMajor("计算机学院" ).then((res) => {
      console.log(res);
    });

    //获取班级
    let classes = reactive([{ value: "一班" }, { value: "二班" }]);

    //判断手机号码输入是否为11位
    let phoneCheck = ref(false);
    let phone = ref("");
    let phoneChange = ($event) => {
      if ($event.length == 11) {
        phoneCheck.value = true;
      } else {
        phoneCheck.value = false;
      }
    };

    //判断学号输入是否为10位
    let numCheck = ref(false);
    let stuNumber = ref("");
    let numChange = ($event) => {
      if ($event.length == 10) {
        numCheck.value = true;
      } else {
        numCheck.value = false;
      }
    };

    //点击提交按钮
    let btnClick = () => {
      //判断是否全部值都已经填好
      if (
        name.value &&
        numCheck.value &&
        phoneCheck.value &&
        institute.value &&
        major.value &&
        clazz.value &&
        direction &&
        textarea2.value
      ) {
        console.log("填完啦");
      } else {
        console.log("没填完");
      }
    };

    return {
      name,
      stuNumber,
      numCheck,
      numChange,
      phone,
      phoneCheck,
      phoneChange,
      institutes,
      institute,
      majors,
      major,
      classes,
      clazz,
      direction,
      textarea2,
      change,
      btnClick,
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
.content {
  height: auto;
  .name,
  .stuNumber,
  .phone {
    height: 50px;
  }
  .n_input,
  .s_input,
  .p_input {
    display: inline-block;
    height: 30px;
    margin-right: 30px;
    .el-input {
      margin: 0 20px;
    }
  }
  .institute,
  .majors,
  .classes,
  .direction {
    height: 60px;
    margin-right: 30px;
    .i_select {
      display: inline-block;
    }
  }
  .self_intro {
    width: 500px;
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
  .el-result {
    position: absolute;
    margin-top: 5px;
  }
  .commit_btn {
    padding-left: 130px;
  }
}
</style>>
