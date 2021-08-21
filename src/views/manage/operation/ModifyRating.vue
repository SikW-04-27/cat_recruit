<template>
  <div class="avatar">
    <img src="https://img2.baidu.com/it/u=1305759230,3688102309&fm=26&fmt=auto&gp=0.jpg" alt=""/>
  </div>
  <div class="modifyinfo">
    <p style="font-size:20px">一轮</p>
    分数：<el-input type="number" v-model="input" placeholder="请输入分数" max="100" min="0"></el-input><br><br>
    评价：<el-input type="textarea" v-model="desc" resize="none" :rows="5" ></el-input><br><br><br><br><br><br><br>
    <router-link to="/checkdetialpoint">
        <el-button type="primary">确认修改</el-button>
    </router-link>
  </div>

</template>

<script>
import { ref,onMounted } from "vue";
import { useRoute } from "vue-router";
export default {
  setup(props) {
    let input = ref('');
    let desc = ref('')
    const route = useRoute();

    onMounted(() => {
      console.log(route.query.id);
    });

    return {input,desc}
  },
};
</script>

<style lang="scss" scoped>
    .avatar {
        width: 150px;
        margin: 20px auto;
        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }
    }

    .modifyinfo{
        text-align: center;
        color: #fff;
        .el-input{
            width: 200px;
        };
        .el-textarea{
            width: 300px;
            height: 20px;
        }
    }

</style>