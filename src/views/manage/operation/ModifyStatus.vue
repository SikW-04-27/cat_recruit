<template>
    <div class="status">
        <div class="nowstatus">{{status_value}}</div>
        <div class="modifystatus">
            <el-button type="primary" icon="el-icon-arrow-left" @click="left">上一阶段</el-button>
            <el-button type="primary" icon="el-icon-arrow-right" @click="right" :disabled='able'>下一阶段</el-button>
        </div>
        
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ElLoading } from 'element-plus';
import {getCurrentStatus,updateStatus,updateStatusOnTest} from '../../../request/api'
    export default {
        setup(props) {
            let status_value = ref('');
            let able = ref(false)

            let getStatus = function(){
                getCurrentStatus().then(res => {
                    status_value.value = res.data.status;
                    if(status_value.value === '最终考核'){
                        able.value = true
                    }
                    console.log(status_value);
                })
            }

            onMounted(()=>{
                let loadingInstance = ElLoading.service({background:'transparent',target:'.nowstatus'});
                getStatus();
            })

            let left =function(){
                updateStatusOnTest({"id":7}).then(res => {
                    console.log(res);
                })
            }

            let right = function(){
                let loadingInstance = ElLoading.service({background:'transparent',target:'.nowstatus'});
                updateStatus().then(res => {
                    console.log(res);
                    getStatus();
                })
            }

            return {
                status_value,
                able,
                left,
                right
            }
        }
    }
</script>

<style lang="scss" scoped>
    .status{
        width: 600px;
        height: 300px;
        margin: 20px auto;
        text-align: center;
        .nowstatus{
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background-color: aqua;
            margin: 0 auto;
            padding-top: 75px;
            font-size: 30px;
            margin-bottom: 20px;
        }
        .modifystatus{
            width: 300px;
            display: flex;
            margin: 0 auto;
            justify-content: space-between;
        }
    }
</style>