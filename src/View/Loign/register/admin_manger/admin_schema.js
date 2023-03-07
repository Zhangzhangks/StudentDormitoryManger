export const checkName = (rule, value, callback) => {
    const reg = /^admin[\S]{1,5}$/
    console.log(value);
    if (!value) {
        return callback(new Error('请输入姓名'))
    }
    if (!reg.test(value)) return callback(new Error('请以admin开头并且长度1-5位'));
    callback()
}

export const checkUserID = (rule, value, callback) => {
    const reg = /^\d{5}$/
    if (!value) {
        return callback(new Error('请输入学号'))
    }
    if (!reg.test(value)) return callback(new Error('请输入五位整数'));
    callback()
}
export const checkgender = (rule, value, callback) => {
    const reg = /^[男|女]{1}$/
    if (!value) {
        return callback(new Error('请输入性别'))
    }
    if (!reg.test(value)) return callback(new Error('请输入男女 '));
    callback()
}
export const checkage = (rule, value, callback) => {
    const reg = /^\d{1,3}$/
    if (!value) {
        return callback(new Error('请输入年龄'))
    }
    if (value <= 0 || value > 100) {
        return callback(new Error('请输入有效年龄'))
    }
    if (!reg.test(value)) { return callback(new Error('请输入整数数字')) }
    callback()
}

export const checkphone = (rule, value, callback) => {
    const reg = /^1[3|4|5|7|8|9]\d{9}$/
    if (!value) {
        return callback(new Error('请输入手机号'))
    }
    if (!reg.test(value)) { return callback(new Error('请输入合法手机号')) }
    callback()
}

export const checkbuild = (rule, value, callback) => {
    const reg = /^[\S]+$/
    if (!value) {
        return callback(new Error('请输入楼栋'))
    }
    if (!reg.test(value)) { return callback(new Error('请输入1-20位楼栋名称')) }
    callback()
}


export const checkpwd = (rule, value, callback) => {
    const reg = /^[A-Za-z0-9.+-]{1,20}$/
    if (!value) {
        return callback(new Error('请输入密码'))
    }
    if (!reg.test(value)) { return callback(new Error('请输入1-20位密码,且不会含中文')) }
    callback()
}