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

、、