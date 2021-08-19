//该文件专门用于创建整个应用的路由器
import { createRouter, createWebHistory } from 'vue-router'

import Introduction from '../views/introduction/Introduction.vue'
import Register from '../views/register/Register.vue'

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
            path: '/register',
            name: '',
            component: Register,

        }
    ]
})

export default router