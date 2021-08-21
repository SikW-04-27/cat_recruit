<template>
  <el-table :data="tableData" border @cell-click="handle" style="width: 100%">
    <el-table-column prop="id" label="ID" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名"> </el-table-column>
    <el-table-column prop="amount1" sortable label="笔试"> </el-table-column>
    <el-table-column prop="amount2" sortable label="一轮面试">
    </el-table-column>
    <el-table-column prop="amount3" sortable label="二轮面试">
    </el-table-column>
    <el-table-column prop="amount4" sortable label="一轮考核">
    </el-table-column>
    <el-table-column prop="amount5" sortable label="二轮考核">
    </el-table-column>
    <el-table-column prop="sum" sortable label="平均分"> </el-table-column>
    <el-table-column prop="state" label="状态"> </el-table-column>
  </el-table>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from 'vue-router'
export default {
  setup(props) {
    let tableData = reactive([
      {
        id: "12987122",
        name: "王小虎",
        amount1: "234",
        amount2: "3.2",
        amount3: 10,
        amount4: 22,
        amount5: 66,
        sum: 22,
        state: "正在考核",
      },
      {
        id: "12987123",
        name: "王小虎",
        amount1: "165",
        amount2: "4.43",
        amount3: 12,
      },
      {
        id: "12987124",
        name: "王小虎",
        amount1: "324",
        amount2: "1.9",
        amount3: 9,
      },
      {
        id: "12987125",
        name: "王小虎",
        amount1: "621",
        amount2: "2.2",
        amount3: 17,
      },
      {
        id: "12987125",
        name: "王小虎",
        amount1: "621",
        amount2: "2.2",
        amount3: 17,
      },
      {
        id: "12987125",
        name: "王小虎",
        amount1: "621",
        amount2: "2.2",
        amount3: 17,
      },
      {
        id: "12987125",
        name: "王小虎",
        amount1: "621",
        amount2: "2.2",
        amount3: 17,
      },
      {
        id: "12987125",
        name: "王小虎",
        amount1: "621",
        amount2: "2.2",
        amount3: 17,
      },
      {
        id: "12987125",
        name: "王小虎",
        amount1: "621",
        amount2: "2.2",
        amount3: 17,
      },
      {
        id: "12987125",
        name: "王小虎",
        amount1: "621",
        amount2: "2.2",
        amount3: 17,
      },
      {
        id: "12987125",
        name: "王小虎",
        amount1: "621",
        amount2: "2.2",
        amount3: 17,
      },
      {
        id: "12987125",
        name: "王小虎",
        amount1: "621",
        amount2: "2.2",
        amount3: 17,
      },
      {
        id: "12987125",
        name: "王小虎",
        amount1: "621",
        amount2: "2.2",
        amount3: 17,
      },
      {
        id: "12987126",
        name: "王小虎",
        amount1: "539",
        amount2: "4.1",
        amount3: 15,
      },
    ]);

     const router = useRouter()

    let handle = function (row, column, event, cell) {
      console.log(row.name);
      console.log(column);
    //   console.log(event);
    //   console.log(cell);
    //   console.log(this.router);
      router.push({
        name:"checkdetialpoint",
        path:'/checkdetialpoint',
        query: {
          id: row.id,
          title: row.name,
        },
      });
    };
    return {
      tableData,
      handle,
    };
  },
};
</script>

<style lang="scss" >
.el-table {
  margin-top: 20px;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  cursor: pointer;
  background-color: gray;
}
</style>