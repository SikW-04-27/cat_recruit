import {getCurrentStatus} from '../request/api'

//封装了获取.value/session的函数
import { ElMessage } from "element-plus";

//getObjValue
export function getObjValue(Obj) {
    return Obj.value;
}

//getSessionValue
export function getSessionValue(key) {
    return JSON.parse(windoe.sessionStorage.getItem(key));
}


//定义warning函数
export function warning(warningMessage) {
    ElMessage.warning({
        message: warningMessage,
        type: "warning",
    });
}
//定义warning函数
export function success(successMessage) {
    ElMessage.success({
        message: successMessage,
        type: "success",
    });
}


//有关状态判断的函数
//用户是否已经报名
// export function isSign

//目前是否处于报名阶段
export function getCurrentStatus(){
    getCurrentStatus({}).then()
}