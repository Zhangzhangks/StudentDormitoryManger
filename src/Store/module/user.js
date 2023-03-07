//学生模块
export default {
    namespaced: true,
    state() {
        return {
            repairDesc: '',
            //用户信息
            profileStudent: {
                st_id: '',
                st_username: '',
                st_password: '',
                st_gender: '',
                st_userid: '',
                st_pic: '',
                st_age: '',
                st_phone: '',
                st_class: '',
                st_major: '',
                token: ''
            },
            redirectUrl: '/',
            //用户信息
            profileAdmin: {
                ad_id: '',
                ad_username: '',
                ad_password: '',
                ad_gender: '',
                ad_userid: '',
                ad_pic: '',
                ad_age: '',
                ad_phone: '',
                ad_building: '',

                token: ''
            },
        }

    },
    mutations: {
        assignStudentValue(state, playload) {
            // console.log(playload, '传递student');
            state.profileStudent = playload
        },
        assignAdminValue(state, playload) {
            // console.log(playload, '传递admin');
            state.profileAdmin = playload
        }
    }
}