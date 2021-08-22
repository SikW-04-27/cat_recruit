//该文件专门用于创建整个应用的路由器
import { createRouter, createWebHistory } from 'vue-router'

import Introduction from '../views/introduction/Introduction.vue'
import Register from '../views/register/Register.vue'
import CheckRegistered from '../views/manage/check/CheckRegistered.vue'
import CheckPersonal from '../views/manage/check/CheckPersonal.vue'
import CheckCenter from '../views/manage/check/CheckCenter.vue'
import ModifyCenter from '../views/manage/operation/ModifyCenter.vue'
import ModifyRating from '../views/manage/operation/ModifyRating.vue'
import ModifyRatingList from '../views/manage/operation/ModifyRatingList.vue'
import CheckDetialPoint from '../views/manage/check/CheckDetialPoint.vue'
import ModifyProcess from '../views/manage/operation/ModifyProcess.vue'
import Login from '../views/login/Login.vue'
import StudentRegister from '../views/register/children/StudentRegister.vue'
import ManageRegister from '../views/register/children/ManageRegister.vue'
import News from '../views/news/News.vue'
import Appoint from ''

const router = createRouter({  
    history: createWebHistory(),  
    routes:[

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
        },

        // 登录界面
        {
            path: '/login',
            name: '',
            component: Login,

        },

        // 注册界面
        {
            path: '/register',
            name: '',
            component: Register,
            children: [

                // 学生注册
                {
                    name: '',
                    path: '',
                    component: StudentRegister,
                },

                {
                    name: '',
                    path: 'studentRegister',
                    component: StudentRegister,  
                },

                // 管理员注册
                {
                    name: '',
                    path: 'manageRegister',
                    component: ManageRegister,
                },
            ]
        },

        //查看已报名学生
        {
            path:'/checkregistered',
            name:'',
            component: CheckRegistered,
        },

        // 查看学生的报名表
        {
            path:'/checkpersonal',
            name:'',
            component: CheckPersonal,
        },

        //查看管理员个人中心
        {
            path:'/checkcenter',
            name:'',
            component: CheckCenter,
        },

        //修改管理员信息
        {
            path:'/modifycenter',
            name:'modifycenter',
            component: ModifyCenter,
        },

        //对学生进行评分评价
        {
            path:'/modifyrating',
            name:'modifyrating',
            component: ModifyRating,
        },

        //全部学生的评分
        {
            path:'/modifyratinglist',
            name:'',
            component: ModifyRatingList, 
        },

        //查看详细分数信息
        {
            path:'/checkdetialpoint',
            name:'checkdetialpoint',
            component: CheckDetialPoint, 
        },

        //修改进程
        {
            path:'/modifyprocess',
            name:'modifyprocess',
            component: ModifyProcess, 
        },

        {
            name: '',
            path: '/manageRegister',
            component: ManageRegister
        },

        {
            name: '',
            path: '/news',
            component: News
        }

    ]
})

export default router