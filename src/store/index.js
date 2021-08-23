import { createStore} from 'vuex'


const actions = {}

const mutations = {}

const state = {
    studentInformation: {
        studentMail: '',
        studentpassword: ''
    }
}

const store = createStore({
    state,
    actions,
    mutations
})

export default store