# Generator

Generator 是 ES6 提供的一种异步编程解决方案，由于 Generator 的声明方式、行为和函数有相似点，一般也叫做 Generator 函数。

Generator 函数区别于普通函数的基本特征：
- 声明：`function` 关键字和函数名之间有一个 `*`，`*` 的位置很随意
- 内部可使用 `yield` 表达式
- Generator 函数执行后返回一个**迭代器对象**，调用其 `next()` 方法返回一个对象：
  - `value` 属性：就是 `yield` 表达式的值
  - `done` 属性：Generator 函数是否执行完毕

```JS
function* helloWorldGenerator() {
  yield 'Hello'
  console.log('INSERT')
  yield ', '
  yield 'World'
  return '!'
}

const hw = helloWorldGenerator()
console.log(hw.next()) // {value: 'Hello', done: false}
console.log(hw.next()) // {value: ', ', done: false}，本次调用会首先打印 'INSERT'
console.log(hw.next()) // {value: 'World', done: false}
console.log(hw.next()) // {value: '!', done: true}
console.log(hw.next()) // {value: undefined, done: true}
```

通过调用迭代器对象的 `next()` 方法，使内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到一下个 `yield` 或 `return`。而 `yield` 表达式就是暂停执行的标记，`next()` 方法用于恢复执行。从这个角度出发理解，可以将 Generator 函数看成是一个状态机，封装了多个内部状态。

## `yield` 表达式

Generator 函数返回的迭代器对象，在执行 `next()` 方法时，遇到 `yield` 就暂停执行后面的操作，并将 `yield` 表达式的值作为返回对象的 `value` 属性值。`yield` 后跟的表达式，只有在调用 `next()` 方法遇到它时才会执行计算（惰性求值）。

`yield` 必须搭配 Generator 函数使用，Generator 函数不使用 `yield` 时，就成了一个单纯的暂缓执行函数：

```JS
function* fn() {
  console.log('Hello, World!')
}
const generator = fn() // 函数内部并未执行，无打印内容
generator.next() // Hello, World!
```

## `next()` 传参

`yield` 表达式自身并没有返回值，其返回值始终是 `undefined`。可以通过 `next(T)` 方法传递一个参数，**作为上一个 `yield` 表达式自身的返回值**。

```JS
function* fn() {
  let i = 0
  while (true) {
    const reset = yield i
    reset && (i = 100)
    i++
  }
}

const g = fn()

console.log(g.next()) // { value: 0, done: false }
console.log(g.next()) // { value: 1, done: false }
console.log(g.next(true)) // { value: 101, done: false }
console.log(g.next()) // { value: 102, done: false }
```

以上代码，在第二次调用 `next()` 后，`i` 的值为 `1`。接下来的 `next()` 调用传入参数 `true` 作为上一次 `next()` 调用中 `yield` 表达式返回的值，也就是第二次调用 `next()` 后，`reset` 的值就是 `true`。在进行第三次调用时，`i` 首先会被赋值为 `100`，接着自增并返回 `101`。

## `Generator.prototype.throw()`

使用 Generator 的 `throw(E)` 方法，可以立即终止生成器，错误可以被 Generator 函数捕获。

```JS
function* fn() {
  let i = 0
  while (true) {
    try {
      const reset = yield i
      reset && (i = 100)
      i++
    } catch (e) { console.log(e) }
  }
}

const g = fn()

console.log(g.next()) // { value: 0, done: false }
console.log(g.next()) // { value: 1, done: false }
console.log(g.throw('Error')) // { value: 1, done: false }，会先打印 'Error'
console.log(g.next()) // { value: 2, done: false }
```

## `Generator.prototype.return()`

使用 Generator 的 `return([T])` 方法，可以设置返回值并立即终止生成器。

```JS
function* fn() {
  let i = 0
  while (true) {
    const reset = yield i
    reset && (i = 100)
    i++
  }
}

const g = fn()

console.log(g.next()) // { value: 0, done: false }
console.log(g.next()) // { value: 1, done: false }
console.log(g.return('Finished')) // { value: 'Finished', done: true }
console.log(g.next()) // { value: undefined, done: true }
```

`next()`、`throw()` 和 `return()` 在一定程度上是一致的，都是在修改上一个 `yield` 表达式自身的返回值。

`throw()` 的案例中，第三次执行 `next()` 时，`i` 为 `1`，`yield` 表达式被替换成 `throw('Error')` 语句，直接进入 `catch` 结构导致 `i` 并未执行自增。

`return()` 的案例中，第三次执行 `next()` 时，`yield` 表达式被替换成 `return 'Finished'` 语句，导致迭代结束。

## `yield*` 表达式

为方便多个嵌套的 Generator 函数的调用，ES6 提供了 `yield*` 表达式，用于在一个 Generator 函数里执行另一个 Generator 函数。

```JS
function* fn1() {
  yield 'b'
}
function* fn2() {
  yield 'a'
  yield* fn1()
  yield 'c'
}
const g = fn2()
console.log(g.next()) // {value: 'a', done: false}
console.log(g.next()) // {value: 'b', done: false}
console.log(g.next()) // {value: 'c', done: false}
console.log(g.next()) // { value: undefined, done: true }
```

## `for...of`

对象的 `[Symbol.iterator]` 属性是一个迭代器方法，执行后返回一个迭代器对象，可以通过 `for..of` 遍历。Generator 函数执行后一样返回一个迭代器对象，这个迭代器对象同样可以用 `for...of` 遍历。

```JS
function* fn() {
  yield 1
  yield 2
  yield 3
}
const g = fn()
console.log(g.next()) // {value: 1, done: false}
console.log(g.next()) // {value: 2, done: false}
console.log(g.next()) // {value: 3, done: false}
console.log(g.next()) // { value: undefined, done: true }
```

## 应用场景

### Iterator

有了 Generator 函数，可以更方便地为对象实现 Iterator 接口：

```JS
function* iterableEntries(o) {
  let keys = Object.keys(o);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i]
    yield [k, o[k]]
  }
}
// Object.prototype[Symbol.iterator] = function () {
//   const o = this
//   const keys = Object.keys(o)
//   let i = -1
//   return {
//     next: function () {
//       const k = keys[++i]
//       const done = i >= keys.length
//       const value = !done ? [k, o[k]] : undefined
//       return { done, value }
//     },
//   }
// }
const o = { a: 1, b: 2 }
for (let [k, v] of iterableEntries(o)) {
  console.log(k, v) // a 1 \n b 2
}
```

### 异步控制

Generator 函数实际上是一个状态机，可以将异步操作写在 `yield` 表达式里，每次异步操作回调中：传参调用 `next(T)` 让函数继续执行。这样就能以同步书写的方式去执行异步任务，避免回调的嵌套。以下的代码严格按照其在 `*main()` 中的顺序执行：

```JS
function* main() {
  console.log('START')
  const post1 = yield request('http://jsonplaceholder.typicode.com/posts/1')
  console.log(JSON.parse(post1)?.title)
  const post2 = yield request('http://jsonplaceholder.typicode.com/posts/2')
  console.log(JSON.parse(post2)?.title)
  console.log('END')
}
function request(url) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.send()
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      runner.next(xhr.responseText)
    }
  }
}
const runner = main()
runner.next()
```

## `async` 函数

`async` 函数可以看作 Generator 函数的语法糖，`await` 表达式表明其后跟的是异步任务，需要等待异步任务执行完成，再继续执行 `async` 主体内容。

`async` 函数以更舒适的方式使用 `Promise`，前述代码用 `async` 函数改写：

```JS
async function main() {
  console.log('START')
  const post1 = await fetch('http://jsonplaceholder.typicode.com/posts/1')
  console.log((await post1.json())?.title)
  const post2 = await fetch('http://jsonplaceholder.typicode.com/posts/2')
  console.log((await post2.json())?.title)
  console.log('END')
}
main()
```

`async` 函数对 Generator 函数的改进体现在：
- 内置执行器，无需手动 `next()` 调用
- `async` 和 `await` 在语义上比 `*` 和 `yield` 更加清楚
- `aynsc` 函数总是返回 Promise 对象，相较于 Generator 函数返回的迭代器对象，可以用 `then()` 进行下一步操作


