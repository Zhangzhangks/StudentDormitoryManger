//学生模块
export default {
    namespaced: true,
    state() {
        return {
            //用户信息
            routerLists: [{
                name: 'home',
                path: '/main/home',
                label_name: '首页',
                id: 1
            }, ],
        }

    },
    mutations: {
        changeRouter(state, playload) {
            // console.log(playload);
            if (playload.name !== 'home') {
                const index = state.routerLists.findIndex(item => item.id === playload.id)
                if (index === -1) {
                    state.routerLists.push(playload)
                }
            }
            // console.log(state.routerLists);
        },
        deleteRouter(state, playload) {
            const index = state.routerLists.findIndex(item => item.id === playload.id);
            state.routerLists.splice(index, 1)
                // console.log(state.routerLists);
        }
    }
}