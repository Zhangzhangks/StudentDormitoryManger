import request from "../utils/request";
/**
 *  
 * 报修
 * 
 * */
export const repair = (data) => {
    console.log(data);
    return request("/path/my/repair", 'post', data)
}

//拿取
export const GetrepairValue = () => {
        return request("/path/my/Getrepair", 'get', )
    }
    // 更新

export const UpdaterepairValue = (data) => {
    console.log(data);
    return request("/path/my/Updaterepair", 'post', data)
}