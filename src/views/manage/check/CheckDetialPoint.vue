<template>
    <div class="personinfo">
        <p>姓名：xxxx</p>
        <p>学号：3120004444</p>
        <p>阶段：一轮考核</p>
        <router-link to="/modifyrating">
            <el-button type="primary">修改分数</el-button>
        </router-link>
    </div>

    <div class="avatar">
    <img src="https://img2.baidu.com/it/u=1305759230,3688102309&fm=26&fmt=auto&gp=0.jpg" alt=""/>
    </div>
    <div class="modifyinfo">
    <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
        prop="name"
        label="管理员"
        width="180">
        </el-table-column>
        <el-table-column
        prop="point"
        label="分数"
        width="180">
        </el-table-column>
        <el-table-column
        prop="assess"
        label="评价">
        </el-table-column>
    </el-table>
    </div>

</template>

<script>
import { ref,onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
export default {
  setup(props) {
      let tableData = reactive([{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }])

    return {tableData}
  },
};
</script>

<style lang="scss" scoped>
    .personinfo{
        width: 300px;
        height: 200px;
        position: absolute;
        margin: 20px;
        color: #fff;
        font-size: 20px;
        p{
          margin-bottom: 10px;
        }
    }
    .avatar {
        width: 150px;
        margin: 20px auto;
        margin-bottom: 50px;
        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }
    }

    .modifyinfo{

    }

</style>