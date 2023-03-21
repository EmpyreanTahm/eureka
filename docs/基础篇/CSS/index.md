# 前言

CSS 全称是 "Cascading Style Sheet"，译作层叠样式表。CSS 是一种样式表语言，用来描述 HTML 或 XML（包括如 SVG、MathML 或 XHTML 之类的 XML 分支语言）文档的呈现。

CSS 是开放 Web 的核心语言之一，并根据 W3C 规范在 Web 浏览器中进行了标准化。如今，W3C 不再对 CSS 规范进行版本控制，规范被拆成众多模块单独进行升级（比如 [CSS Color Module Level 5](https://drafts.csswg.org/css-color-5/)），或者将新需求作为一个新模块来立项并进行标准化，因此 CSS3 之后将不会再有 CSS4。



## 使用 CSS

### 内联样式

HTML 标签的 `style` 属性中直接添加样式：

```HTML
<p style="color:red; font-size:20px;">ευρηκα</p>
```

### 内部样式表

在 HTML 的 `<head>` 内添加 `<style type="text/css"></style>` 标签使用内部样式表，其中 `type` 属性默认为 `text/css`，目前已被弃用：

```HTML
<!-- <style type="text/css"> -->
<style>  
  p {
    color: red;
    font-size: 20px;
  }
</style>
```

### 外部样式表

使用外部样式表，可以通过更改一个文件来改变整个站点的外观：

```HTML
<link rel="stylesheet" href="/dist/css/bootstrap.min.css">
```

#### `@import`

`@import` 是 CSS2.1 新增规则，用于导入其它样式规则，并必须在其它规则（除 `@charset` ）之前使用。`@import` 在 `<style>` 标签中同样适用，语法和示例：

```
@import [ <url> | <string> ] [ layer | layer( <layer-name> ) ]? <import-conditions> ;  
```

```CSS
@import url("fineprint.css") print;
@import url("bluish.css") projection, tv;
@import 'custom.css';
@import url("chrome://communicator/skin/");
@import "common.css" screen, projection;
@import url('landscape.css') screen and (orientation: landscape);
```

```HTML
<style>
  @import url(style.css);
</style>
```

:::tip 总结
四种引入样式规则的方式，在不使用 `!important` 且选择器优先级等级一致时，优先级顺序比较：
- 内联样式优先级最高，永远**不会**被其它三种方式覆盖
- 内部样式表和外部样式表的生效顺序完全取决于其在文档中的顺序，**后定义**的规则生效，**后定义生效规则**同样适用于两者内部
- `@import` 的方式可以理解成 `@import` 进来的样式规则，就像写在 `@import` 这一行一样
  :::

## 向后兼容（Backwards Compatibility）

浏览器厂商们有时会给实验性的或者非标准的 CSS 属性和 JavaScript API 添加前缀，这样开发者就可以用这些新的特性进行试验。常见前缀：
- `-webkit-`：Chrome、Safari、新版 Opera，以及几乎所有 iOS 系统中的浏览器（包括 iOS 系统中的火狐浏览器）
- `-moz-`：火狐浏览器
- `-ms-`：IE 浏览器 和 Edge 浏览器
- `-o-`：旧版 Opera 浏览器

一般需要添加所有的前缀属性，并把标准属性放在最后书写。这样既可以使不支持标准属性但支持试验属性的浏览器渲染出想要的效果（向后兼容），也可以使规则在支持标准属性的浏览器中生效，此时试验代码会被覆盖：

```CSS
.transition { /*渐进增强写法*/
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  transition: all .5s;
}
```

上述规则已经具备较强的健壮性，但在标准化过程中，属性的表现形式可能会发生变化，为防止试验代码破坏页面，应尽量等到浏览器行为标准化后使用无前缀的标准属性。此外还有一种优雅降级的写法：

```CSS
.transition { /*优雅降级写法*/
  transition: all .5s;
  -o-transition: all .5s;
  -moz-transition: all .5s;
  -webkit-transition: all .5s;
}
```

:::tip 提示
用于兼容的前缀属性，可以借助基于 PostCSS 的 [Autoprefixer](https://github.com/postcss/autoprefixer) 插件自动添加。
:::

## 渐进增强和优雅降级

渐进增强和优雅降级是针对技术的一种形而上的思路，适用于各个领域和维度。

渐进增强认为应该专注内容本身，首要针对低版本的浏览器构建页面，满足最基本的功能，再针对高版本浏览器进行效果、交互、追加各种功能达到更好的体验。优雅降级指的是首要针对高版本的浏览器构建页面，先完善所有的功能，然后针对各个不同的浏览器进行测试、修复，尽量保证低级浏览器也有基本功能。

比如政府机关的网站，首要是满足低版本浏览器包括 IE8、IE7、甚至 IE6 都能正常浏览，这就要求以 “兼容最低版本的浏览器” 为首要目标进行开发。满足基本要求之后，再针对高版本浏览器进行样式优化，增强高版本浏览器用户的使用体验，这就是渐进增强的思路。

如果苹果公司对新发布的产品开发宣传和介绍[页面](https://www.apple.com.cn/airpods-pro/)，不妨猜测，开发人员首先在最新版的 Safari 或 Chrome 之下完成页面布局和动画交互等内容，再根据统计的历史用户代理占比进行前后兼容---使用兼容属性或替代方案，或舍弃某些动画交互。这就是优雅降级的思路。

渐进增强和优雅降级都有一个 “下线” 的要求，渐进增强对 “下线” 极度包容，首要目的就是包容 “下线”。而优雅降级首先考虑的是 “优雅”，妨碍到 “优雅”，可以适当不进行降级。渐进增强和优雅降级侧重点的差异，导致工作流程有所差异，实际开发往往需要在兼容和 “优雅” 之间权衡。
