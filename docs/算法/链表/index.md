# 链表

链表是一种常见的数据结构，它由**一系列节点**组成，每个节点包含**数据和指向下一个节点的指针**。

![linked-list-demo](/算法/linked-list-demo.jpg)

链表可以动态地增加、删除元素，而数组在增加、删除元素时需要移动其他元素，这使得链表在需要频繁插入、删除元素的情况下比数组更高效。

当然，链表也有一些缺点。因为它没有像数组那样的随机访问能力，所以在访问元素时可能需要遍历整个链表。此外，由于链表的每个节点都需要存储指向下一个节点的指针，所以它可能需要比数组更多的内存。

```JS
class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  // 添加节点到链表尾部
  append(val) {
    const newNode = new ListNode(val)
    if (!this.head) {
      this.head = newNode
    } else {
      let currentNode = this.head
      while (currentNode.next) {
        currentNode = currentNode.next
      }
      currentNode.next = newNode
    }
    this.length++
  }

  // 添加节点到链表头部
  prepend(val) {
    const newNode = new ListNode(val)
    newNode.next = this.head
    this.head = newNode
    this.length++
  }

  // 根据索引删除节点
  remove(index) {
    if (index < 0 || index >= this.length) {
      return null
    }
    let currentNode = this.head
    let previousNode = null
    let currentIndex = 0
    if (index === 0) {
      this.head = currentNode.next
      this.length--
      return currentNode.val
    }
    while (currentIndex < index) {
      previousNode = currentNode
      currentNode = currentNode.next
      currentIndex++
    }
    previousNode.next = currentNode.next
    this.length--
    return currentNode.val
  }

  // 根据值删除节点
  removeValue(val) {
    let currentNode = this.head
    let previousNode = null
    while (currentNode !== null) {
      if (currentNode.val === val) {
        if (previousNode === null) {
          this.head = currentNode.next
        } else {
          previousNode.next = currentNode.next
        }
        this.length--
        return currentNode.val
      }
      previousNode = currentNode
      currentNode = currentNode.next
    }
    return null
  }

  // 更新节点
  update(index, val) {
    const node = this.get(index)
    if (node) {
      node.val = val
      return true
    }
    return false
  }

  // 根据索引插入节点
  insert(index, val) {
    if (index < 0 || index > this.length) {
      return false
    }
    if (index === 0) {
      this.prepend(val)
      return true
    }
    if (index === this.length) {
      this.append(val)
      return true
    }
    const newNode = new ListNode(val)
    let currentNode = this.head
    let previousNode = null
    let currentIndex = 0
    while (currentIndex < index) {
      previousNode = currentNode
      currentNode = currentNode.next
      currentIndex++
    }
    newNode.next = currentNode
    previousNode.next = newNode
    this.length++
    return true
  }

  // 根据索引获取节点
  get(index) {
    if (index < 0 || index >= this.length) {
      return null
    }
    let currentNode = this.head
    let currentIndex = 0
    while (currentIndex < index) {
      currentNode = currentNode.next
      currentIndex++
    }
    return currentNode
  }

  // 链表转数组
  toArray() {
    const arr = []
    let currentNode = this.head
    while (currentNode !== null) {
      arr.push(currentNode.val)
      currentNode = currentNode.next
    }
    return arr
  }

  // 链表转字符串
  toString() {
    return this.toArray().join(' -> ')
  }
}
```

## 双向链表

前述实现的链表被叫做**单链表**。如果每个节点还保存前节点的指针，那么这样的链表就是**双向链表**。

![doubly-linked-list-demo](/算法/doubly-linked-list-demo.webp)
```JS
class DoublyNode extends Node {
  constructor(val) {
    super(val, next)
    this.prev = null
  }
}

class DoublyLinkedList extends LinkedList {
  constructor() {
    super()
    this.tail = null
  }

  // 添加节点到链表尾部
  append(val) {
    const newNode = new DoublyNode(val)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.prev = this.tail
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
  }

  // 添加节点到链表头部
  prepend(val) {
    const newNode = new DoublyNode(val)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }
    this.length++
  }

  // 根据索引删除节点
  remove(index) {
    if (index < 0 || index >= this.length) {
      return null
    }
    let currentNode = this.head
    let previousNode = null
    let currentIndex = 0
    if (index === 0) {
      this.head = currentNode.next
      if (this.length === 1) {
        this.tail = null
      } else {
        this.head.prev = null
      }
      this.length--
      return currentNode.val
    }
    if (index === this.length - 1) {
      currentNode = this.tail
      this.tail = currentNode.prev
      this.tail.next = null
      this.length--
      return currentNode.val
    }
    while (currentIndex < index) {
      previousNode = currentNode
      currentNode = currentNode.next
      currentIndex++
    }
    previousNode.next = currentNode.next
    currentNode.next.prev = previousNode
    this.length--
    return currentNode.val
  }

  // 根据值删除节点
  removeValue(val) {
    let currentNode = this.head
    let previousNode = null
    while (currentNode !== null) {
      if (currentNode.val === val) {
        if (previousNode === null) {
          this.head = currentNode.next
          if (this.length === 1) {
            this.tail = null
          } else {
            this.head.prev = null
          }
        } else if (currentNode === this.tail) {
          this.tail = currentNode.prev
          this.tail.next = null
        } else {
          previousNode.next = currentNode.next
          currentNode.next.prev = previousNode
        }
        this.length--
        return currentNode.val
      }
      previousNode = currentNode
      currentNode = currentNode.next
    }
    return null
  }

  // 根据索引插入节点
  insert(index, val) {
    if (index < 0 || index > this.length) {
      return false
    }
    if (index === 0) {
      this.prepend(val)
      return true
    }
    if (index === this.length) {
      this.append(val)
      return true
    }
    const newNode = new DoublyNode(val)
    let currentNode = this.head
    let previousNode = null
    let currentIndex = 0
    while (currentIndex < index) {
      previousNode = currentNode
      currentNode = currentNode.next
      currentIndex++
    }
    newNode.prev = previousNode
    newNode.next = currentNode
    previousNode.next = newNode
    currentNode.prev = newNode
    this.length++
    return true
  }
}
```

### 循环链表

双向链表中，如果尾节点的 `next` 指针指向头结点，那么这样的双向链表被叫做循环链表。

```JS
class CircularLinkedList extends DoublyLinkedList {
  constructor() {
    super()
    this.tail.next = this.head
    this.head.prev = this.tail
  }

  // 添加节点到链表尾部
  append(val) {
    const newNode = new DoublyNode(val)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
      this.tail.next = this.head
      this.head.prev = this.tail
    } else {
      newNode.prev = this.tail
      this.tail.next = newNode
      newNode.next = this.head
      this.head.prev = newNode
      this.tail = newNode
    }
    this.length++
  }

  // 添加节点到链表头部
  prepend(val) {
    const newNode = new DoublyNode(val)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
      this.tail.next = this.head
      this.head.prev = this.tail
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      newNode.prev = this.tail
      this.tail.next = newNode
      this.head = newNode
    }
    this.length++
  }

  // 根据索引删除节点
  remove(index) {
    if (index < 0 || index >= this.length) {
      return null
    }
    let currentNode = this.head
    let previousNode = null
    let currentIndex = 0
    if (index === 0) {
      this.head = currentNode.next
      this.head.prev = this.tail
      this.tail.next = this.head
      this.length--
      if (this.length === 0) {
        this.head = null
        this.tail = null
      }
      return currentNode.val
    }
    if (index === this.length - 1) {
      currentNode = this.tail
      this.tail = currentNode.prev
      this.tail.next = this.head
      this.head.prev = this.tail
      this.length--
      if (this.length === 0) {
        this.head = null
        this.tail = null
      }
      return currentNode.val
    }
    while (currentIndex < index) {
      previousNode = currentNode
      currentNode = currentNode.next
      currentIndex++
    }
    previousNode.next = currentNode.next
    currentNode.next.prev = previousNode
    this.length--
    return currentNode.val
  }

  // 根据值删除节点
  removeValue(val) {
    let currentNode = this.head
    let previousNode = null
    while (currentNode !== null) {
      if (currentNode.val === val) {
        if (previousNode === null) {
          this.head = currentNode.next
          this.head.prev = this.tail
          this.tail.next = this.head
        } else if (currentNode === this.tail) {
          this.tail = currentNode.prev
          this.tail.next = this.head
          this.head.prev = this.tail
        } else {
          previousNode.next = currentNode.next
          currentNode.next.prev = previousNode
        }
        this.length--
        if (this.length === 0) {
          this.head = null
          this.tail = null
        }
        return currentNode.val
      }
      previousNode = currentNode
      currentNode = currentNode.next
    }
    return null
  }

  // 根据索引插入节点
  insert(index, val) {
    if (index < 0 || index > this.length) {
      return false
    }
    if (index === 0) {
      this.prepend(val)
      return true
    }
    if (index === this.length) {
      this.append(val)
      return true
    }
    const newNode = new DoublyNode(val)
    let currentNode = this.head
    let previousNode = null
    let currentIndex = 0
    while (currentIndex < index) {
      previousNode = currentNode
      currentNode = currentNode.next
      currentIndex++
    }
    newNode.prev = previousNode
    newNode.next = currentNode
    previousNode.next = newNode
    currentNode.prev = newNode
    this.length++
    return true
  }
}
```
