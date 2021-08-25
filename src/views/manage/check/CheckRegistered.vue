<template>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.direction.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%;"
    max-height="2500"
    >
    <el-table-column
      prop="registerTime"
      label="报名日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="direction"
      label="方向"
      width="120">
    </el-table-column>
    <el-table-column
      prop="studentId"
      label="学号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="major"
      label="学院"
      width="200">
    </el-table-column>
    <el-table-column
      prop="college"
      label="专业"
      width="200">
    </el-table-column>
    
    <el-table-column
      label="操作"
      width="240">
      <template #header>
        <el-input
          v-model="search"
          size="small"
          placeholder="输入关键字搜索"/>
      </template>
      <router-link to='/checkpersonal'>详情</router-link>
    </el-table-column>
  </el-table>
</template>

<script>
  import {onMounted, reactive, ref} from 'vue'
  import {enrolllist} from '../../../request/api'
  export default {
    setup(props) {
      let tableData = reactive([])
      let search = ref('')
      let personaldetial = function(index, rows) {
        console.log(111);
      }

      onMounted(()=>{
        enrolllist().then(res => {
          console.log(res);
          tableData.push(...res.data)
        })
      })
      return{
        tableData,
        search,
        personaldetial
      }
    },
    
  }
</script>

<style lang="scss" scoped>

    .el-table {
      cursor: pointer;
      --el-table-row-hover-background-color: gray;
    }

    
    
    

</style>