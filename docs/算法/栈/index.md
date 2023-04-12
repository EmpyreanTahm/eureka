# 栈

栈是一种遵循**先进后出**（FILO）的数据结构，允许操作端被称为**栈顶**，不允许操作端称为**栈底**。将新元素放入原先栈顶元素之上，使之成为新的栈顶元素的操作称为**进栈、入栈或压栈**。将栈顶元素移除，使其紧邻元素成为新的栈顶元素的操作称为**出栈或退栈**。

![stack-demo](/算法/stack-demo.png)

功能完整的栈结构需要具备以下功能：
- `push()`：向栈添加元素
- `pop()`：从栈移除元素
- `peek()`：查看栈顶元素
- `size()`：查看栈的大小，即栈元素个数
- `isEmpty()`：检查栈是否为空
- `clear()`：清空栈元素

在 ES 中，一般用数组实现栈的数据结构：

```JS
class Stack {
  constructor() {
    this['_items'] = []
  }
  push(element) {
    this._items.push(element)
  }
  pop() {
    return this._items.pop()
  }
  peek() {
    return this._items[this._items.length - 1]
  }
  size() {
    return this._items.length
  }
  isEmpty() {
    return this._items.length === 0
  }
  clear() {
    this._items = []
  }
}

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
console.log(stack._items) // [1, 2, 3]
stack.pop()
console.log(stack._items) // [1, 2]
```

封装完好的类不应该暴露出 `_items` 私有属性，以确保**栈以栈的形式运行**。ES 中没有私有变量的概念，以 `_` 开头命名变量只是一种约定俗成的习惯，表明该变量 **“应该”** 是私有方法或属性。在 TypeScript 中，提供给类属性和方法的 `private` 修饰符也只能在编译时生效。

在 ES 中，可以使用 `Symbol` 或 `WeakMap` 实现属性的私有化。

## 闭包 + `Symbol`

```JS
const Stack = (function () {
  const _items = Symbol('stackItems')
  return class {
    constructor() {
      this[_items] = []
    }
    push(element) {
      this[_items].push(element)
    }
    pop() {
      return this[_items].pop()
    }
    peek() {
      return this[_items][this[_items].length - 1]
    }
    size() {
      return this[_items].length
    }
    isEmpty() {
      return this[_items].length === 0
    }
    clear() {
      this[_items] = []
    }
  }
})()

const stack = new Stack()
console.log(stack) // { Symbol():[], [[Prototype]]:Object }
```
通过闭包和 `Symbol` 类型，导致外部无法获取 `Symbol` 类型的 `_items` 变量，也就无法访问到 `_items` 属性和存储的值。然而，ES6 新增的 `Object.getOwnPropertySymbols()` 却能够获取到 `_items` 变量。

```JS
const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
const objectSymbol = Object.getOwnPropertySymbols(stack)[0]
console.log(stack[objectSymbol]) // [1, 2, 3]
```

## 闭包 + `WeakMap`

`WeakMap` 类型存储的键值对中，键必须是对象，值可以是任何类型。

这种方案的核心思想是在构造实例时，将实例（`this`）设置成 `WeakMap` 的键，存储元素的数组作为值。这种方式能实现真正的私有属性，但可读性不强，而且由于没有创建实例属性，因此**实现继承时无法继承该私有属性**。

```JS
const Stack = (function () {
  const _items = new WeakMap()
  return class {
    constructor() {
      _items.set(this, [])
    }
    push(element) {
      _items.get(this).push(element)
    }
    pop() {
      return _items.get(this).pop()
    }
    peek() {
      return _items.get(this)[_items.get(this).length - 1]
    }
    size() {
      return _items.get(this).length
    }
    isEmpty() {
      return _items.get(this).length === 0
    }
    clear() {
      _items.set(this, [])
    }
  }
})()

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
console.log(stack.size()) // 3
console.log(stack) // {}
```

## 总结

ES 不能像 Java 等语言可以声明私有属性和方法，以上的方案虽然能模拟出私有效果，但在语法和性能层面上，都各有优缺点。实际采用哪种方案并不重要，重要的是有良好的编程习惯，看到 `_` 开头的变量名应当绕道而行。

在用 ES 解决算法问题时，常常并不需要手动构造 `class Stack {}`，而是借助栈的思想，合理使用数组方法完成。

## 单调栈

在栈的基础上，通过某种手段保持栈内元素单调增或单调减，这样的栈就叫单调栈。以从底至顶的元素单调增为例，若入栈元素小于栈顶元素，需不断出栈直到入栈元素大于栈顶元素或栈空，然后再入栈以保持栈的单调性。

```JS
while (stack.length && x < stack[stack.length - 1]) {
  stack.pop()
}
stack.push(x)
```
