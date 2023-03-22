class Vue {
  constructor(options) {
    this.$data = options.data

    // 调用数据劫持的方法
    // Observe(this.$data)

    // 属性代理
    Object.keys(this.$data).forEach(key => {
      // 我写的代码 this 执行不是 this.$data 对象，并且内部的 get 中不用箭头函数的话拿不到 this，不知道为什么老师的可以--我也没有去尝试老师的代码
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return this.$data[key]
        },
        set(newValue) {
          this.$data[key] = newValue
        }
      })
    })
  }
}

// 定义一个数据劫持的方法
function Observe(obj) {
  // 这是递归的终止条件
  if (!obj || typeof obj !== 'object') return

  // 通过 Object.keys(obj) 获取到当前 obj 上的每个属性
  Object.keys(obj).forEach(key => {
    // 当前被循环的 key 所对应的属性值
    let value = obj[key]
    // 把 value 这个子节点，进行递归
    Observe(value)
    // 需要为当前的 key 所对应的属性，添加 getter 和 setter
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log(`有人获取了 ${key} 的值：`)
        return value
      },
      set(newVal) {
        value = newVal
        Observe(value)
      }
    })
  })
}
