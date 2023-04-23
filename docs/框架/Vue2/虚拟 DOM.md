# 虚拟 DOM

在浏览器中使用 ES 操作真实 DOM 时，浏览器需要将 ES 代码转换为浏览器内部数据结构，并与渲染引擎进行交互，这个过程比较耗费时间。此外，对 DOM 的操作一定会触发重绘，也会消耗计算资源。Vue 引入虚拟 DOM 的原因就在于此。

虚拟 DOM 的引入，在一定程度上可以避免不必要的 DOM 操作，提升框架性能。虚拟 DOM 对 Vue 来说是锦上添花，但对于 React 来说却必不可少。React 主要通过 `setState()` 方法改变状态，但 React 并没有依赖收集的机制，因此状态改变对视图的影响 React 无从得知，只能暴力进行虚拟 DOM 对比以知晓哪些 DOM 节点需要更新。

虚拟 DOM（Virtual Node，简称 VNode）本质上是一个对象，Vue 根据状态生成虚拟 DOM 树，然后再渲染视图。状态改变触发重新渲染时，会使用新生成的虚拟 DOM 树和上一次生成的虚拟 DOM 树进行对比，根据对比结果只更新有变化的真实 DOM 节点，从而避免不必要的 DOM 操作。

![vue-render](/虚拟DOM/vue-render.png)

组件模板中用到的属性，Vue 都会为其 `Dep` 实例添加同一个 `Render Watcher` 实例，当属性值变化时，触发 `Render Watcher` 更新，`Render Watcher` 实例被添加到异步更新队列中，在下一个 `tick` 中，执行虚拟 DOM 的 `diff` 算法，更新视图。Vue 会对异步更新队列会对所有的 `Watcher` 实例进行去重和排序，以确保更新的正确性和效率。

## VNode

在 Vue 中，`VNode` 是一个类，用于实例化不同类型的 `vnode` 实例，这些不同类型的 `vnode` 代表不同类型的 DOM 元素。

```JS
export default class VNode {
  constructor(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
    this.ssrContext = undefined
    this.functionalContext = undefined
    this.functionalOptions = undefined
    this.functionalScopeId = undefined
  }

  get child() {
    return this.componentInstance
  }
}
```

`vnode` 实例对象包含诸多属性，用以完整描述任一真实节点，包括：注释节点、文本节点、元素节点、组件节点、函数式节点、克隆节点等。这些节点都是 `VNode` 的实例对象，只是对应的属性不一样，比如创建一个注释节点：

```JS
const createEmptyVNode = text => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}
// {
//   text: '注释文案',
//   isComment: true
// }
```

:::tip 注意
节点被渲染到页面后，会将其 DOM 元素 存储到 `ele` 属性中。
:::

### 克隆节点

克隆节点是将现有节点的属性复制到新节点中，让新节点和被克隆节点的属性保持一致，从而实现克隆效果。克隆节点主要用于优化静态节点和插槽节点。

静态节点是指哪些不会变化的节点，当组件状态变化后，静态节点并不需要通过渲染函数获取 `vnode`。因此静态节点只需要在首次渲染时通过渲染函数获取 `vnode`，后续更新视图不需要再进行执行渲染函数重新生成 `vnode`，而是使用首次渲染生成的 `vnode` 进行克隆。

```JS
function cloneVNode(vnode, deep) {
  const componentOptions = vnode.componentOptions
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.asyncMeta = vnode.asyncMeta
  cloned.isCloned = true
  if (deep && vnode.children) {
    cloned.children = cloneVNodes(vnode.children)
  }
  return cloned
}
```

### 小结

Vue 每次渲染视图都需要先创建 `vnode`，利用 `vnode` 创建真实 DOM 插入页面中，所以可以将上一次渲染视图时所创建的 `vnode` 缓存，之后每当需要重新需要渲染视图时，将新创建的 `vnode` 与上一次缓存的 `vnode` 对比，找出变化的部分，并针对这些部分去修改真实的 DOM。

Vue 采用中等粒度的侦测策略，即组件使用的状态有任一个发生变化，那么整个组件都需要重新渲染。

## `patch()` 函数

当数据发生改变时，`setter` 触发调用 `notify()` 通知所有 `Watcher` 实例，模板 `Watcher` 会调用 `patch(oldVnode, vnode)` 函数，通过对比新、旧虚拟 DOM，从而只针对变化的节点进行视图更新。`patch()` 中的新、旧根节点有以下情况：
1. 只有旧节点：通过 `invokeDestroyHook()` 递归调用组件的 `destroy()` 方法，以销毁组件及其子组件
2. 只有新节点：处于初始化阶段，无需比较，对新节点使用 `createElm()` 函数递归地创建元素和子元素插入 DOM
3. 通过 `key`、`tag`、`isComment` 等属性判断比较新、旧根节点是否是同一节点：
   1. 是：调用 `patchVnode` 处理
   2. 否：通过新节点创建元素插入 DOM，通过旧节点从 DOM 删除元素

### `patchVnode(oldVnode, vnode)`

新、旧根节点是同一节点时，才需要进行对比 `patchVnode()` 对比更新。更新操作并非暴力地使用新节点覆盖旧节点，而是通过对比找出两个节点的不同之处，针对不一样的地方进行视图更新：
1. 新、旧是同 `key` 的静态节点：跳过更新流程
2. 新节点是文本节点或注释节点：使用 `textContent` 属性设置文本
3. 只有新节点有子节点：根据新节点的创建父元素，并递归地创建子元素插入父元素
4. 只有旧节点有子节点：根据旧节点删除所有子元素
5. 新、旧节点都有子节点且不完全一致：使用 `updateChildren()` 函数对比差异进行更新

### `updateChildren()`

此函数内部使用指针：
- `oldStartIdx`：指向旧列表的头节点 `oldStartVnode`
- `oldEndIdx`：指向旧列表的尾节点 `oldEndVnode`
- `newStartIdx`：指向新列表的头节点 `newStartVnode`
- `newEndIdx`：指向新列表的尾节点 `newEndVnode`

在 `while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx)` 条件下进行循环：
1. `sameVnode(oldStartVnode, newStartVnode)`、`sameVnode(oldEndVnode, newEndVnode)`、`sameVnode(oldStartVnode, newEndVnode)`、`sameVnode(oldEndVnode, newStartVnode)` 按顺序进行判断，如果相等，调用 `patchVnode()`，命中的指针向另一边移动
2. 步骤 `1` 均未命中，通过 `newStartVnode` 的 `key` 在旧列表中搜寻对应旧节点：
  - 没找到：说明是新增的节点，调用 `createElm()` 创建元素插入 `newStartIdx` 之前
  - 找到判断 `sameVnode(vnodeToMove, newStartVnode)`：
    - 不是同一节点：调用 `createElm()` 创建元素
    - 是同一节点：调用 `patchVnode()` 更新节点并将真实 DOM 插入 `oldStartIdx` 之前，`newStartIdx` 后移

如果是新列表先遍历完成，根据旧列表删除元素，反之则对剩余元素进行创建插入。


`updateChildren()` 通过双指针交叉比较，简化遍历次数，可以快速检测出翻转操作，加快效率。也可以看出，正确使用 `key` 属性，可以不遗漏可复用节点，加速对比效率。

## 总结

Vue 引入虚拟 DOM，可以将侦测策略的粒度指定到组件级别，而非使用属性的具体 DOM 元素，这在一定程度上减少了属性对应的 `Watcher` 数量。

虚拟 DOM 就是使用对象对元素进行描述，这些对象构成一棵虚拟 DOM 树，Vue 通过 `patch()` 函数对比新、旧两课虚拟 DOM 树，以找出其不同之处，仅对改变的部分进行 DOM 操作。

当根节点是同一节点时，`patch()` 调用 `patchVnode()` 函数进行对比进行 DOM 操作。如果新、旧两个节点是同一节点，都有子节点列表且两者不等时，`patchVnode()` 会调用 `updateChildren()` 函数对列表进行对比。

`updateChildren()` 使用双指针交叉比较，并配合 `key` 属性高效找出新列表子节点对应的旧列表子节点，使用其对应的 `ele` 属性中存储的 DOM 元素，通过修改元素的属性和内容等操作后插入对应位置。`patch()` 的整个过程都是尽量**避免重复创建元素**。
