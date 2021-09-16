//封装了获取.value/session的函数

//getObjValue
export function getObjValue(Obj) {
    return Obj.value;
}

//getSessionValue
export function getSessionValue(key) {
    return JSON.parse(windoe.sessionStorage.getItem(key));
}

//din