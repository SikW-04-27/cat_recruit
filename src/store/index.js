import { createStore } from 'vuex'


const actions = {}

const mutations = {}

const state = {
    register: {
        // indetity 判断注册的身份，学生为1， 管理员为0
        identity: Number,
        student: {
            studentMail: String,
            studentPassword: String
        },

        manager: {
            managerMail: String,
            managerPassword: String,
            managerKey: String
        }


    }
}

const store = createStore({
    state,
    actions,
    mutations
})

export default store