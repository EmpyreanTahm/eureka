export default {
  sidebar: {
    "/基础篇/": [{
      "items": [
        {
          "text": "🚥 CSS",
          collapsed: false,
          "items": [
            { "text": "📖 前言", "link": "/基础篇/CSS/" },
            { "text": "选择器", "link": "/基础篇/CSS/选择器" },
            { "text": "盒模型", "link": "/基础篇/CSS/盒模型" },
            { "text": "布局基础", "link": "/基础篇/CSS/布局基础" },
            { "text": "BFC", "link": "/基础篇/CSS/BFC" },
            { "text": "响应式网页设计", "link": "/基础篇/CSS/响应式网页设计" },
            { "text": "移动端适配", "link": "/基础篇/CSS/移动端适配" },
          ]
        },
        {
          "text": "🔺 ES 核心",
          collapsed: false,
          "items": [
            { "text": "📖 前言", "link": "/基础篇/ES 核心/" },
            { "text": "类型和判定", "link": "/基础篇/ES 核心/类型和判定" },
            { "text": "作用域和闭包", "link": "/基础篇/ES 核心/作用域和闭包" },
            { "text": "this 机制", "link": "/基础篇/ES 核心/this 机制" },
            { "text": "原型和继承", "link": "/基础篇/ES 核心/原型和继承" },
            { "text": "浅谈 GC", "link": "/基础篇/ES 核心/浅谈 GC" },
          ]
        },
        {
          "text": "🔴 ES6+",
          collapsed: false,
          "items": [
            { "text": "数组", "link": "/基础篇/ES6+/数组" },
            { "text": "Iterator", "link": "/基础篇/ES6+/Iterator" },
            { "text": "Promise", "link": "/基础篇/ES6+/Promise" },
            { "text": "Generator", "link": "/基础篇/ES6+/Generator" },
          ]
        },
        {
          "text": "♾️ ES 进阶",
          collapsed: false,
          "items": [
            { "text": "事件循环", "link": "/基础篇/ES 进阶/事件循环" },
            { "text": "异步编程", "link": "/基础篇/ES 进阶/异步编程" },
            { "text": "模块化", "link": "/基础篇/ES 进阶/模块化" },
            { "text": "模块循环引用解决方案", "link": "/基础篇/ES 进阶/模块循环引用解决方案" },
            { "text": "base64", "link": "/基础篇/ES 进阶/base64" },
          ]
        }
      ]
    }],
    "/框架/": [{
      "items": [
        { "text": "Tips", "link": "/框架/" },
        {
          "text": "Vue",
          collapsed: false,
          "items": [
            { "text": "生命周期和钩子函数", "link": "/框架/Vue/生命周期和钩子函数" },
            { "text": "data 是函数而不是对象的原因", "link": "/框架/Vue/data 是函数而不是对象的原因" },
            { "text": "v-if 和 v-for", "link": "/框架/Vue/v-if 和 v-for" },
            { "text": "v-show 和 v-if", "link": "/框架/Vue/v-show 和 v-if" },
            { "text": "v-model 语法糖", "link": "/框架/Vue/v-model 语法糖" },
            { "text": "keep-alive", "link": "/框架/Vue/keep-alive" },
            { "text": "nextTick", "link": "/框架/Vue/nextTick" },
            { "text": "监测数组和对象", "link": "/框架/Vue/监测数组和对象" },
            { "text": "组件通信", "link": "/框架/Vue/组件通信" },
            { "text": "页面闪烁问题", "link": "/框架/Vue/页面闪烁问题" },
            { "text": "vuex", "link": "/框架/Vue/vuex" },
            { "text": "响应式原理", "link": "/框架/Vue/响应式原理" },
            { "text": "template 转换成 DOM", "link": "/框架/Vue/template 转换成 DOM" },
            { "text": "Diff 算法", "link": "/框架/Vue/Diff 算法" },
            { "text": "AST", "link": "/框架/Vue/AST" },
            { "text": "虚拟 DOM", "link": "/框架/Vue/虚拟 DOM" },
            { "text": "路由模式", "link": "/框架/Vue/路由模式" },
            { "text": "路由保存滚动位置", "link": "/框架/Vue/路由保存滚动位置" },
          ]
        },
        {
          "text": "Vue3",
          collapsed: false,
          "items": [
            { "text": "改进的响应式", "link": "/框架/Vue3/改进的响应式" }
          ]
        },
      ]
    }],
    "/工具/": [{
      "items": [
        { "text": "Tips", "link": "/工具/" },
        {
          "text": "浏览器",
          collapsed: false,
          "items": [
            { "text": "DOM 事件流", "link": "/工具/浏览器/DOM 事件流" },
            { "text": "事件委托", "link": "/工具/浏览器/事件委托" },
            { "text": "本地存储机制", "link": "/工具/浏览器/本地存储机制" },
            { "text": "跨域", "link": "/工具/浏览器/跨域" },
            { "text": "重绘和回流", "link": "/工具/浏览器/重绘和回流" },
            { "text": "关键渲染路径", "link": "/工具/浏览器/关键渲染路径" },
            { "text": "实现 insertAfter", "link": "/工具/浏览器/实现 insertAfter" },
            { "text": "window.requestAnimationFrame", "link": "/工具/浏览器/window.requestAnimationFrame" },
          ]
        },
        {
          "text": "Git",
          collapsed: false,
          "items": [
            { "text": "git rebase 和 git merge", "link": "/工具/Git/git rebase 和 git merge" }
          ]
        },
        {
          "text": "Webpack",
          collapsed: false,
          "items": [
            { "text": "Babel 原理", "link": "/工具/Webpack/Babel 原理" },
            { "text": "Loader 和 Plugin", "link": "/工具/Webpack/Loader 和 Plugin" },
            { "text": "Tree-Shaking", "link": "/工具/Webpack/Tree-Shaking" },
            { "text": "热加载", "link": "/工具/Webpack/热加载" }
          ]
        },
        {
          "text": "Vite",
          collapsed: false,
          "items": []
        },
        {
          "text": "Docker",
          collapsed: false,
          "items": [
            { "text": "虚拟化", "link": "/工具/Docker/虚拟化" },
            { "text": "容器编排", "link": "/工具/Docker/容器编排" },
            { "text": "K8S", "link": "/工具/Docker/K8S" }
          ]
        },
      ]
    }],
    "/网络和安全/": [{
      "items": [
        { "text": "Tips", "link": "/网络和安全/" },
        {
          "text": "网络",
          "items": [
            { "text": "HTTP 缓存机制", "link": "/网络和安全/网络/HTTP 缓存机制" },
            { "text": "HTTP 版本变迁", "link": "/网络和安全/网络/HTTP 版本变迁" },
            { "text": "HTTP 常见状态码", "link": "/网络和安全/网络/HTTP 常见状态码" },
            { "text": "CDN", "link": "/网络和安全/网络/CDN" },
            { "text": "正向代理和反向代理", "link": "/网络和安全/网络/正向代理和反向代理" },
            { "text": "TCP 和 UDP", "link": "/网络和安全/网络/TCP 和 UDP" },
            { "text": "三次握手和四次挥手", "link": "/网络和安全/网络/三次握手和四次挥手" },
            { "text": "浅析 HTTPS", "link": "/网络和安全/网络/浅析 HTTPS" },
            { "text": "URL 输入地址到看到页面的过程", "link": "/网络和安全/网络/URL 输入地址到看到页面的过程" }
          ]
        },
        {
          "text": "安全",
          "items": [
            { "text": "XSS（Cross-Site Scripting）", "link": "/网络和安全/安全/XSS（Cross-Site Scripting）" },
            { "text": "CSRF（Cross-Site Rquest Forgery）", "link": "/网络和安全/安全/CSRF（Cross-Site Rquest Forgery）" },
            { "text": "中间人攻击", "link": "/网络和安全/安全/中间人攻击" },
            { "text": "DDos 攻击", "link": "/网络和安全/安全/DDos 攻击" }
          ]
        },
      ]
    }],
    "/算法/": [{
      "items": [
        { "text": "📖 前言", "link": "/算法/" },
        { "text": "5.最长回文子串", "link": "/算法/5.最长回文子串" },
        {
          "text": "🥡 栈",
          collapsed: false,
          "items": [
            { "text": "💡 介绍", "link": "/算法/栈/" },
            { "text": "20.有效的括号", "link": "/算法/栈/20.有效的括号" },
            { "text": "32.最长有效括号", "link": "/算法/栈/32.最长有效括号" },
            { "text": "71.简化路径", "link": "/算法/栈/71.简化路径" },
            { "text": "496.下一个更大元素 I", "link": "/算法/栈/496.下一个更大元素 I" },
            { "text": "503.下一个更大元素 II", "link": "/算法/栈/503.下一个更大元素 II" },
            { "text": "739.每日温度", "link": "/算法/栈/739.每日温度" },
          ]
        },
        {
          "text": "🛤️ Queue",
          collapsed: false,
          "items": [
            { "text": "3.无重复字符的最长子串", "link": "/算法/Queue/3.无重复字符的最长子串" },
          ]
        },
        {
          "text": "🎭 Hash Table",
          collapsed: false,
          "items": [
            { "text": "1.两数之和", "link": "/算法/Hash Table/1.两数之和" },
          ]
        },
        {
          "text": "♻️ Linked List",
          collapsed: false,
          "items": [
            { "text": "2.两数相加", "link": "/算法/Linked List/2.两数相加" },
          ]
        }
      ]
    }],
    "/设计模式/": [{
      "items": [
        { "text": "Tips", "link": "/设计模式/" },
        { "text": "单例模式", "link": "/设计模式/单例模式" },
        { "text": "代理模式", "link": "/设计模式/代理模式" },
        { "text": "发布订阅", "link": "/设计模式/发布订阅" },
        { "text": "装饰器模式", "link": "/设计模式/装饰器模式" }
      ]
    }],
    "/性能优化/": [{
      "items": [
        { "text": "Tips", "link": "/性能优化/" },
        { "text": "单页应用 SEO", "link": "/性能优化/单页应用 SEO" },
        { "text": "懒加载", "link": "/性能优化/懒加载" },
        { "text": "防抖和节流", "link": "/性能优化/防抖和节流" }
      ]
    }],
    "/随笔/": [{
      "items": [
        { "text": "Tips", "link": "/随笔/" }
      ]
    }]
  }
}
