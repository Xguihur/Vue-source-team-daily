const obj = {
  name: 'zs',
  info: {
    address: {
      location: '北京顺义',
    },
  },
}

// const location = obj.info.address.location
// console.log(location)

const attrs = ['info', 'address', 'location']

// attrs.reduce(() => {}, obj)
// 第一次 reduce，
//        初始值是 obj 这个对象，
//        当前的 item 项是   info
//        第一次 reduce 的结果是 obj.info 属性对应的对象

// 第二次 reduce，
//        初始值是 obj.info 这个对象，
//        当前的 item 项是   address
//        第二次 reduce 的结果是 obj.info.address 属性对应的对象

// 第三次 reduce，
//        初始值是 obj.info.address 这个对象，
//        当前的 item 项是   location
//        第三次 reduce 的结果是 obj.info.address.location 属性的值

// const location = attrs.reduce((newObj, k) => { return newObj[k] }, obj)
const location = attrs.reduce((newObj, k) => newObj[k], obj)

console.log(location)
