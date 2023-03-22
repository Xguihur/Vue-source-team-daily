// 5.  讲了 vue 是如何监听数据的变化，object.defined...，get和set属性。通过这个api拦截用户的取值与赋值。notify的调用时机是在 set 内部

// 6.  实现了vue中的getter，好强啊！！！在Observe方法中用了Object.keys循环为每个属性监听get属性，同时set属性也监听了一下并且在拦截器中完成了赋值操作！！！如果没有拦截的话，重新打印还是之前的值，有点好奇这是为什么？而且这个Observe方法是在哪里被调用的很好奇

// 7.  使用递归为对象上的所有属性赋值，考虑到对象里面嵌套对象的情况（看完了但是还是有点懵，他直接在Observe的入口判断是不是对象，如果不是对象就直接return，这里没理解）
// 哦哦！确实在入口判断就好了，因为一开始一定是一个对象，所以第一层的节点都直接拿到了，在赋值之后用递归拦截一下，如果不是对象就直接return出去，执行下面的 劫持操作！！！老师说不做数组的处理，单从对象进行理解就好

class Vue {
  constructor(options) {
    // 原来 data 是返回给 类的实例属性的，这样子全局通过 Vue.$data 都能拿到值
    this.$data = options.data

    // 定义一个 Observe 方法，使用 defineProperty 监听对象的每一个属性
    Observe(this.$data)

    // 下面是用于区分之前走入‘误区’的代码详细过程
    // ！！！ 对象的属性被拦截之后是不会再有默认功能了，如果不做操作，get返回 undefined， set 不会做赋值操作
    // Object.keys(this.$data).forEach(key => {
    //   let value = this.$data[key] //使用闭包实现数据的获取，在被监听之前就创建了这个 value 变量，之后如果 get 操作直接拿值就好了，set 操作就改这个值，避免造成循环引用的问题了

    //   Object.defineProperty(this.$data, key, {
    //     enumerable: true,
    //     configurable: true,
    //     get() {
    //       console.log('执行了 get')
    //       // return this.$data[key]//循环引用
    //       return value
    //     },
    //     set(newValue) {
    //       // this.$data[key] = newValue//循环引用
    //       console.log('执行了 set')
    //       value = newValue
    //     }
    //   })
    // })

    // console.log(Object.keys(this.$data))
    // Object.keys(this.$data).forEach(key => {
    //   // console.log(this[key])
    //   let value = this.$data[key]
    //   console.log(value)
    //   Object.defineProperty(this.$data, key, {
    //     enumerable: true,
    //     configurable: true,
    //     get: () => {
    //       // console.log(this)
    //       console.log('执行了 getter 操作')
    //       // console.log(this)
    //       // console.log(key)
    //       return value
    //     },
    //     set: newValue => {
    //       console.log('执行了 setter 操作')
    //       // this.$data[key] = newValue
    //     }
    //   })
    // })
    // 不用箭头函数看看 this 是啥
    // Object.keys(this.$data).forEach(function fb(key) {
    //   console.log(key) //name age info
    //   console.log(this) //undefinded  说明 forEach内部是不绑定 this 的
    // })
  }
}
// 定义一个方法监听所有的 key 属性，加入递归
function Observe(obj) {
  // 如果obj不存在或者不为对象，那就直接return，让这个属性直接执行下面的代码 进行监听
  if (!obj || typeof obj !== 'object') return

  Object.keys(obj).forEach(key => {
    // 如果是对象的话，那就进入到这里面，将 value 进行递归，对象里面的基本属性也被监听到。如果对象里面还有对象，那太好了，继续递归
    let value = obj[key]
    Observe(value) //很关键的递归，保证出来之后的 value 如果是对象，那么内部的属性一定都被监听到了
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log('执行了 get')
        return value
      },
      set(newValue) {
        console.log('执行了 set')
        value = newValue
        // 为了保证重新赋值的对象也会被监听，那么在这里执行以下 Observe 方法（但是有一个问题，如果是对象确实是会继续监听，但是如果一开始就不是对象，直接return，那不就还是没有监听到吗？）
        // 解决上面的疑惑：通过实践发现，这个属性本来就被监听了的，如果赋值不是一个对象，那没有关系，但是如果赋值的是对象，那就要对 对象里面的数据 也进行监听
        // 例如：info:{age:18,height:170}   info = 'guihur'  那没问题，因为这个 info 已经被监听着了
        Observe(value)
      }
    })
  })
}
