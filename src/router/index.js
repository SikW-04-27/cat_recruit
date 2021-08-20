//该文件专门用于创建整个应用的路由器
import { createRouter, createWebHistory } from 'vue-router'

import Introduction from '../views/introduction/Introduction.vue'
import Register from '../views/register/Register.vue'
import Login from '../views/login/Login.vue'
import StudentRegister from '../views/register/children/StudentRegister.vue'
import ManageRegister from '../views/register/children/ManageRegister.vue'
import News from '../views/news/News.vue'

const router = createRouter({  
    history: createWebHistory(),  
    routes:[
        {
            path: '',
            name: '',
            component: Introduction,
        },

        {
            path: '/introduction',
            name: '',
            component: Introduction,
        },

        {
            path: '/login',
            name: '',
            component: Login,

        },

        {
            path: '/register',
            name: '',
            component: Register,
            children: [
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

                {
                    name: '',
                    path: 'manageRegister',
                    component: ManageRegister
                }
            ]
        },

        {
            name: '',
            path: '/news',
            component: News
        }

    ]
})

export default router