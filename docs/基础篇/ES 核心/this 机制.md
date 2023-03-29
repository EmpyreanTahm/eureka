# `this` 机制

通过使用 `this`，可以在不同的上下文对象（`a` 和 `b`）中重复使用 `identify` 函数，而不用针对每个对象编写不同版本的函数。

```JS
function identify() {
  return this.name.toUpperCase()
}
const a = { name: "a" }
const b = { name: "b" }
identify.call(a) // a
identify.call(b) // b
```

如果不使用 `this`，那就需要给 `identify` 显式传入一个上下文对象。

```JS
function identify(ctx) {
  return ctx.name.toUpperCase()
}
const a = { name: "a" }
const b = { name: "b" }
identify(a) // a
identify(b) // b
```

`this` 提供了一种更优雅的方式来 “隐式传递” 一个**对象引用**，因此可以将 API 设计得更加简洁并且易于复用。随着使用模式越来越复杂，显式传递上下文对象会让代码变得越来越混乱，使用 `this` 则不会这样。

`this` 的绑定和函数声明的位置没有任何关系，`this` 实际上是在**函数被调用时发生的绑定**，`this` 的指向完全取决于**函数在哪里被调用**。

:::warning 注意
由于 `let` 和 `const` 不会将变量变成全局对象的属性，因此后续示例使用 `var` 声明变量，并在非严格模式运行。
:::

## 默认绑定

默认绑定发生在函数独立进行调用时的绑定规则，严格模式下，`this` 将指向 `undefined`，非严格模式下将指向全局对象。

```JS
function foo() {
  console.log(this.num) // 被调用时：this 指向 window 对象
}
var num = 2
foo() // 2
```

## 隐式绑定

隐式绑定发生在函数作为对象方法进行调用：

```JS
function foo() {
  console.log(this.num) // 被调用时：this 指向 obj 对象
}
var obj = { num: 2, foo: foo }
obj.foo() // 2
```

使用 `obj` 上下文来调用函数，此时函数中的 `this` 绑定到 `obj` 上下文对象。对象方法引用链中只有**最靠近函数调用的那一层会影响** `this` 指向：

```JS
function foo() {
  console.log(this.num) // 被调用时：this 指向 obj2 对象
}
var obj2 = { num: 2, foo: foo }
var obj1 = { num: 1, obj2: obj2 }
obj1.obj2.foo() // 2
```

### 隐式丢失

一个常见的 `this` 绑定问题就是：被隐式绑定的函数会丢失绑定对象，此时会应用默认绑定：

```JS
function foo() {
  console.log(this.num)
}

var obj = { num: 1, foo: foo }
var bar = obj.foo // bar 变成 foo 函数的别名
var num = 100
bar() // 100，此时 this 指向 window  对象
```

`bar` 是 `obj.foo` 的一个引用，它实际引用的是 `foo` 函数本身，因此此时的 `bar` 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时：

```JS
function foo() {
  console.log(this.num)
}
function doFoo(fn) {
  // 隐式赋值：var fn = obj.foo; fn()
  fn()
}
var obj = { num: 1, foo: foo }
var num = 100
doFoo(obj.foo) // 100
```

参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一个例子一样。把函数传入语言内置的函数同样会发生隐式丢失：

```JS
function foo() {
  console.log(this.num)
}
var obj = { num: 1, foo: foo }
var num = 100
setTimeout(obj.foo, 0) // 100

/*
function setTimeout(fn, delay) {
    fn() // 隐式赋值：var fn = obj.foo; fn()
}
*/
```

回调函数丢失 `this` 绑定十分常见。除此之外，在一些库或宿主环境中，事件处理器常会把回调函数的 `this` 强制绑定到触发事件的 DOM 元素上。

## 显示绑定

### `call(ctx[, arg1, arg2...])` 和 `apply(ctx[, argArray])`

如果不想在对象内部包含函数引用，而想在某个对象上强制调用函数，可以使用函数的 `call()` 和 `apply()` 方法。`call()` 和 `apply()` 方法的第一个参数是一个对象，它们会把 `this` 绑定到这个对象：

```JS
function foo() {
  console.log(this.num)
}
var obj = { num: 1 }
// 强制把 foo 函数的 this 绑定到 obj 上
foo.call(obj) // 1
```

`call()` 和 `apply()` 的区别在于前者传入其它参数用逗号 `,` 隔开，后者用一个数组传入其它参数。

### `bind(ctx[, arg1[, arg2[, ...]]])`

ES5 提供了函数方法 `bind()` 用于硬绑定，调用 `bind()` 会**返回一个硬编码的新函数**，这个函数的 `this` **始终指向参数对象**：

```JS
function sum(num) {
  return this.num + num
}
var obj = { num: 1 }
var bindSum = sum.bind(obj)
console.log(bindSum(100))// 101
console.log(bindSum(1000))// 1001
```

第三方库的许多函数，以及 ES 语言和宿主环境中的内置函数，基本都提供了一个可选的 “上下文（context）” 参数，以确保回调函数使用指定的 `this`：

```JS
var arr = [1, 2, 3]
var obj = { id: "awesome" }
arr.forEach(function (item) {
  console.log(item, this.id)
}, obj)
// 1 'awesome'
// 2 'awesome'
// 3 'awesome'
```

## `new` 绑定

在 ES 中，构造函数指使用 `new` 操作符调用的函数。使用 `new` 来调用函数，会自动执行下面的操作：
1. 创建一个新对象。
2. 新对象原型指向构造函数原型对象。
3. 函数的 `this` 指向新对象，执行代码。
4. 如果函数没有返回其它对象，那么返回这个新对象。

```JS
function Person(name) {
  this.name = name
}
var bob = new Person('bob')
console.log(bob) // {name: 'bob'}
```

可以通过下面这个函数理解 `new` 构造的过程：

```JS
function customNew(Fn, ...args) {
  // 1.创建一个新对象
  const obj = {}
  // 2.新对象原型指向构造函数原型对象
  obj.__proto__ = Fn.prototype
  // 3.函数的 this 指向新对象，执行代码
  const result = Fn.apply(obj, args)
  // 4.如果函数没有返回其它对象，那么返回这个新对象
  return result instanceof Object ? result : obj
}
```
## 优先级

可以根据以下**从高到低**的优先级来判断函数的 `this` 指向：

1. 由 `new` 调用：绑定到新创建的对象。
2. 由 `call()`、`apply()` 或 `bind()` 调用：绑定到指定的对象。
3. 作为对象方法调用：绑定到这个对象。
4. 默认：在严格模式下绑定到 `undefined`，否则绑定到全局对象。

## 箭头函数

之前介绍的四条规则已经可以包含所有正常的函数。但是 ES6 中引入的箭头函数是一个例外，箭头函数：
- 从其作用域链的上一层继承 `this`
- 不能作为构造函数使用，`new` 调用会报错
- `call()`、`apply()` 和 `bind()` 调用时的第一个参数会被忽略，只能传递参数
- 作为对象方法时，没有 `this` 绑定（始终是默认绑定）
- 没有 `prototype` 属性
- 没有 `arguments` 对象（但可以 `...` 扩展解构参数）
- 不能用 Generator 函数，无法使用 `yield` 关键字

箭头函数的重要性体现在它用更常见的词法作用域取代了传统的 `this` 机制。实际上，在 ES6 之前就已经在使用一种和箭头函数一样的模式：

```JS
function foo() {
  var self = this
  setTimeout(function () {
    console.log(self.num)
  }, 1000)
}
var obj = { num: 1 }
foo.call(obj) // 2
```

:::tip 提示
如果想更安全地忽略 `this` 绑定，可以使用一个 DMZ（Demilitarized Zone） 对象 `ø = Object.create(null)` 而非 `{}`：
- `ø` 对象默认没有属性和原型，不必担心将原型链上的同名方法被覆盖
- `for...in` 遍历普通对象时，会遍历原型链上的属性，有性能损耗
:::

## 理解

### 实现函数柯里化

```JS
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) { // 参数足够才会执行
      return fn.apply(this, args);
    } else { // 参数不够，返回新的函数用于接收参数
      return function (...restArgs) {
        // 已输入的所有全部参数存储，带入下一次判断
        return curried.apply(this, args.concat(restArgs))
      }
    }
  }
}

const getVolume = curry(function(l, w, h) {
  return l * w * h;
})

const commonL = getVolume(10)
const commonLW = getVolume(10, 10)
console.log(commonL(2)(3)) // 60
console.log(commonLW(5)) // 500
```

### 手动模拟

```JS
Function.prototype.customCall = function (cxt = Object.create(null), ...args) {
  const fn = Symbol() // 防止属性覆盖
  cxt[fn] = this // this 是调用 customCall 的函数，将其放入 ctx 中以方法的形式调用
  const result = cxt[fn](...args)
  delete cxt[fn] // 执行后删除新增属性
  return result
}

Function.prototype.customApply = function (ctx = Object.create(null), args = []) {
  const fn = Symbol() // 防止属性覆盖
  cxt[fn] = this // this 是调用 customApply 的函数，将其放入 ctx 中以方法的形式调用
  const result = cxt[fn](...args)
  delete cxt[fn] // 执行后删除新增属性
  return result
}

Function.prototype.customBind = function (ctx, ...args) {
  const _this = this // this 是调用 customBind 的函数
  return function Bind(...newArgs) {
    // 考虑是否此函数被继承
    if (this instanceof Bind) {
      return _this.customApply(this, [...args, ...newArgs])
    }
    return _this.customApply(ctx, [...args, ...newArgs])
  }
}
```
