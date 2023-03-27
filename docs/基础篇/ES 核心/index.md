# 前言

ECMAScript 是一种 ECMA（European Computer Manufacturers Association，欧洲计算机制造商协会）在标准 [ECMA-262](https://262.ecma-international.org/) 中定义的脚本语言规范，一般也简称为 ES。

ES 是弱类型的、动态的语言，这意味着在脚本的生命周期内，变量的**值**和**数据类型**都可能发生变化。任何语言都可以实现 ES 规范。JavaScript 和 Node.js 都是实现了 ES 规范的语言，两者在不同的宿主环境中运行。

完整的 JavaScript 实现包含：
- 核心：ES，包括 ECMAScript 标准定义的语法、类型、语句、关键字、保留字、操作符和全局对象
- 文档对象模型：DOM，由 W3C 定义标准
- 浏览器对象模型：BOM，长久以来缺乏规范，W3C 希望将 BOM 标准化，因此 HTML5 规范中有一部分涵盖了 BOM 的主要内容


## 使用 JavaScript

### `<script>`

使用 JavaScript，需要在 HTML 文档的 `<head>` 或 `<body>` 内使用 `<script>` 标签引入。通过 `<script>` 标签，有两种使用 JavaScript 的形式：
- `<script>` 标签包裹 JavaScript 代码
- 通过 `src` 属性定义引用外部 JavaScript 的 URI

```JS
<script type="text/javascript">
  console.log("Hello, World!")
</script>
```

```JS
<script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js">
</script>
<script type="text/javascript" src="./index.js"></script>
```

`<script>` 标签的 `type` 属性，用于定义包含或引用的脚本语言类型，支持包括：
- `text/javascript`
- `text/ecmascript`
- `application/javascript`
- `application/ecmascript`
- `module`：ESM（ECMAScript Module）

`type` 属性值默认为 `text/javascript`，一般可以省略。

### 混搭

两种使用 JavaScript 的方式，使用 `src` 的优先级较高。只要有 `src` 属性，`<script>` 标签包裹的代码将**不会执行**。

引用外部文件的方式，在可维护性，缓存和适应未来等方面有更大的优势，被认为是更佳的做法。

可能是受到曾风靡一时的雪碧图的影响，许多开发人员偏爱将某一页面引用的全部脚本打包成一个脚本文件，用以避免多次创建 HTTP 请求造成的延迟和性能消耗。随着曾经 SPDY（speedy，Google 最早提出的通过压缩、多路复用和优先级缩短网页加载时间的协议，15 年 9 月，Google 宣布移除对 SPDY 的支持）的过渡和如今 HTTP/2 的逐渐普及，适当拆分脚本既不会降低传输效率，也能最大程度使用浏览器的缓存能力。

## `<script>` 标签属性

### `nomodule`

`nomodule` 属性用于在不支持 ESM 的浏览器中提供回退脚本：
- 支持 `type="module"` 的浏览器：`<script nomodule src=""></script>` 无效
- 不支持 `type="module"` 的浏览器：`<script nomodule src=""></script>` 正常执行

### `async`、`defer`

当浏览器解析到 `<script>` 元素时，浏览器将**立即开始下载脚本**：
- 正常：脚本下载完后，立即执行该脚本。**下载**和执行期间，后续解析被阻塞
- `async`：脚本下载完后，其它解析暂停，立即执行该脚本
- `defer`：脚本下载完后，将等到文档所有内容解析完成之后，才执行该脚本

`defer` 脚本应该在 `DOMContentLoaded` 事件之前执行完毕。若有多个延迟脚本，理论上将按其在文档中的位置顺序执行。但在《JavaScript 高级程序设计》第 3、4 版中都有说明，延迟脚本的实际执行顺序并不确定，保证页面至多一个 `defer` 脚本是最佳实践。

![async-defer](/ES%20核心-前言/async-defer.jpg)

:::tip 补充
当**初始的** HTML 文档被完全加载和解析完成之后，`DOMContentLoaded` 事件被触发，而无需等待样式表、图像和子框架的完全加载。
:::

### `crossorigin`

其它 HTML 元素如 `<audio>`、`<video>`、`<link>`、`<img>` 等进行资源请求时没有跨域限制，但行为上有一定限制，它们均有 `crossorigin` 属性。

只要设置了 `crossorigin` 属性，资源请求就必须通过 CORS 认证：
1. 请求资源时将携带 `Origin` 请求头（默认不携带）
2. 首先进行 `Access-Controll-Allow-Origin` 响应头校验（默认不需要）
3. CORS 验证通过后，**可能**需要服务器根据 Cookie 等凭证进一步处理（某些情况下会携带 Cookie 等凭证）
4. 服务器响应资源，此时 `window.onerror` 也能捕获到脚本完整的报错信息（没有 CORS 验证只能获取到 `Script error.`） 

`crossorigin` 属性的值：
- `crossorigin`、`crossorigin=""`：效果等同于 `anonymous`
- `anonymous`：缺省值，**同域携带** Cookie 等凭据，**跨域不携带**
- `use-credentials`：请求**始终携带** Cookie 等凭据

`anonymous` 值适用于使用 CDN 资源，跨域请求时既不需要携带凭证从而保证安全，又能在获取到的脚本报错时看到完整错误信息。

`use-credentials` 值适用于请求资源完全受控、绝对安全，且需要 Cookie 等凭据认证后才能获取到的场景。除此之外，设置 `use-credentials` 值需要谨慎。

有一种特殊情况，就是在请求 `manifest` 资源时，**无论跨域与否必须**使用 `use-credentials` 值。[Google 搜索](https://www.google.com/)的案例：

```HTML
<link href="/manifest?pwa=webhp" crossorigin="use-credentials" rel="manifest">
```

### `integrity`

`integrity` 属性的值是文件 Hash，用于校验文件的完整性。同一份文件，用相同算法生成的 Hash 值始终一样。

```HTML
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js" 
        integrity="sha256-ur/YlHMU96MxHEsy3fHGszZHas7NzH4RQlD4tDVvFhw=" 
        crossorigin="anonymous">
</script>
```

`integrity` 属性的 Hash 值共两个部分：
- 第一部分：此 Hash 值的生成算法，目前支持 sha256、sha384 及 sha512
- 第二部分：将 Hash 值进行 base64 编码
- 两部分通过一个短横 `-` 连接


`integrity` 可有多个 Hash 值，只要文件匹配其中任意一个 Hash 值，就可以通过校验并执行。

许多 CDN 服务提供了拷贝 `HTML + SRI` （Subresource Integrity，即子资源完整性）的功能，就是在引用资源的 `integrity` 属性上存入了服务器生成的 Hash 值，客户端加载完资源后会生成其 Hash 值，并与服务器生成的 Hash 值对比，若不一致说明**脚本或样式表**内容被篡改，此时资源将不会被执行。

:::tip 补充
可以通过 Linux 的 `openssl` 或 `shasum` 命令生成 Hash 值。

CSP（Content Security Policy，即内容安全政策）可以强制页面所有脚本或样式表启用 SRI 策略。此时若**未携带 `integrity` 属性**，内容将**不会被加载**。服务器启用 SRI 策略的响应头：

```HTTP
# 页面所有脚本启用 SRI 策略
Content-Security-Policy: require-sri-for script;
# 页面所有样式表启用 SRI 策略
Content-Security-Policy: require-sri-for style;
```
:::

