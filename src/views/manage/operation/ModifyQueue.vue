<template>
    <div class="queue_block">
        <el-table
            class="el-table-scolled"
            :data="tableData"
            height="400"
            style="width: 45%">
            <el-table-column
            prop="id"
            label="序号">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="studentid"
            label="学号"
            width="180">
            </el-table-column>
            <el-table-column
            prop="status"
            label="签到状态">
            </el-table-column>
        </el-table>

        <div class="modify_status">
            {{signin_status}}<br><br>
            <ManageButton @click="start_signin">开始签到</ManageButton><br><br>
            <ManageButton @click="end_signin">结束签到</ManageButton>
        </div>
        
    </div>
  
</template>

<script>
import {startQueue,closeQueue,checkStatus} from '../../../request/api'
import ManageButton from '../../../components/ManageButton.vue'
import {ElLoading, ElMessageBox, ElMessage  } from 'element-plus'
import { onMounted, ref } from 'vue'
export default {
    components:{ManageButton},
    setup(props) {
        let signin_status = ref('')
        let tableData = [{
            id:1,
            name:'张三',
            studentid:3120009999,
            status:1,
        }] 

        // 管理员开启开始签到
        let start_signin = function(){
            startQueue().then(res => {
                console.log(res);
                if(res.code === 1100){
                    signin_status.value = '当前处于签到状态'
                    ElMessage.success({
                        message: `${res.message}`,
                        type:'success'
                    })
                }else if(res.code === 1300){
                    ElMessage.warning({
                        message: `${res.message}`,
                        type:'warning'
                    })
                }
            }).catch(err => {
                ElMessage.error('请求失败')
            })
        }

        // 管理员关闭签到状态
        let end_signin = function(){
            closeQueue().then(res => {
                console.log(res);
                if(res.code === 1104){
                    signin_status.value = '暂未处于签到状态'
                    ElMessage.success({
                        message: `${res.message}`,
                        type:'success'
                    })
                }else{
                    ElMessage.warning({
                        message: `${res.message}`,
                        type:'warning'
                    })
                }
            }).catch(err => {
                ElMessage.error('请求失败')
            })
        }

        onMounted(()=>{
            checkStatus().then(res => {
                signin_status.value = res.message
            })
        })

        return {
            tableData,
            signin_status,
            start_signin,
            end_signin
            
        }
    }
}
</script>

<style lang="scss">
    .queue_block{
        width: 1200px;
        display: flex;
        justify-content: space-between;
        .modify_status{
            width: 500px;
            margin: 40px;
            color:#fff;
            font-size: 20px;
        }
    }
</style>