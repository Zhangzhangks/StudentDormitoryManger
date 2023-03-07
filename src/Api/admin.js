// 定义分类相关的api接口函数
import request from "../utils/request";
const baseURL = 'http://127.0.0.1:3007'
import axios from "axios";
const baseURL2 = 'http://127.0.0.1:3009'
export const reg_admin = (datavlue) => {
        return axios({
            method: 'post',
            url: `${baseURL}/api/ad_register`,
            data: datavlue,
            headers: {
                ' Content-Type': 'application/x-www-form-urlencoded',
            },
        })
    }
    /**
     * 
     * @param {*} postvalue 登录数据 
     * @returns 
     */
export const login_admin = (postvalue) => {
    return axios({
        method: 'post',
        url: `${baseURL}/api/ad_login`,
        data: postvalue,
        headers: {
            ' Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

/**
 *  // 获取管理员的信息
 */
export const getAdminValue = () => {

    return request("/path/my/getadminvalue", 'get')
}

/**
 *  // 获取所有管理员的信息
 */
export const getAllAdminValue = (reqParams) => {
    return request("/path/my/getAllAdmin", 'get', reqParams)
}

// 上传头像
export const UploadAdminPic = (data) => {
    console.log(data, '头像管理');
    return axios({
        method: 'post',
        url: `${baseURL2}/api/upload`,
        data: data,

    })
}

/**
 *  更改密码
 * @param {传递的对象} value 
 * @returns  新密码和旧密码
 */
export const updateAdminPwd = (value) => {

    return request("/path/my/updateAdpwd", 'POST', {...value })
}

/**
 * 更改用户名
 * @param {传递的对象} val 
 * @returns  用户名
 */
export const updateAdminusername = (val) => {

        return request("/path/my/updateAdminname", 'post', val)
    }
    // 根据筛筛选条件获取数据

export const getFilterValueAdmin = (data) => {
    console.log(data, '单个admin');
    return request("/path/my/getFilterValueadmin", 'post', data)
}

// 详情数据
export const getDetailAdmin = (userid) => {
    return request(`/path/my/getAdminDetail/${userid}`, 'get', )
}


// 删除宿管
export const deleteAdminUser = (ad_userid) => {
    return request(`/path/my/deteleAdmin/${ad_userid}`, 'get')
}