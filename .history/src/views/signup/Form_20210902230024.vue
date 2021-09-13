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
            :disabled="disabled"
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
        <el-radio-group v-model="radio2" :disabled="disabled">
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
            :disabled="disabled"
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
            :disabled="disabled"
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
            :disabled="disabled"
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
            :disabled="disabled"
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
            :disabled="disabled"
          >
          </el-input>
        </div>
        <el-result icon="success" v-show="phoneCheck"> </el-result>
      </div>
      <!-- 上传个人真实头像 -->
      <div class="avatar">
        <span>个人头像：</span>
        <label for="file">点击上传头像图片</label>
        <input
          type="file"
          id="file"
          accept="image/*"
          name="file"
          style="display: none"
        />
      </div>
      <!-- 方向 -->
      <div class="direction">
        <span>报名组别：</span>
        <el-radio-group v-model="radio1" :disabled="disabled">
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
            :disabled="disabled"
          >
          </el-input>
        </div>
        <el-result icon="success" v-show="textarea2"> </el-result>
      </div>
      <!-- 提交按钮 -->
      <div class="commit_btn">
        <el-button type="primary" round @click="btnClick()" :disabled="disabled"
          >提交</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
// import submit from "../../request/api.js";
import {
  listAllCollege,
  listAllMajor,
  listMajor,
  submit,
} from "../../request/api";
import Choice from "./choice.vue";
export default defineComponent({
  name: "Form",
  components: {},
  setup() {
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
    let stuId = JSON.parse(window.sessionStorage.getItem("user_register"))
      .studentId;
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

    //获取学院
    let institutes = reactive([]);
    listAllCollege({}).then((res) => {
      institutes.push(...res.data);
    });
    //根据学院获取专业：
    let majors = reactive([]);
    const majorChange = () => {
      console.log(111);
      listMajor({ name: institute.value }).then((res) => {
        console.log(res);
        majors.splice(0, majors.length);
        majors.push(...res.data);
      });
    };
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
          studentId: stuId,
        }).then((res) => {
          if (res.code === 200) {
            success();
            //报名表禁用
            disabled.value = true;
          } else {
            warningMessage.value = res.message;
            warning();
          }
        });
      } else {
        warningMessage.value = "请完善全部信息";
        warning();
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
      clazz,
      direction,
      sex,
      textarea2,
      change,
      btnClick,
      disabled,
      radio1,
      radio2,
      majorChange,
      warningMessage,
      success,
      stuId,
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
// .el-result svg {
//   width: 30px;
//   height: 30px;
// }
.content {
  height: auto;
  .name,
  .stuNumber,
  .sex,
  .classes,
  .avatar,
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
    vertical-align: middle;
    label {
      display: inline-block;
      line-height: 30px;
      margin-left: 20px;
      color: gray;
      
    }
  }
}
</style>>
