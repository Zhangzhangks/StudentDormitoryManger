import request from "../utils/request";
/**
 *  添加楼栋 
 * 
 * */
export const addNewBuild = (data) => {
    // console.log('添加楼栋', data);
    return request("/path/my/regBuild", 'post', data)
}


/**
 *  
 * 获取所有楼栋楼栋 
 * 
 * */
export const getAllBuild = (reqparams) => {

    return request("/path/my/getBuild", 'get', reqparams)
}

// 详情数据
export const getDetailBuild = (build_identy) => {
    return request(`/path/my/getBuildDetail/${build_identy}`, 'get', )
}

// 删除楼栋
export const deleteAdminUser = (build_identy) => {

    return request(`/path/my/deleteBuild/${build_identy}`, 'get')
}

// 按照名字查楼栋
export const getDetailNameBuild = (build_name) => {
    return request(`/path/my/getBuildNameDetail`, 'post', { name: build_name })
}