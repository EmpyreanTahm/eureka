# Vue3

## `proxy`

Vue2 通过 `Object.defineProperty()` 递归地为每个属性添加 `getter/setter`，实现 `data` 的响应式，其缺点在于：
- 无法侦测对象属性的新增、删除，对此提供了 `vm.$set` 和 `vm.$delete` 方法
- 无法侦听数组 `length` 属性的修改和下标访问的直接修改，对此添加了拦截器

Vue3 使用 `Proxy` 递归地侦测整个对象的变化，`Proxy` 侦测对象并返回一个新对象，相比 `Object.defineProperty()`，`Proxy` 可以侦测包括增、删在内的多种操作，同时也能侦测数组的变化。

### `reactive()`

`reactive()` 将对象参数转换为 `Proxy` 实例并返回，在创建该实例时，会在 `get()` 中通过 `track()` 收集依赖，在 `set()` 中通知依赖更新。深层属性只有在被使用时才会进行拦截。

```JS
const observedMap = new WeakMap()

function reactive(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  const observed = new Proxy(obj, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      // 如果是对象，则递归进行包装
      if (typeof result === 'object' && result !== null && !Object.isFrozen(result)) {
        if (!observedMap.has(result)) {
          observedMap.set(result, reactive(result))
        }
        return observedMap.get(result)
      }
      // track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (oldValue !== value) {
        // trigger(target, key)
      }
      return result
    }
  })

  observedMap.set(obj, observed)

  return observed
}
```

使用 `Proxy` 拦截对象需要处理重复绑定依赖导致改变深层属性时触发上层所有属性的 `set()`，`reactive()` 使用一个 `WeakMap` 实例来存储已经包装过的对象和它们的包装结果。在 `get()` 方法中，如果访问的属性是一个对象：则先检查该对象是否已经被包装过，如果是，则直接返回包装后的结果；否则，递归调用 `reactive()` 函数进行包装，并将该对象添加到 `WeakMap` 实例中。这样，就可以避免重复绑定依赖的问题。

### `ref()`

`ref()` 是基于 `reactive()` 的封装，使得 `ref()` 可以同时支持将基本类型和对象转换为响应式，这种方式生成的 `Proxy` 需要使用 `.value` 前缀获取真实的值。

## Composition API

组合式 API 相对选项式 API：
- 组织结构良好，避免碎片化，提高可维护性
- 内部以函数为主，更方便类型推断
- 减少 `this` 的使用，不容易出现 `this` 指向不明的问题
- 更加形式的 Mixins 写法
- 对 `Tree-Shaking` 友好，利于代码压缩

## 生命周期

生命周期钩子函数名称变化，`beforeDestory`、`destoryed` 改名为 `beforeUnmount`、`Unmounted`。

组合式 API 中的 `setup()` 函数是 `beforeCreate` 和 `created` 的替代品。在 `setup()` 使用 `on` 加生命周期钩子名的函数（如 `onMounted()`）来添加其它生命周期钩子。

## Pinia

Pinia 是 Vue 官方开发的更加轻量级的状态管理库，移除了 Vuex 的 `mutations` 概念。

使用 `defineStore(id, storeObj)` 定义一个 store，`storeObj` 是一个对象，这个对象中包括选项：
- `state`：store 中的状态
- `getters`：基于 `state` 的计算属性
- `actions`：包含同步、异步操作和修改 `state` 的方法

其参数 `storeObj` 也可以是一个函数，函数中定义响应式数据（`state`）、计算属性（`getters`）和方法（`actions`），函数最终返回一个包裹它们的对象。

组合式 API 直接通过属性访问使用这个对象的状态和方法，直接解构会失去状态的响应式，可以使用 `storeToRefs(store)` 为每一个响应式属性创建引用，这种方式适合只使用 store 状态而不调用任何 `actions` 的情况。

选项式 API 使用 store 如下：
- `...mapState(store, [])/...mapWritableState(store, [])`：在 `computed` 中将 `state` 映射为组件的属性，前者映射的属性只可读，后者可同时可写入
- `...mapState(store, [])`：在 `computed` 中将 `getters` 映射为组件的只读计算属性
- `...mapActions(store, [])`：在 `methods` 中将 `actions` 映射为组件中的方法

选项式 API 修改状态可以 `this.` 或 `store.` 直接修改，也可以调用 `store.$patch(objOrFn)` 批量修改。



