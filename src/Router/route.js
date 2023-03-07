import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routesVal'
import store from '../Store/store'
const router = createRouter({
    history: createWebHashHistory(),
    routes
});


router.beforeEach((to, from, next) => {
    // 用户信息
    const token = store.state.user.profileAdmin.token ? store.state.user.profileAdmin.token : store.state.user.profileStudent.token
        // 跳转去member开头的地址却没有登录
    if (to.path.startsWith('/main') && !token) {
        return next('/login');
    }
    next()
})
export default router