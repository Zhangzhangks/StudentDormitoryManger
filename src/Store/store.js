import { createStore } from 'vuex'
//让信息一直存在 ，即使刷新
import createPersistedState from 'vuex-persistedstate'
import tablist from './module/tablist'
import user from './module/user'
export default createStore({
    modules: {
        tablist,
        user
    },
    plugins: [createPersistedState({
        //本地存储名字
        key: 'dor_student',
        // 指定存储的模块
        path: ['admin', 'user']
    })]
})