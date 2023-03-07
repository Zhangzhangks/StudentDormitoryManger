export const checkBdName = (rule, value, callback) => {
    const reg = /^[\S]{1,10}$/

    if (!value) {
        return callback(new Error('请输入楼栋名称'))
    }
    if (!reg.test(value)) return callback(new Error('长度1-10位'));
    callback()
}

export const checkBdId = (rule, value, callback) => {
    const reg = /^\d{5}$/
    if (!value) {
        return callback(new Error('请输入楼栋编号'))
    }
    if (!reg.test(value)) return callback(new Error('请输入5位整数'));
    callback()
}
export const checkBdFloor = (rule, value, callback) => {
    console.log(value);
    const reg = /^\d{1,2}$/
    if (!value) {
        return callback(new Error('请输入楼栋层数'))
    }
    if (!reg.test(value)) return callback(new Error('请输入整数'));
    if (value <= 0 || value > 10) return callback(new Error('请输入1-10以内'));
    callback()
}
export const checkBdDornum = (rule, value, callback) => {
    console.log(typeof value);
    const reg = /^\d{1,2}$/
    if (!value) {
        return callback(new Error('请输入楼栋宿舍数'))
    }
    if (!reg.test(value)) return callback(new Error('请输入整数'));
    if (value <= 0 || value > 10) return callback(new Error('请输入1-10以内'));
    callback()
}
export const checkBdAddress = (rule, value, callback) => {
    const reg = /^[\S]{1,10}$/

    if (!value) {
        return callback(new Error('请输入楼栋位置'))
    }
    if (!reg.test(value)) return callback(new Error('长度1-10位'));
    callback()
}
export const checkBdDorName = (rule, value, callback) => {
    const reg = /^[\S]{1,10}$/

    if (!value) {
        return callback(new Error('请输入楼栋宿管姓名'))
    }
    if (!reg.test(value)) return callback(new Error('长度1-10位'));
    callback()
}