<template>
    <div class="process">
        <!-- 查看全部预约时间 -->
        <el-table
            class="el-table-scolled"
            :data="tableData"
            height="400"
            style="width: 45%">
            <el-table-column
            prop="id"
            label="时间ID">
            </el-table-column>
            <el-table-column
            prop="beginTime"
            label="开始时间"
            width="180">
            </el-table-column>
            <el-table-column
            prop="endTime"
            label="结束时间"
            width="180">
            </el-table-column>
            <el-table-column
            prop="count"
            label="人数">
            </el-table-column>
        </el-table>

        <!-- 添加预约时间 -->
        <div class="block">
            <span class="demonstration">起始时间：</span>
            <el-date-picker
                v-model="beginTime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker><br><br>
            <span class="demonstration">结束时间：</span>
            <el-date-picker
                v-model="endTime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker><br><br>
            <span class="demonstration">预约人数：</span>
            <el-input-number v-model="count" :min="1" label="描述文字" ></el-input-number><br><br>
            <ManageButton @click="addappointment">添加预约</ManageButton>

            <!-- 分割线 -->
            <el-divider ></el-divider>

            <!-- 删除预约时间 -->
            <el-input-number v-model="deleteId" :min="1" label="描述文字"></el-input-number>
            <ManageButton @click="deleteappointment" style="margin-left:30px">删除该时间段</ManageButton><br><br>
            <ManageButton @click="deleteAllAppointment">删除全部时间段</ManageButton><br><br>
        </div>


    </div>

</template>

<script>
import { reactive,ref } from 'vue'
import ManageButton from '../../../components/ManageButton.vue'
import {ElLoading, ElMessageBox, ElMessage  } from 'element-plus'
import '../../../../node_modules/dayjs/dayjs.min.js'
import {listAppointment,saveNewAppointmentInfo,deleteAppointmentInfo,deleteAllAppointmentInfo} from '../../../request/api'
    export default {
        components:{ManageButton},
        setup(props) {
            let id= ref(0)
            let tableData = reactive([])
            let beginTime = ref('')
            let endTime = ref('')
            let count = ref(0)
            let deleteId = ref(0)

            // 查看全部预约时间
            listAppointment({}).then(res => {
                console.log(res);
                tableData.push( ...res.data)
            })

            //添加预约时间
            let addappointment = function(){
                ElMessageBox.confirm('是否添加此预约时间?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(()=>{
                    console.log(beginTime);
                    let beginTime_value = dayjs(beginTime.value).format('YYYY-MM-DD HH:mm:ss')
                    let endTime_value = dayjs(endTime.value).format('YYYY-MM-DD HH:mm:ss')
                    let count_value = count.value
                    let loadingInstance = ElLoading.service({fullscreen:false,target:'.el-table-scolled',background:'rgb(41, 45, 63, 0.8)'});
                    saveNewAppointmentInfo({
                        "beginTime":beginTime_value,
                        "endTime":endTime_value,
                        "count":count_value
                    }).then(res => {
                        // 判断是否设置成功
                        if(res.code === 1200){
                            // 设置成功则重新加载列表
                            listAppointment({}).then(res => {
                                tableData.splice(0,tableData.length);
                                tableData.push( ...res.data);
                                loadingInstance.close()
                            }).catch(err => {
                                loadingInstance.close()
                                ElMessage({
                                    type: 'info',
                                    message: '删除失败',
                                });
                            })
                        }else if(res.code === 40300){
                            loadingInstance.close()
                            ElMessage({
                                type: 'info',
                                message: res.message,
                            });
                        }
                        
                    })
                })
                
            }

            // 删除预约时间段
            let deleteappointment = function(){
                ElMessageBox.confirm('是否删除该时间段?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    let loadingInstance = ElLoading.service({fullscreen:false,target:'.el-table-scolled',background:'rgb(41, 45, 63, 0.8)'});
                    let deleteId_value = deleteId.value;
                    deleteAppointmentInfo({"id":deleteId_value}).then(res => {
                        listAppointment({}).then(res => {
                            tableData.splice(0,tableData.length);
                            tableData.push( ...res.data);
                            loadingInstance.close()
                        }).catch(()=>{

                        })
                        
                    }).catch(()=>{
                        console.log("kkkkkkkkkkkkkkkkk");
                        loadingInstance.close()
                        ElMessage({
                            type: 'info',
                            message: '加载失败',
                        });
                    })
                })
                
            }

            // 删除全部时间段
            let deleteAllAppointment =function(){
                ElMessageBox.confirm('此操作将永久删除所有时间段, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(()=>{
                    let loadingInstance = ElLoading.service({fullscreen:false,target:'.el-table-scolled',background:'rgb(41, 45, 63, 0.8)'});
                    deleteAllAppointmentInfo().then(res => {
                        console.log(res);
                        ElMessage({
                            type: 'success',
                            message: '删除成功!',
                        });
                        tableData.splice(0,tableData.length);
                        loadingInstance.close()
                    }).catch(err => {
                        ElMessage({
                            type: 'info',
                            message: '删除失败',
                        });
                        loadingInstance.close()
                    })
                }).catch(()=>{
                    ElMessage({
                        type: 'info',
                        message: '已取消删除',
                    });
                })

            }
            

            return {
                id,
                deleteId,
                tableData,
                beginTime,
                endTime,
                count,
                addappointment,
                deleteappointment,
                deleteAllAppointment
            }
        }
    }
</script>

<style lang="scss" scoped>
    .process{
        display: flex;
        justify-content: space-between;

        .block{
            width: 600px;
            height: 300px;
            margin-top: 40px;
            .demonstration{
                color: #fff;
            }
            // 分割线
            .el-divider {
                width: 70%;
            }

        }
    }

</style>