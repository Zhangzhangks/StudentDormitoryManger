// 定义分类相关的api接口函数
import request from "../utils/request";
const baseURL = 'http://127.0.0.1:3007'
import axios from "axios";
const baseURL2 = 'http://127.0.0.1:3008'
    /**
     * 
     */
    // 学生注册
export const reg_student = (data) => {
        console.log('注册', data);
        return axios({
            method: 'post',
            url: `${baseURL}/api/register`,
            data: data,
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

// 学生登陆
export const login_student = (postvalue) => {
    return axios({
        method: 'post',
        url: `${baseURL}/api/login`,
        data: postvalue,
        headers: {
            ' Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}



// 学生登陆手机
export const loginPhone_student = (data) => {
    // console.log(data);
    return axios({
        method: 'post',
        url: `${baseURL}/api/phoneLogin`,
        data: data,
    })
}

/**
 *  // 获取学生的信息
 */
export const getStudentValue = () => {
    return request("/path/my/getvalue", 'get', )
}

/**
 *  // 获取所有学生的信息
 */
export const getAllStudentValue = (reqparams) => {
    return request("/path/my/getAllstudent", 'get', reqparams)
}


/**
 *  更改密码
 * @param {传递的对象} value 
 * @returns  新密码和旧密码
 */
export const updatePwd = (value) => {

    return request("/path/my/updatepwd", 'POST', {...value })
}


/**
 * 更改用户名
 * @param {传递的对象} val 
 * @returns  用户名
 */
export const updateusername = (val) => {

    return request("/path/my/updatename", 'post', val)
}


// 上传头像
export const UploadUserPic = (data) => {
    // console.log(data, '头像');
    return axios({
        method: 'post',
        url: `${baseURL2}/api/upload`,
        data: data,

    })
}

// 根据筛筛选条件获取数据

export const getFilterValue = (data) => {
    console.log(data, '单个');
    return request("/path/my/getFilterValue", 'post', data)
}

// 详情数据
export const getDetailStudent = (userid) => {

    return request(`/path/my/getStudentDetail/${userid}`, 'get', )
}


// 删除数据
export const deleteStudent = (userid) => {
    console.log(userid, '删除');
    return request(`/path/my/deteleUser/${userid}`, 'get', )
}

// 拿到楼栋数据
export const getBuild = (data) => {
    return request(`/path/my/getBuild`, 'post', data)
}

// 根据房间楼层查询学生
export const getBuildFloor = (data) => {
    return request(`/path/my/getBuildFloor`, 'post', data)
}

// 根据房间楼层查询学生
export const getBuildBedRoom = (data) => {
    return request(`/path/my/getBuildBedRoom`, 'post', data)
}

// 根据房间楼层查询学生
export const getBuildBedRoomStudent = (data) => {
    return request(`/path/my/getBuildBedRoomStudent`, 'post', data)
}