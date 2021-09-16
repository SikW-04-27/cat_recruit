import { getCurrentStatus } from '../request/api'

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


//有关状态判断的函数
//用户是否已经报名;暂时用getBriefInfo去判断
export function isSignup() {
    getBriefInfo({}).then(res => {
        if (res.code === 1450) {
            //用户进度查询失败，请先报名
            window.sessionStorage.setItem("hasSignUp", false);
            return false;
        }
        if (res.code === 1650) {
            window.sessionStorage.setItem("hasSignUp", false);
            return true;
        }
    })
}

//获取当前阶段
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