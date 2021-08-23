<template>
    <div class="status">
        <div class="nowstatus">{{status_value}}</div>
        <div class="modifystatus">
            <el-button type="primary" icon="el-icon-arrow-left" @click="left" :disabled='leftable'>上一阶段</el-button>
            <el-button type="primary" icon="el-icon-arrow-right" @click="right" :disabled='rightable'>下一阶段</el-button>
        </div>
        
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ElLoading } from 'element-plus';
import {getCurrentStatus,updateStatus,updateStatusOnTest,toPreviousStatus} from '../../../request/api'
    export default {
        setup(props) {
            let status_value = ref('');
            let leftable = ref(false)
            let rightable = ref(false)

            // 获取状态并显示的函数封装
            let getStatus = function(able){
                getCurrentStatus().then(res => {
                    status_value.value = res.data.status;
                    if(status_value.value === '招新未开始'){
                        leftable.value = true;
                        return
                    }
                    if(able === 'right'){
                        leftable.value = false;
                        if( status_value.value === '最终考核'){
                            rightable.value = true;
                        }else{
                            rightable.value = false
                        }
                    }else{
                        rightable.value = false;
                        if( status_value.value ===  '招新未开始'){
                            leftable.value = true;
                        }else{
                            leftable.value = false;
                        }
                    }
                })
            }

            // 刷新页面之后显示状态
            onMounted(()=>{
                let loadingInstance = ElLoading.service({background:'transparent',target:'.nowstatus'});
                getStatus( 'right');
            })

            // 点击上一阶段
            let left =function(){
                let loadingInstance = ElLoading.service({background:'transparent',target:'.nowstatus'});
                toPreviousStatus().then(res => {
                    getStatus('left');
                })
            }

            // 点击下一阶段
            let right = function(){
                let loadingInstance = ElLoading.service({background:'transparent',target:'.nowstatus'});
                updateStatus().then(res => {
                    getStatus('right');
                })
            }

            return {
                status_value,
                leftable,
                rightable,
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