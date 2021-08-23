<template>
  <div class="ratinglist_block">
    <el-input
      v-model="search"
      size="medium"
      prefix-icon="el-icon-search"
      placeholder="输入关键字搜索"/>
    <el-button type="danger" class="eliminate" @click="eliminate" v-show="dangerbutton_1">批量淘汰</el-button>
    <el-button type="danger" class="canceleliminate" @click="canceleliminate" v-show="dangerbutton_2">取消</el-button>
    <el-button type="danger" class="confirmeliminate" @click="confirmeliminate" v-show="dangerbutton_2">确认淘汰</el-button>
    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      @cell-click="handle" 
      @cell-mouse-enter='hovercell'
      @cell-mouse-leave='leavecell'
      height="480"
      style="width: 100%"
      >

      
      <el-table-column type="selection" class-name='play'></el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="examAvg" sortable label="笔试"> </el-table-column>
      <el-table-column prop="firstInterviewAvg" sortable label="一轮面试">
      </el-table-column>
      <el-table-column prop="secondInterviewAvg" sortable label="二轮面试">
      </el-table-column>
      <el-table-column prop="firstReviewAvg" sortable label="一轮考核">
      </el-table-column>
      <el-table-column prop="secondReviewAvg" sortable label="二轮考核">
      </el-table-column>
      <el-table-column prop="sum" sortable label="平均分"> </el-table-column>
      <el-table-column prop="recruitmentStatus" label="状态"> 

      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router'
import {listAllUser} from '../../../request/api'
export default {
  setup(props) {
    let tableData = reactive([]);
    let search = ref('')
    let dangerbutton_1 = ref(true);
    let dangerbutton_2 = ref(false);
    const router = useRouter()

    // 点击每一个单元格
    let handle = function (row, column, event, cell) {
      if(column.no !== 0 && column.no !==1){
        let row_value = JSON.stringify(row)
        window.sessionStorage.setItem("user_point",JSON.stringify(row));
        window.sessionStorage.setItem("user_status",JSON.stringify(column));
        router.push({
          name:"checkdetialpoint",
          path:'/checkdetialpoint',
        });
      }
    };

    // 鼠标移入每一个单元格
    let hovercell = function(row, column, event, cell){
      if(column.no !== 0 && column.no !==1){
        cell.path[0].style.color = '#fff'
      }
    }

    // 鼠标移出每一个单元格
    let leavecell = function(row, column, event, cell){
      if(column.no !== 0 && column.no !==1){
        cell.path[0].style.color = '#606266'
      }
    }

    // 点击批量淘汰按钮
    let eliminate = function(){
      dangerbutton_1.value = false
      dangerbutton_2.value = true
      let cell = document.getElementsByClassName("el-checkbox__inner")
      for(let i = 0; i < cell.length; i++){
        cell[i].style.visibility = 'visible'
      }
    }

    //取消选择淘汰
    let canceleliminate = function(){
      dangerbutton_1.value = true
      dangerbutton_2.value = false
      let cell = document.getElementsByClassName("el-checkbox__inner")
      console.log(cell);
      for(let i = 0; i < cell.length; i++){
        cell[i].style.visibility = 'hidden'
      }
    }

    // 点击确认删除按钮
    let confirmeliminate = function() {
      
    }

    onMounted(()=>{
      listAllUser().then(res => {
        console.log(res);
        tableData.push(...res.data)
        console.log(...res.data[0].userAppraiseFirstInterview);
        console.log(tableData);
      })
    })

    return {
      tableData,
      search,
      dangerbutton_1,
      dangerbutton_2,
      handle,
      hovercell,
      leavecell,
      eliminate,
      canceleliminate,
      confirmeliminate
    };
  },
};
</script>

<style lang="scss">

.ratinglist_block{
  position: relative;
  padding-top: 20px;
  text-align: center;

  // 设置搜索框长度
  .el-input {
    width: 300px;
  }

  // 设置按钮位置
  .eliminate,.confirmeliminate{
    position: absolute;
    right: 0;
  }

  .canceleliminate{
    position: absolute;
    right: 120px;
  }
}

.el-table {
  margin-top: 20px;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  cursor: pointer;
  background-color: gray;
}



// 多选框隐藏
.el-checkbox__inner{
  visibility: hidden;
}

.play{
  position: relative;
  // right: 100px;
  padding-right: 100px;
}
</style>