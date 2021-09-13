<template>
  <div id="form">
    <router-link to="/introduction">
      <el-page-header content="报名表"> </el-page-header>
    </router-link>
    <!-- 登陆 处于报名阶段 未报名 -->
    <div class="content" v-if="currentStatusId === 2 && stuId && !isSignUp">
      <!-- 姓名 -->
      <div class="name">
        <span>姓名：</span>
        <div class="n_input">
          <el-input
            placeholder="请输入姓名"
            v-model="name"
            maxlength="10"
            @change="change($event)"
            :disabled="disabled.value"
          >
          </el-input>
        </div>
        <el-result icon="success" v-show="name" id="icon" el-result-color="red"
          >.el-result__icon svg
        </el-result>
      </div>
      <!-- 性别 -->
      <div class="sex">
        <span>报名组别：</span>
        <el-radio-group v-model="radio2" :disabled="disabled.value">
          <el-radio-button label="男"></el-radio-button>
          <el-radio-button label="女"></el-radio-button>
        </el-radio-group>
        <el-result icon="success" v-show="sex"> </el-result>
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
            :disabled="disabled.value"
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
            :disabled="disabled.value"
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
      <div class="majors" v-if="institute">
        <span>专业：</span>
        <div class="i_select">
          <el-select
            v-model="major"
            filterable
            placeholder="请选择所在专业"
            :disabled="disabled.value"
            @focus="majorChange()"
          >
            <el-option
              v-for="item in majors"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </div>
        <el-result icon="success" v-show="major"> </el-result>
      </div>
      <!-- 班级 -->
      <div class="classes" v-if="major">
        <span>班级：</span>
        <div class="c_input">
          <el-input
            placeholder="请输入班级（例如：一班）"
            v-model="clazz"
            clearable
            maxlength="3"
            :disabled="disabled.value"
          >
          </el-input>
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
            :disabled="disabled.value"
          >
          </el-input>
        </div>
        <el-result icon="success" v-show="phoneCheck"> </el-result>
      </div>
      <!-- 上传个人真实头像 -->
      <div class="avatar">
        <span>个人头像：</span>
        <label for="file">
          <img src="../../assets/img/点击上传图片.png" alt="" />
        </label>
        <input
          type="file"
          id="file"
          accept="image/*"
          name="file"
          style="display: none"
          @change="handleFileChange"
        />
      </div>
      <!-- 方向 -->
      <div class="direction">
        <span>报名组别：</span>
        <el-radio-group v-model="radio1" :disabled="disabled.value">
          <el-radio-button label="前端"></el-radio-button>
          <el-radio-button label="后台"></el-radio-button>
        </el-radio-group>
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
            :disabled="disabled.value"
            maxlength="200"
          >
          </el-input>
        </div>
        <el-result icon="success" v-show="textarea2"> </el-result>
      </div>
      <!-- 提交按钮 -->
      <div class="commit_btn">
        <el-button
          type="primary"
          round
          @click="btnClick()"
          :disabled="disabled.value"
          >提交</el-button
        >
      </div>
    </div>
    <!-- 登录 处于报名阶 已报名 -->
    <div class="hasSignUp" v-if="currentStatusId === 2 && stuId && isSignUp">
      <span>您已报名，请耐心等候一轮面试</span>
    </div>
    <!-- 登录 但 未处于报名阶段 -->
    <div class="close" v-if="!(currentStatusId === 2) && stuId">
      <span v-if="!(currentStatusId === 1)"
        >当前处于 {{ currentStatus }} 阶段，报名通道已关闭</span
      >
      <span v-if="currentStatusId === 1"
        >当前招新还未开始，请耐心等待报名通道的开放</span
      >
    </div>
    <!-- 未登录 -->
    <div class="unLogin" v-if="!stuId">
      <span>您还未登录，请先登录</span>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
// import submit from "../../request/api.js";
import {
  listAllCollege,
  listAllMajor,
  listMajor,
  submit,
  getUserStatus,
  getSubmit,
} from "../../request/api";
import Choice from "./choice.vue";
let change = ($event) => {};
//定义各个值
let name = ref("");
let institute = ref("");
let major = ref("");
let clazz = ref("");
let direction = ref("");
let sex = ref("");
let textarea2 = ref("");
let disabled = ref(false);
let radio1 = ref("");
let radio2 = ref("");
let warningMessage = ref("");
let stuId = window.localStorage.getItem("userId");
//定义warning函数
const warning = () => {
  ElMessage.warning({
    message: warningMessage,
    type: "warning",
  });
};
//定义success函数
const success = () => {
  ElMessage.success({
    message: "报名成功",
    type: "success",
  });
};
//判断是否处于报名时间
let currentStatusId = JSON.parse(window.localStorage.getItem("CurrentStatus"))
  .id;
let currentStatus = JSON.parse(window.localStorage.getItem("CurrentStatus"))
  .status;
//判断是否报名
let isSignUp = JSON.parse(window.localStorage.getItem("hasSignUp"));
//获取学院
let institutes = reactive([]);
//根据学院获取专业：
let majors = reactive([]);
//判断手机号码输入是否为11位
let phoneCheck = ref(false);
let phone = ref("");
//判断学号输入是否为10位
let numCheck = ref(false);
let stuNumber = ref("");

let majorChange = () => {
  listMajor({ name: institute.value }).then((res) => {
    console.log(res);
    majors.splice(0, majors.length);
    majors.push(...res.data);
  });
};
let phoneChange = ($event) => {
  if ($event.length == 11) {
    phoneCheck.value = true;
  } else {
    phoneCheck.value = false;
  }
};

let numChange = ($event) => {
  if ($event.length == 10) {
    numCheck.value = true;
  } else {
    numCheck.value = false;
  }
};

onMounted(() => {
  if (stuId) {
    if (currentStatusId === 2) {
      //处于报名阶段
      if (window.localStorage.getItem("hasSignUp") === true) {
        //已报名
        return;
      } else {
        //未报名
        console.log("未报名");
      }
    }
    //未处于报名时间段
    else if (currentStatusId === 1) {
      warningMessage.value = "招新未开始，请耐心等候";
      warning();
      return;
    } else {
      warningMessage.value = "报名已截止";
      warning();
      return;
    }
  }

  listAllCollege({}).then((res) => {
    institutes.push(...res.data);
  });

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
      sex &&
      textarea2.value
    ) {
      // 提交报名表;
      submit({
        clazz: clazz.value,
        college: institute.value,
        direction: radio1.value,
        gender: radio2.value,
        major: major.value,
        name: name.value,
        phoneNumber: phone.value,
        selfIntroduction: textarea2.value,
        studentId: stuNumber.value,
      })
        .then((res) => {
          if (res.code === 200) {
            success();
            //报名表禁用
            disabled.value = ref(true);
            window.localStorage.setItem("hasSignUp", true);
          } else {
            warningMessage.value = res.message;
            warning();
            if (res.code === 4006) {
              //已经提交过报名表
              //报名表禁用
              disabled.value = ref(true);
            }
          }
        })
        .catch((err) => {
          warningMessage.value = err.data.message;
          warning();
        });
    } else {
      warningMessage.value = "请完善全部信息";
      warning();
    }
  };

  let handleFileChange = (e) => {
    let fileData = e;
    console.log(fileData.target.files[0]);
  };
});
</script>

<style lang="scss" scoped>
$zhutise: rgb(41, 45, 63);
#form {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 80%;
  height: 90%;
  margin: 50px auto 0;
  padding: 20px 0 0 50px;
  background-color: #fff;
}
.el-page-header {
  padding: 10px 0 30px 0;
}
.i_select {
  margin-left: 20px;
}
.content {
  height: auto;
  span {
    display: inline-block;
    width: 80px;
  }
  .name,
  .stuNumber,
  .sex,
  .classes,
  .phone {
    height: 50px;
  }
  .n_input,
  .s_input,
  .c_input,
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
  .direction {
    height: 50px;
    margin-right: 30px;
    .i_select {
      display: inline-block;
    }
    .el-input {
      margin: 0 0 0 20px;
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
    display: inline-block;
    padding: 0;
    :deep .icon-success {
      width: 30px;
      height: auto;
    }
  }

  .commit_btn {
    padding-left: 130px;
    padding-bottom: 30px;
  }
  .avatar {
    padding: 10px 0;
    label {
      display: inline-block;
      line-height: 30px;
      margin-left: 20px;
      background-color: #000;
      vertical-align: top;
      img {
        width: 100px;
      }
    }
  }
}
.close,
.unLogin,
.hasSignUp {
  text-align: center;
  padding: 100px 0;
}
</style>>
