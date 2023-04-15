# Promise

`Promise` 是 ES6 的重要特性之一，它可以避免回调地狱的问题，使异步代码更加易于理解和维护。

## 基本用法

### 构造实例

`Promise` 可以接收一个参数，被用作构造函数调用。这个参数通常是一个包含异步任务的函数。

```JS
const promise = new Promise((resolve, reject) => { })
```

这个函数的参数包含 `resolve` 和 `reject` 两个方法，用于更改实例对象状态和传值。

### 实例状态

`Promise` 构造的实例对象中包含一个特殊的属性 `[[PromiseState]]` 保存了实例的状态，一共三个值：
- `pending`: 初始状态
- `fulfilled`: 意味着操作成功完成
- `rejected`: 意味着操作失败

实例对象的状态只能从 `pending` 变为 `fulfilled` 和 `rejected` 中的任一种，状态一旦更改，就不能再变化。更改状态使用
- `resolve()`：状态从 `pending` 改为 `fulfilled`
- `reject()`：状态从 `pending` 改为 `rejected`

### 原型方法

`Promise` 原型的 `then(cb)`、`catch(cb)` 方法，用于绑定状态更改后的回调。事件循环会检测微任务队列中 `Promise` 的状态，如果状态为：
- `fulfilled`：会执行 `then(cb)` 的回调函数
- `rejected`：会执行 `catch(cb)` 的回调函数。

原型中的另一个 `finally(cb)` 方法中的回调函数，不管更改为何种状态始终都会执行。

```JS
const promise = new Promise((resolve, reject) => {
  resolve('resolved')
  reject('rejected') // 状态已被 resolve('resolved') 改为 fulfilled，这一步更改无效
}).then((response) => {
  console.log(response) // 'resolved'
}).catch((err) => {
  console.log(err) // 不会执行
})
```

### 链式调用

`Promise` 对象的 `then()` 方法返回一个新的 `Promise` 对象，这个返回的新对象的状态和值取决于 `then()` 方法中回调函数的返回内容：
- 返回值：新的 `Promise` 对象会被 `resolve`，其值就是回调函数的返回值
- 异常：新的 `Promise` 对象会被 `reject`，其值就是抛出的异常
- `Promise` 对象：新的 `Promise` 对象会和该 `Promise` 对象的状态和值同步

由于 `then()` 方法始终返回新的 `Promise` 对象，所以可以在 `then()` 方法上再次调用 `then()` 方法，形成链式调用。

```JS
new Promise((resolve, reject) => {
  setTimeout(() => resolve(1))
}).then((v) => {
  console.log(v) // 1
  return ++v
}).then((v) => {
  console.log(v) // 2
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(++v))
  })
}).then((v) => {
  console.log(v) // 3
})
```

### 静态方法

#### `Promise.all()`

`Promise.all(iterable)` 接收一个通常是数组的可迭代对象，将数组中的多个 `Promise` 对象包装成一个新的 `Promise` 对象，等待所有的 `Promise` 对象都 `resolve()` 后，才会将所有 `Promise` 对象的结果作为一个数组返回。

如果数组中有任何一个 `Promise` 对象被 `reject()`，那么返回的 `Promise` 对象就会被 `reject()`，并且它的值是第一个被 `reject()` 的 `Promise` 对象的 `reject()` 值。

#### `Promise.race()`

`Promise.race(iterable)` 接收一个通常是数组的可迭代对象，将数组中的多个 `Promise` 对象包装成一个新的 `Promise` 对象，只要任一 `Promise` 对象 `resolve()` 后，就会将该 `Promise` 对象的结果作为返回值返回。

如果数组中有任何一个 `Promise` 对象被 `resolve()` 或 `reject()`，那么返回的 `Promise` 对象就会被 `resolve()` 或 `reject()`，并且它的值是第一个被 `resolve()` 或 `reject()` 的 `Promise` 对象的值。

#### `Promise.resolve(value)`

返回一个被 `resolve()` 的 `Promise` 对象，该对象的值是传入的 `value` 参数。如果传入的是一个 `Promise` 对象，那么返回的就是这个 `Promise` 对象。

#### `Promise.reject(reason)`

返回一个被 `reject()` 的 `Promise` 对象，该对象的值是传入的 `reason` 参数。

## 手动实现 `Promise` 思路

这里将 `Promise` 状态为 `fulfilled` 统一称为功状态，为 `rejected` 统一称为失败状态。

### 基本结构

基本函数：
- `resolve(v)`：设置成功状态；存储返回值并作为后续回调的参数
- `reject(reason)`：设置失败状态；存储返回值并作为后续回调的参数

实例属性：
- `status`：存储状态
- `value`：存储 `resolve()` 的值，并作为参数传给后续回调函数
- `reason`：存储 `reject()` 的值，并作为参数传给后续回调函数
- `onFulfilledCallbacks`：成功的后续回调，`then()` 方法添加函数，`resolve()` 时依次执行
- `onRejectedCallbacks`：失败的后续回调，`then()` 方法添加函数，`reject()` 时依次执行

原型方法：
- `then(onFulfilled, onRejected)`
- `catch(onRejected)`：通过 `then()` 的第二个参数抛出异常

静态方法：
- `resolve(v)`：返回新的 `Promise` 对象，并在构造函数中 `resolve` 值
- `reject(reason)`：返回新的 `Promise` 对象，并在构造函数中 `reject` 值
- `all(iterable)`
- `race(iterable)`

### 关于 `then(onFulfilled, onRejected)`

`then()` 中可以设置成功和失败的回调，尽管通常都只实现成功的回调函数，并用 `catch()` 捕获异常。

`then()` 的链式调用中，可以将所有的 `onFulfilled` 和 `onRejected` 直接存储到两个对应的回调函数队列中，如果当前 `Promise` 的状态为：
- `pending`：意为着此时回调函数还无法执行，应该将 `onFulfilled` 函数推入 `onFulfilledCallbacks` 队列，将 `onRejected` 函数推入 `onRejectedCallbacks` 队列，一旦状态为成功或失败时，依次执行对应的回调函数队列
- `fulfilled`：意味着接下来应该执行 `onFulfilled` 函数
- `rejected`：意味着接下来应该执行 `onRejected` 函数

在连续的 `then()` 调用过程中，值始终会被上一次 `resolve()` 的值更新，因此每一次回调函数获取的返回值都是最新的值。

### 代码

```JS
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = v => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = v
        this.onFulfilledCallbacks.forEach(fn => fn(this.value))
      }
    }
    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn(this.reason))
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
      throw err
    }
    return new Promise((resolve, reject) => {

      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onFulfilled(this.value)
              result instanceof Promise ? result.then(resolve, reject) : resolve(result)
            })
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectedCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onRejected(this.reason)
              result instanceof Promise ? result.then(resolve, reject) : resolve(result)
            })
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.status === FULFILLED) {
        try {
          setTimeout(() => {
            const result = onFulfilled(this.value)
            result instanceof Promise ? result.then(resolve, reject) : resolve(result)
          })
        } catch (e) {
          reject(e)
        }
      }

      if (this.status === REJECTED) {
        try {
          setTimeout(() => {
            const result = onRejected(this.reason)
            result instanceof Promise ? result.then(resolve, reject) : resolve(result)
          })
        } catch (e) {
          reject(e)
        }
      }
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  static resolve(v) {
    return v instanceof Promise ? v : new Promise(resolve => resolve(v))
  }

  static reject(reason) {
    return new Promise((resolve, reject) => reject(reason))
  }

  static all(list) {
    const result = []
    let count = 0
    return new Promise((resolve, reject) => {
      for (let i = 0; i < list.length; i++) {
        Promise.resolve(list[i]).then(
          v => {
            result[i] = v
            count++
            if (count === list.length) resolve(result)
          },
          err => reject(err)
        )
      }
    })
  }

  static race(list) {
    return new Promise((resolve, reject) => {
      list.forEach(v => {
        Promise.resolve(v).then(
          v => resolve(v),
          err => reject(err)
        )
      })
    })
  }
}

new Promise()

```
