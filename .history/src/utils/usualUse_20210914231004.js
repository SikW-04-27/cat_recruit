import { getCurrentStatus, checkEnroll, } from '../request/api'

//封装了获取.value/session的函数
import { ElMessage } from "element-plus";

//getObjValue
export function getObjValue(Obj) {
    return Obj.value;
}

//getSessionValue
export function getSessionValue(key) {
    return window.sessionStorage.getItem(key);
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
export async function checkEnrolls() {
    let result = checkEnroll({}).then(res => {
        //返回boolean；true/false
        console.log(111111111);
        return true;
    }).catch(err => {
        warning(err.message + "checkEnroll")
        return false;
    })
    return result
}

//获取当前阶段，返回的是目前阶段的状态码
export function getCurrentStatusId() {
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

//返回当前阶段的字符串
export function CurrentStatus() {
    getCurrentStatus({}).then(res => {
        if (res.code === 1600) {
            //返回阶段状态码
            console.log("diaoyongle");
            return res.data.status;
        }
        if (res.code === 1400) {
            warning(res.message + "usualUse.js45")
        }
    }).catch(err => {
        warning(err.message + "usualUse.js48")
    })

}