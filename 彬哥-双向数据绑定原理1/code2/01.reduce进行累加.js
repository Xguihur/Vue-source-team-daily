const arr = [3, 8, 9, 12, 89, 54, 37]

// 普通程序员的实现逻辑
// let total = 0
// arr.forEach((item) => {
//   total += item
// })

// console.log(total)

// 数组的 reduce 方法，会循环当前的数组，侧重于进行“滚雪球”操作
// 数组.reduce(函数, 初始值)
// 数组.reduce((上次计算的结果, 当前循环的Item项) => { }, 0)
// const 累加的结果 = 数组.reduce((上次计算的结果, 当前循环的Item项) => { return 上次的结果 + 当前循环的Item项 }, 0)

const total = arr.reduce((val, item) => { return val + item }, 0)
console.log(total)
