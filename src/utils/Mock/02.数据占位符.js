import Mock from 'mockjs'

/*
"数据|10-20" 随机生成多少个
"id|+1"：1 每次生成一个+1 的id  { id: 3, name: '张可顺' },
    { id: 1, name: '张可顺' },
    { id: 2, name: '张可顺' },
   
*/
const mock = Mock.mock({
        // "string": '@string' //大写小写数字 特殊字符
        // "string":'@string(1)' /// Random.string( length )
        // Random.string( pool, length ) 
        // lower 是从26个字母中随机五个小写的 upper是大写 symbol特殊字符
        // "string": "@string('lower', 5)"   // Random.string('lower', 5)
        // "string": "@string('upper', 5)"
        // "string": "@string('symbol', 5)"
        // "string": "@string('number', 5)"
        "string": "@string('zks', 3)", //自定义
        // Random.range( start, stop, step )
        // start
        // 必选。
        // 数组中整数的起始值。
        // stop
        // 可选。
        // 数组中整数的结束值（ 不包含在返回值中）。
        // step
        // 可选。

        // // 数组中整数之间的步长。默认值为 1。
        // Random.image( size, background, foreground, format, text )
        // "arr": "@range(1,10,4)",
        // "img": "@image(100x100,#ff0,#ccc,jpg,iamtext)"
    })
    // console.log(mock);

const data = Mock.mock({
    "list|10-20": [{
        "id|+1": 1,
        "name": "张可顺"
    }]
})
Mock.mock("/zkss", "get", () => {

    const { list } = data
    return { status: 200, datas: list }
})