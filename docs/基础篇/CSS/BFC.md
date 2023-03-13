# BFC

BFC 是 Block Formatting Context 的简写，译作块级格式上下文。W3C 关于 [Block Formatting Context](https://www.w3.org/TR/CSS21/visuren.html#block-formatting) 的定义十分明确，这里总结一下。

## W3C 的定义

在一个正常文档流中，块级盒子参与 BFC，内联盒子参与 IFC（Inline Formatting Context）。

以下类型的块级盒子会**为其内容建立新的块格式化上下文**：浮动、绝对定位、`display` 值为 `inline-block`、`table-cell` 或 `table-caption`、`overflow` 值不为 `visible`。

处于同一 BFC 内的盒子的有以下特性：
- 盒子从包含块的顶部开始，一个接一个**垂直**地排列
- 盒子的左外边缘默认与包含块的左边缘相接触，**即使在存在浮动的情况下也是如此**
- 相邻块级盒子垂直距离由 `margin` 属性决定
- 相邻块级盒子垂直边距 `margin` 会折叠
- 不影响包含块的外部元素，反之亦然
  
BFC 容器的特性：
- 计算 BFC 容器高度时，包括浮动元素也参与计算
- BFC 容器不与浮动元素重叠

## 补充

对于 “元素何时会为其内容建立新的 BFC” 这个问题，W3C 的描述不够完善，[MDN](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/Guide/CSS/Block_formatting_context) 有总结更完整的触发条件：
- 根元素：`<html>`
- 浮动元素：`float` 值不为 `none`
- 绝对和固定定位元素：`position` 值为 `absolute` 或 `fixed`
- 行内块元素：`display` 值为 `inline-block`
- 表格单元格：`display` 值为 `table-cell`，HTML 表格单元格默认值
- 表格标题：`display` 值为 `table-caption`，HTML 表格标题默认值
- 匿名表格单元格元素：`display` 值为 `table`、`table-row`、 `table-row-group`、`table-header-group`、`table-footer-group`（分别是 HTML table、tr、tbody、thead、tfoot 的默认值）或 `inline-table`
- `overflow` 值不为 `visible`、`clip` 的块元素
- `display` 值为 `flow-root` 的元素
- `contain` 值为 `layout、content` 或 `paint` 的元素
- 弹性元素：`display` 值为 `flex` 或 `inline-flex` 元素的直接子元素，如果它们本身既不是 flex、grid 也不是 table 容器
- 网格元素：`display` 值为 `grid` 或 `inline-grid` 元素的直接子元素，如果它们本身既不是 flex、grid 也不是 table 容器
- 多列容器：`column-count` 或 `column-width` 值不为 `auto`，包括 `column-count` 为 1
- `column-span` 值为 `all` 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中

## 如何理解

先看以下代码：

```HTML
<div class="container">
  <div class="top">Top Box</div>
  <div class="middle">Middle Box</div>
  <div class="bottom">Bottom Box</div>
</div>
```

```CSS
.container {
  overflow: hidden;  
}
.container div {
  width: 200px;
  height: 200px;
}
.top {
  background-color: aquamarine;
}
.middle {
  margin: 100px 0;
  background-color: salmon;
}
.bottom {
  margin: 100px 0;
  background-color: bisque;
}
```

效果图如下：

![BFC-demo-1](/BFC/BFC-demo-1.png)

首先，`div.container` 元素会创建一个 BFC，内部的 3 个 `div` 参与到 `div.container` 创建的 BFC，根据前述 BFC 特性，元素会表现出如下特点：
- 这 3 个 `div` 盒子自顶向下垂直排列
- 这 3 个 `div` 盒子左边缘紧靠包含块的左边缘
- 垂直间距由 `margin` 决定
- 垂直方向 `margin` 发生折叠

看到这里，不禁会产生疑问---这不就是正常的布局状态吗，跟[《盒模型》](/基础篇/CSS/盒模型)一节中 “块级和内联” 部分的描述有什么不同，需要如此费周章地重复一遍吗？为解答这个问题，需要明确以下几点：
1. 粗心的开发者可能会发现，BFC 特性除了外边距折叠外，其它特性并无新鲜可言---这实际上是因为 “你” 已经基本上在 “Thinking In W3C Standard” 了，只是未曾知晓 BFC 还有这么一个特性，这会导致在看到上述代码后 “你” 脑海中形成画面和浏览器会有偏差。
2. 不管是否知晓外边距折叠的特性，在实际开发中，多个相邻块级元素在垂直方向上的 `margin` 一般都会避免在上、下两个方向同时设置，这种情况下只在单个方向上设置 `margin` 更符合思维的直观感受，不熟悉标准的开发人员不知道也实在合理。因此，外边距折叠这个标准中定义的特性，看来多少有点不合理---至少没有解决什么实际的问题，反倒令人困惑。但这就是标准！
3. 在 W3C 标准中，除了 BFC 和 IFC 外，还有 Flex Formatting Context、Grid Formatting Context、Ruby Formatting Contect 等格式上下文。每种格式上下文都有其特性，比如 FFC 就与 BFC 的特性就十分不一样，FFC 也不会出现外边距折叠的问题。
4. 介绍这么多 BFC 相关的内容，不仅是为了理解标准，更是为了利用它解决其它问题。

### 关于外边距折叠

默认情况下，外边距折叠不仅发生在两个同级元素之间，在元素内部的首尾两个子元素的 `margin` 会表现得像子元素的 `margin` 属于父元素，也会导致父元素和其相邻元素发生外边距折叠。

当发生外边距折叠时，计算方式为：
- `margin` 均为正数，结果是取最大值
- `margin` 一个为正数，一个为负数，结果是两者相加
- `margin` 均为负数，结果是取最小值


## 包裹内部浮动

如下代码：

```HTML
<div class="container">
  <div class="float">Float Element</div>
</div>
```

```CSS
.container {
  border: 1px solid rebeccapurple;
  background-color: silver;
}
.float {
  float: left;
  width: 100px;
  height: 100px;
  background-color: yellowgreen;
  border: 1px solid red;
}
```

效果：

![BFC-float-demo-1](/BFC/BFC-float-demo-1.png)

元素浮动造成父元素的塌陷，这个问题之前提到过，除了用 `clear` 属性解决，还可以利用 BFC 解决。使用 `overflow: hidden;` 让父元素为其内容创建新的 BFC，使浮动元素参与 BFC 容器的高度计算。

```CSS
.container{
  overflow: hidden;
}
```

![BFC-float-demo-2](/BFC/BFC-float-demo-2.png)

## 排除外部浮动

如下代码：

```HTML
  <div class="left">Left Box</div>
  <div class="right">Right Box</div>
```

```CSS
.left {
  float: left;
  width: 200px;
  height: 200px;
  background-color: red;
}
.right {
  height: 200px;
  border: 20px solid blue;
  background-color: green;
}
```

效果：

![BFC-float-demo-3](/BFC/BFC-float-demo-3.png)

利用 “BFC 容器不与浮动元素重叠” 的特性，添加规则：

```CSS
.right {
  overflow: hidden;
}
```

![BFC-float-demo-4](/BFC/BFC-float-demo-4.png)

## 外边距折叠

如下代码：

```HTML
<div class="red"></div>
<div class="green"></div>
```

```CSS
.red,.green {
  width: 100px;
  height: 100px;
  margin: 50px 0;
}
.red {
  background: red;
}
.green {
  background: green;
}
```

效果：

![BFC-float-demo-5](/BFC/BFC-float-demo-5.png)

解铃还须系铃人，外边距折叠的祸首就是 BFC，解决这个问题的也需要靠 BFC。由于 BFC 容器内的盒子不影响包含块的外部元素，可以通过新增 `div.green-wrapper` 包裹 `.green`，并触发包裹元素的 BFC：


```HTML
<div class="red"></div>
<div class="green-wrapper">
  <div class="green"></div>
</div>
```

```CSS
.green-wrapper {
  overflow: hidden;
}
```

![BFC-float-demo-6](/BFC/BFC-float-demo-6.png)

值得注意的是，`.green` 的 `margin` 属性的外在表现还是在 `.green-wrapper` 内部，结果是主动撑开了整个父元素。这里纯粹是为了更全面的展示 BFC 特性，实际开发中用这种方式解决外边距折叠带来的问题并不是一个好的方案。
