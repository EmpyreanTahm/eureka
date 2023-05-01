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
            { "text": "Event Loop", "link": "/基础篇/ES6+/Event Loop" },
            { "text": "Promise", "link": "/基础篇/ES6+/Promise" },
            { "text": "Generator", "link": "/基础篇/ES6+/Generator" },
            { "text": "模块化", "link": "/基础篇/ES6+/模块化" },
          ]
        },
      ]
    }],
    "/框架/": [{
      "items": [
        {
          "text": "Vue2",
          collapsed: false,
          "items": [
            { "text": "响应式原理", "link": "/框架/Vue2/响应式原理" },
            { "text": "虚拟 DOM", "link": "/框架/Vue2/虚拟 DOM" },
            { "text": "模板编译", "link": "/框架/Vue2/模板编译" },
            { "text": "生命周期", "link": "/框架/Vue2/生命周期" },
            { "text": "组件通信", "link": "/框架/Vue2/组件通信" },
            { "text": "路由模式", "link": "/框架/Vue2/路由模式" },
          ]
        },
        {
          "text": "Vue3",
          collapsed: false,
          "items": [
            { "text": "📖 介绍", "link": "/框架/Vue3/" }
          ]
        },
      ]
    }],
    "/工具/": [{
      "items": [
        {
          "text": "浏览器",
          collapsed: false,
          "items": [
            { "text": "事件流与事件委托", "link": "/工具/浏览器/事件流与事件委托" },
            { "text": "本地存储机制", "link": "/工具/浏览器/本地存储机制" },
            { "text": "跨域", "link": "/工具/浏览器/跨域" },
            { "text": "关键渲染路径", "link": "/工具/浏览器/关键渲染路径" },
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
          "text": "🛤️ 队列",
          collapsed: false,
          "items": [
            { "text": "💡 介绍", "link": "/算法/队列/" },
            { "text": "3.无重复字符的最长子串", "link": "/算法/队列/3.无重复字符的最长子串" },
            { "text": "387.字符串中的第一个唯一字符", "link": "/算法/队列/387.字符串中的第一个唯一字符" },
            { "text": "933.最近的请求次数", "link": "/算法/队列/933.最近的请求次数" },
          ]
        },
        {
          "text": "♻️ 链表",
          collapsed: false,
          "items": [
            { "text": "💡 介绍", "link": "/算法/链表/" },
            { "text": "2.两数相加", "link": "/算法/链表/2.两数相加" },
          ]
        },
        {
          "text": "🎭 Hash Table",
          collapsed: false,
          "items": [
            { "text": "1.两数之和", "link": "/算法/Hash Table/1.两数之和" },
          ]
        },
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
