import { getCurrentStatus, checkEnroll, } from '../request/api'

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
//定义success函数
export function success(successMessage) {
    ElMessage.success({
        message: successMessage,
        type: "success",
    });
}


//有关状态判断的函数:

//用户是否已经报名;
export function checkEnroll() {
    checkEnroll({}).then(res => {
        //返回boolean；true/false
        return res.data.isEnroll;
    }).catch(err => {
        warning(err.message + "checkEnroll")
        return false;
    })
}

//获取当前阶段，返回的是目前阶段的状态码
export function getCurrentStatus() {
    getCurrentStatus({}).then(res => {
        if (res.code === 1600) {
            //返回阶段状态码
            return res.data.id;
        }
        if (res.code === 1400) {
            warning(res.message + "usualUse.js45")
        }
    }).catch(err => {
        warning(err.message + "usualUse.js48")
    })
}

//