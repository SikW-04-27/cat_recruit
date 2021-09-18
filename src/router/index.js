//该文件专门用于创建整个应用的路由器
import { createRouter, createWebHistory } from 'vue-router'

import Introduction from '../views/introduction/Introduction.vue'
import Recruit from '../views/introduction/children/Recruit.vue'
import Banner from '../views/introduction/children/Banner.vue'
import Works from '../views/introduction/children/Works.vue'
import Life from '../views/introduction/children/Life.vue'

//管理端组件
// import CheckRegistered from '../views/manage/check/CheckRegistered.vue'
// import CheckPersonal from '../views/manage/check/CheckPersonal.vue'
// import CheckCenter from '../views/manage/check/CheckCenter.vue'
// import ModifyCenter from '../views/manage/operation/ModifyCenter.vue'
// import ModifyRating from '../views/manage/operation/ModifyRating.vue'
// import ModifyRatingList from '../views/manage/operation/ModifyRatingList.vue'
// import CheckDetialPoint from '../views/manage/check/CheckDetialPoint.vue'
// import ModifyProcess from '../views/manage/operation/ModifyProcess.vue'
// import ModifyStatus from '../views/manage/operation/ModifyStatus.vue'
// import ModifyQueue from '../views/manage/operation/ModifyQueue.vue'

import LoginRegister from '../views/login/LoginRegister.vue'
import Login from '../views/login/children/Login.vue'
import Register from '../views/login/children/Register.vue'
// import StudentLogin from '../views/login/children/StudentLogin.vue'
// import ManagerLogin from '../views/login/children/ManagerLogin.vue'
// import StudentRegister from '../views/register/children/StudentRegister.vue'
// import ManageRegister from '../views/register/children/ManageRegister.vue'
import News from '../views/news/News.vue'
import Appointment from '../views/appointment/Appointment.vue'
import Progress from '../views/progress/progress.vue'
import Form from '../views/signup/Form.vue'
import SignIn from '../views/signIn/signIn.vue'
import ForgetPass from '../views/forgetPassword/ForgetPass.vue'

const router = createRouter({
    history: createWebHistory(),
    mode: "hash",
    routes: [

        // 工作室介绍默认
        {
            path: '',
            name: '',
            component: Introduction,
        },

        // 工作室介绍
        {
            path: '/introduction',
            name: '',
            component: Introduction,
            children: [
                {
                    path: 'banner',
                    component: Banner
                },
                {
                    path: 'recruit',
                    component: Recruit
                },
                {
                    path: 'works',
                    component: Works
                },
                {
                    path: 'life',
                    component: Life
                }
            ]
        },

        // 登录注册
        {
            path: '/loginregister',
            name: '',
            component: LoginRegister,
            children: [
                {
                    path: 'login',
                    component: Login,
                },
                {
                    path: 'register',
                    component: Register,
                },
            ]
        },


        // 填写报名表
        {
            path: '/Form',
            name: '',
            component: Form,
        },

        // 预约面试时间
        {
            path: '/appointment',
            name: '',
            component: Appointment,
        },

        // 查看整体进度
        {
            path: '/progress',
            name: '',
            component: Progress,
        },

        // 用户进行签到
        {
            path: '/signIn',
            name: '',
            component: SignIn,
        },


        {
            name: '',
            path: '/news',
            component: News
        },

        {
            name: 'forgetPass',
            path: '/forgetPass',
            component: ForgetPass
        }

    ]
})

export default router