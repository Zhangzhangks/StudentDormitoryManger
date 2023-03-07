//学生模块
export default {
    namespaced: true,
    state() {
        return {
            //用户信息
            profile: {
                st_id: '',
                st_username: '',
                st_password: '',
                st_gender: '',
                st_userId: '',
                st_pic: '',
                st_age: '',
                st_phone: '',
                st_class: '',
                st_major: '',
                token: ''
            },
            redirectUrl: '/'
        }

    },
    mutations: {
        assignValue(state, playload) {

            state.profile = playload
        }
    }
}