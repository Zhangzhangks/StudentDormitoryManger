const importFn = require.context('./', false, /\.vue$/)

export default {
    install(app) {
        // app.component(XtxSkeleton.name, XtxSkeleton)
        // app.component(XtxCarousel.name, XtxCarousel)
        // app.component(XtxMore.name, XtxMore)
        // app.component(XtxBread.name, XtxBread)
        // app.component(XtxBreadItem.name, XtxBreadItem)

        // 批量注册全局组件
        importFn.keys().forEach(key => {
            // 导入组件
            const component = importFn(key).default
                // 注册组件
            app.component(component.name, component)
        })


    }
}