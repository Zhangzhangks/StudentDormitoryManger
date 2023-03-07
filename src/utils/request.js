import axios from "axios";
import store from '../Store/store';

export const baseURL = 'http://127.0.0.1:8000';
import { ElLoading } from 'element-plus'

const instance = axios.create({
    baseURL,
    timeout: 5000,
});

let loadingInstance = null;
instance.interceptors.request.use((config) => {

    loadingInstance = ElLoading.service({
        fullscreen: true,
        text: '正在加载中请稍后....',
        lock: true,
        lock: true


    });

    const token = store.state.user.profileStudent.token || store.state.user.profileAdmin.token;
    // 判断是否有token
    // console.log(token);
    if (token) {
        config.headers.Authorization = token;

    }
    return config
}, (error) => {
    return Promise.reject(err)
})

instance.interceptors.response.use((response) => {
    let timer = null;
    loadingInstance.close();
    clearTimeout(timer)
    timer = setTimeout(() => { loadingInstance.close(); }, 2000)
    return response.data
}, (err) => {
    if (err.response && err.response.status === 301) {
        ElNotification({
            title: 'Error',
            message: '响应失败',
            type: 'Error',
        })
    }
    return Promise.reject(err)
});


//请求工具函数  负责发送请求 地址 方式 数据
const request = (url, method, submitData) => {
    return instance({
        url,
        method,

        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData


    })

}
export default request