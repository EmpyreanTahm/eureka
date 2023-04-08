# Iterator

在 ES6 之前，遍历数据的方案主要是 `for/while`、`forEach`、`for...in` 等。在面对某一特定类型的数据时，有些方案无法使用：
- 字符串：`for/while`、`for...in`
- 数组：`for/while`、`forEach`、`for...in`
- 对象：`for...in`

使用 `for...in` 遍历对象时，不仅会遍历对象自身的可枚举属性，也会遍历对象原型链上的新增属性，这往往需要通过 `hasOwnProperty()` 限制遍历范围。

在 ES5 的时代，集合数据无法使用统一的遍历方法进行数据获取。ES6 提供了 `for...of` 循环，作为遍历所有数据结构的统一方法。实际上，`for...of` 循环只是语法糖，其背后的机制是 Iterator。

## `[Symbol.iterator]`

Iterator 意为迭代器，本质上是一种接口，为不同数据结构提供统一的数据访问机制。

在 ES 中，对象都有一个特殊的 `[Symbol.iterator]` 属性，该属性指向一个**迭代器方法**，实现 Iterator 接口等价于实现 `[Symbol.iterator]` 属性指向的迭代器方法。

### 可迭代对象

实现 Iterator 接口的对象叫做**可迭代对象**，任何可迭代对象都可以通过 `for...of` 遍历。实际上，Iterator 接口的主要作用就是供 `for...of` 消费。

```JS
function isIterable(o) {
  return typeof o[Symbol.iterator] === "function"
}
```

### 迭代器对象

执行 `o[Symbol.iterator]()` 后返回一个**迭代器对象**，该对象具有 `next()` 方法，每次调用 `next()` 都会返回一个对象，包含两个属性：
- `value`：具体返回的值
- `done`：布尔值，表示集合是否遍历完成

迭代器方法中会维护一个指针，用于指向当前遍历位置，每调用一次 `next()` 方法，指针都会向尾移动。

```JS
const doubleArr = [1, 2, 3]
doubleArr[Symbol.iterator] = function () { // 实现 Iterator 接口
  const ctx = this
  let i = 0 // 遍历指针
  return {
    next: function () {
      let done = i >= ctx.length
      let value = !done ? ctx[i++] * 2 : undefined
      return { done, value } // 返回 done 属性告知 for...of 或 “next 调用” 遍历是否已结束
    }
  }
}

const iterator = doubleArr[Symbol.iterator]() // 迭代器对象，该对象包含 next() 方法
console.log(iterator.next()) // {done: false, value: 2}
console.log(iterator.next()) // {done: false, value: 4}
console.log(iterator.next()) // {done: false, value: 6}
console.log(iterator.next()) // {done: true, value: undefined}
```

以上 `doubleArr` 对象手动实现（重写）了迭代器方法 `doubleArr[Symbol.iterator]`，即实现了 Iterator 接口，此时可以通过 `for...of` 遍历数据。

```JS
for (const v of doubleArr) {
  console.log(v) // 2 \n 4 \n 6
}
```

## 原生 Iterator

许多数据类型都已经默认实现了 Iterator 接口，不需要手动实现该接口，就可以通过 `for...of` 遍历，包括：
- 字符串、数组、Map（不包含 WeakMap）、Set（不包含 WeakSet）
- 函数的 `arguments`
- DOM 中的 `NodeList`

需要注意，由于对象是无序的数据结构，因此原生默认并未实现 Iterator 接口，无法使用 `for...of` 遍历。遍历对象的值可以用 `for...of` 遍历 `Object.values()` 返回的数组，也可以手动实现 Iterator 接口：

```JS
Object.prototype[Symbol.iterator] = function () { // 为所有对象实现 Iterator 接口
  const values = Object.values(this)
  let i = 0
  return {
    next: function () {
      let done = i >= values.length
      let value = !done ? values[i++] : undefined
      return { done, value }
    }
  }
}

const obj = { 1: 'a', 2: 'b' }
for (const v of obj) {
  console.log(v) // a \n b
}
const iterator = obj[Symbol.iterator]()
console.log(iterator.next()) // {done: false, value: 'a'}
console.log(iterator.next()) // {done: false, value: 'b'}
console.log(iterator.next()) // {done: true, value: undefined}
```

## 消费 Iterator

前文提到，Iterator 接口主要供 `for...of` 消费，实际上还可以通过其它方式消费 Iterator。

### `for...of`

当执行 `for...of` 时，引擎首先调用遍历对象的 “迭代器方法”，依次执行其返回的 `next()` 方法，并将返回对象的 `value` 赋值给 `for...of` 内的变量，当 `done` 为 `true` 时遍历结束。

`for...of` 消费 Iterator 接口时，可以通过 `break` 或 `throw` 抛出异常来中断遍历。这两种方式在终止遍历时，会先执行迭代器对象的 `return()` 方法，该方法必须返回一个对象。

```JS
Object.prototype[Symbol.iterator] = function () {
  const values = Object.values(this)
  let i = 0
  return {
    next: function () {
      let done = i >= values.length
      let value = !done ? values[i++] : undefined
      return { done, value }
    },
    return() {
      console.log('STOP') // 两个 for 循环各执行一次打印
      return { done: true }
    }
  }
}

const obj = { 1: 'a', 2: 'b', 3: 'c' }
for (const v of obj) {
  console.log(v) // a
  if (v === 'a') break
}
for (const v of obj) {
  console.log(v) // a
  if (v === 'a') throw new Error()
}
```

### 解构赋值

解构赋值可迭代对象时，会默认调用迭代器方法。普通对象由于是不可迭代对象，解构赋值会报错。

```JS
const str = 'eureka'
const [char1, char2] = str
console.log(char1, char2) // e u

const arr = [1, 2, 3]
const [num1, num2] = arr
console.log(num1, num2) // 1 2

const [name1] = { name: 'eureka' } // Uncaught TypeError: {(intermediate value)} is not iterable
```

### 扩展运算符 `...`

扩展运算符可以将当前迭代对象转换为数组，默认会调用迭代器方法。普通对象转为数组会报错。

```JS
const set = new Set()
set.add(0).add(1).add(3)
console.log([...set]) // [0, 1, 3]

const obj = { name: 'eureka' }
console.log({ ...obj }) // {name: 'eureka'}，相当于浅拷贝
console.log([...obj]) // Uncaught TypeError: obj is not iterable
```

### 作为数据源

某些 API 方法接收参数是一个数组时，会默认调用其迭代器，如 `new Map()`、`new Set()` 和 `Array.from()` 等。

### `yield`

使用 `yield` 关键字时也会调用迭代器方法。`yield` 属性 Generator 生成器的内容，Generator 生成器可以作为生成迭代器的语法糖使用。

## 总结

- `for...of` 是 ES6 提供的一种统一遍历数据的语法，其内部执行机制是 Iterator
- Iterator 本身是一个接口，实现该接口，就是实现对象的 `[Symbol.iterator]` 属性指向的迭代器方法
- 迭代器方法调用后返回迭代器对象，主要包含 `next()` 和 `return()` 方法
  - `next()` 方法用于返回值和遍历是否结束的状态
  - `return()` 方法在 `break`、`throw new Error()` 终止遍历时，会优先调用
