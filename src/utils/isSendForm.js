import { getStudentFormStatus, getCurrentStatus } from '../request/api'

import { getCookie } from './myCookie';

const studentFormStatus = [{
    code: 0,
    message: '用户未登录'
}, {
    code: 1,
    message: '报名阶段未开始'
}, {
    code: 2,
    message: '报名阶段结束'
}, {
    code: 3,
    message: '用户已经报名'
}, {
    code: 4,
    message: '用户可以报名'
}];

async function a() {

}


let currentStatusId, currentStatus, isSignUp;
export default function() {

    // 未登录
    if (!getCookie('studentToken')) {
        return studentFormStatus[0];
    } else {
        currentStatusId = JSON.parse(window.sessionStorage.getItem("CurrentStatus")).id;
        currentStatus = JSON.parse(window.sessionStorage.getItem("CurrentStatus")).status;
        //判断是否报名
        isSignUp = JSON.parse(window.sessionStorage.getItem("hasSignUp"));
    }

    // async function getCurrentRecruitStatus() {
    //     const 
    // }

    // getCurrentStatus().then(({ data }) => {
    //     console.log(data);

    // })
    if (currentStatusId === 0) {
        return studentFormStatus[1]
    } else if (currentStatusId > 1) {
        return studentFormStatus[2]
    }

    if(isSignUp) {
        return studentFormStatus[3]
    }

    return studentFormStatus[4]








    // getStudentFormStatus().then(({ data }) => {
    //     // data.isEnroll为true时为已经报名 
    //     if (data.isEnroll) {

    //     }
    // })
}





