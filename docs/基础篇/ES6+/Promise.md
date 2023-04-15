# Promise

`Promise` 是 ES6 的重要特性之一，通过使用 `Promise`，可以避免回调地狱。

## 基本用法

### 构造实例

`Promise` 可以接收一个参数，被用作构造函数调用。这个参数通常是一个包含异步任务的函数。

```JS
const promise = new Promise((resolve, reject) => { })
```

这个函数的参数包含 `resolve` 和 `reject` 两个方法，用于更改实例状态和传值。

### 实例状态

`Promise` 构造的实例对象中包含一个特殊的属性 `[[PromiseState]]` 保存了实例的状态，一共三个值：
- `pending`: 初始状态
- `fulfilled`: 意味着操作成功完成
- `rejected`: 意味着操作失败

实例的状态只能从 `pending` 变为 `fulfilled` 和 `rejected` 中的任一种，状态一旦更改，就不能再变化。

### 实例方法

`Promise` 实例包含 `then(fn)`、`catch(fn)` 两个重要方法。

```JS
const promise = new Promise((resolve, reject) => { 
  resolve('value')
 })
promise.then(() => { })
promise.catch((err) => { })
```

- `resolve()`：状态从 `pending` 改为 `fulfilled`。事件循环检测到此状态，会执行 `then(cb)` 的回调函数
- `reject()`：状态从 `pending` 改为 `rejected`。事件循环检测到此状态，会执行 `catch(cb)` 的回调函数

### 静态方法

`all()`
`reject()`
`resolve()`
