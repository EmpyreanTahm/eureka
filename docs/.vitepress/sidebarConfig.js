export default {
  sidebar: {
    "/": [{
      "items": [
        {"text": "导读", "link": "index"}
      ]
    }],
    "/基础/": [{
      "items": [
        {
          "text": "index", "link": "基础/index.html"
        },
        {
          "text": "样式",
          collapsed: false,
          "items": [
            {"text": "BFC", "link": "基础/样式/BFC.html"},
            {"text": "flex 布局", "link": "基础/样式/flex 布局.html"},
            {"text": "position", "link": "基础/样式/position.html"},
            {"text": "优先级", "link": "基础/样式/优先级.html"},
            {"text": "清楚浮动", "link": "基础/样式/清楚浮动.html"},
            {"text": "盒模型", "link": "基础/样式/盒模型.html"},
            {"text": "移动端布局", "link": "基础/样式/移动端布局.html"}]
        },
        {
          "text": "JavaScript 核心",
          collapsed: false,
          "items": [
            {"text": "new 机制", "link": "基础/JavaScript 核心/new 机制.html"},
            {"text": "this 机制", "link": "基础/JavaScript 核心/this 机制.html"},
            {"text": "作用域和闭包", "link": "基础/JavaScript 核心/作用域和闭包.html"},
            {"text": "内存回收机制", "link": "基础/JavaScript 核心/内存回收机制.html"},
            {"text": "原型和原型链", "link": "基础/JavaScript 核心/原型和原型链.html"},
            {"text": "类型和判定", "link": "基础/JavaScript 核心/类型和判定.html"},
            {"text": "继承", "link": "基础/JavaScript 核心/继承.html"}]
        },
        {
          "text": "ES6+",
          collapsed: false,
          "items": [
            {"text": "Generator 函数", "link": "基础/ES6+/Generator 函数.html"},
            {"text": "Promise", "link": "基础/ES6+/Promise.html"},
            {"text": "async await", "link": "基础/ES6+/async await.html"},
            {"text": "iterator 和 for ... of", "link": "基础/ES6+/iterator 和 for ... of.html"},
            {"text": "map 和 set", "link": "基础/ES6+/map 和 set.html"}
          ]
        },
        {
          "text": "进阶",
          collapsed: false,
          "items": [
            {"text": "base64", "link": "基础/JavaScript 进阶/base64.html"},
            {"text": "事件循环", "link": "基础/JavaScript 进阶/事件循环.html"},
            {"text": "异步编程", "link": "基础/JavaScript 进阶/异步编程.html"},
            {"text": "模块化", "link": "基础/JavaScript 进阶/模块化.html"},
            {"text": "模块循环引用解决方案", "link": "基础/JavaScript 进阶/模块循环引用解决方案.html"}
          ]
        }
      ]
    }],
    "/工具/": [{
      "items": [
        {"text": "index", "link": "工具/index.html"},
        {
          "text": "浏览器",
          collapsed: false,
          "items": [
            {"text": "DOM 事件流", "link": "工具/浏览器/DOM 事件流.html"},
            {"text": "window.requestAnimationFrame", "link": "工具/浏览器/window.requestAnimationFrame.html"},
            {"text": "事件委托", "link": "工具/浏览器/事件委托.html"},
            {"text": "关键渲染路径", "link": "工具/浏览器/关键渲染路径.html"},
            {"text": "实现 insertAfter", "link": "工具/浏览器/实现 insertAfter.html"},
            {"text": "本地存储机制", "link": "工具/浏览器/本地存储机制.html"},
            {"text": "跨域", "link": "工具/浏览器/跨域.html"},
            {"text": "重绘和回流", "link": "工具/浏览器/重绘和回流.html"}
          ]
        },
        {
          "text": "Git",
          collapsed: false,
          "items": [
            {"text": "git rebase 和 git merge", "link": "工具/Git/git rebase 和 git merge.html"}
          ]
        },
        {
          "text": "Webpack",
          collapsed: false,
          "items": [
            {"text": "Babel 原理", "link": "工具/Webpack/Babel 原理.html"},
            {"text": "Loader 和 Plugin", "link": "工具/Webpack/Loader 和 Plugin.html"},
            {"text": "Tree-Shaking", "link": "工具/Webpack/Tree-Shaking.html"},
            {"text": "热加载", "link": "工具/Webpack/热加载.html"}
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
            {"text": "K8S", "link": "工具/Docker/K8S.html"},
            {"text": "容器编排", "link": "工具/Docker/容器编排.html"},
            {"text": "虚拟化", "link": "工具/Docker/虚拟化.html"}
          ]
        },
      ]
    }],
    "/性能/": [
        {"text": "index", "link": "性能/index.html"},
        {"text": "单页应用 SEO", "link": "性能/单页应用 SEO.html"},
        {"text": "懒加载", "link": "性能/懒加载.html"},
        {"text": "防抖和节流", "link": "性能/防抖和节流.html"}
      ],
    "/框架/": [{
      "items": [{
        "text": "Vue",
        "items": [{"text": "AST", "link": "框架/Vue/AST.html"}, {
          "text": "Diff 算法",
          "link": "框架/Vue/Diff 算法.html"
        }, {
          "text": "data 是函数而不是对象的原因",
          "link": "框架/Vue/data 是函数而不是对象的原因.html"
        }, {"text": "keep-alive", "link": "框架/Vue/keep-alive.html"}, {
          "text": "nextTick",
          "link": "框架/Vue/nextTick.html"
        }, {"text": "template 转换成 DOM", "link": "框架/Vue/template 转换成 DOM.html"}, {
          "text": "v-if 和 v-for",
          "link": "框架/Vue/v-if 和 v-for.html"
        }, {"text": "v-model 语法糖", "link": "框架/Vue/v-model 语法糖.html"}, {
          "text": "v-show 和 v-if",
          "link": "框架/Vue/v-show 和 v-if.html"
        }, {"text": "vuex", "link": "框架/Vue/vuex.html"}, {
          "text": "响应式原理",
          "link": "框架/Vue/响应式原理.html"
        }, {"text": "声明周期和钩子函数", "link": "框架/Vue/声明周期和钩子函数.html"}, {
          "text": "监测数组和对象",
          "link": "框架/Vue/监测数组和对象.html"
        }, {"text": "组件通信", "link": "框架/Vue/组件通信.html"}, {
          "text": "虚拟 DOM",
          "link": "框架/Vue/虚拟 DOM.html"
        }, {"text": "路由保存滚动位置", "link": "框架/Vue/路由保存滚动位置.html"}, {
          "text": "路由模式",
          "link": "框架/Vue/路由模式.html"
        }, {"text": "页面闪烁问题", "link": "框架/Vue/页面闪烁问题.html"}]
      }, {"text": "Vue3", "items": [{"text": "改进的响应式", "link": "框架/Vue3/改进的响应式.html"}]}, {
        "text": "index",
        "link": "框架/index.html"
      }]
    }],
    "/算法/": [{
      "items": [{"text": "index", "link": "算法/index.html"}, {
        "text": "算法解析",
        "link": "算法/算法解析.html"
      }]
    }],
    "/网络和安全/": [{
      "items": [{"text": "index", "link": "网络和安全/index.html"}, {
        "text": "安全",
        "items": [{
          "text": "CSRF（Cross-Site Rquest Forgery）",
          "link": "网络和安全/安全/CSRF（Cross-Site Rquest Forgery）.html"
        }, {"text": "DDos 攻击", "link": "网络和安全/安全/DDos 攻击.html"}, {
          "text": "XSS（Cross-Site Scripting）",
          "link": "网络和安全/安全/XSS（Cross-Site Scripting）.html"
        }, {"text": "中间人攻击", "link": "网络和安全/安全/中间人攻击.html"}]
      }, {
        "text": "网络",
        "items": [{"text": "CDN", "link": "网络和安全/网络/CDN.html"}, {
          "text": "HTTP 常见状态码",
          "link": "网络和安全/网络/HTTP 常见状态码.html"
        }, {"text": "HTTP 版本变迁", "link": "网络和安全/网络/HTTP 版本变迁.html"}, {
          "text": "HTTP 缓存机制",
          "link": "网络和安全/网络/HTTP 缓存机制.html"
        }, {"text": "TCP 和 UDP", "link": "网络和安全/网络/TCP 和 UDP.html"}, {
          "text": "URL 输入地址到看到页面的过程",
          "link": "网络和安全/网络/URL 输入地址到看到页面的过程.html"
        }, {
          "text": "三次握手和四次挥手",
          "link": "网络和安全/网络/三次握手和四次挥手.html"
        }, {"text": "正向代理和反向代理", "link": "网络和安全/网络/正向代理和反向代理.html"}, {
          "text": "浅析 HTTPS",
          "link": "网络和安全/网络/浅析 HTTPS.html"
        }]
      }]
    }],
    "/设计模式/": [{
      "items": [{"text": "index", "link": "设计模式/index.html"}, {
        "text": "代理模式",
        "link": "设计模式/代理模式.html"
      }, {"text": "单例模式", "link": "设计模式/单例模式.html"}, {
        "text": "发布订阅",
        "link": "设计模式/发布订阅.html"
      }, {"text": "装饰器模式", "link": "设计模式/装饰器模式.html"}]
    }],
    "/随笔/": [{"items": [{"text": "index", "link": "随笔/index.html"}]}]

    // '/': [],
    // '/基础/': [
    //   {text: '📓 导读', link: '/基础/index'},
    //   {
    //     text: '样式',
    //     collapsed: false,
    //     items: [
    //       {text: 'position', link: '/基础/样式/position'},
    //       {text: 'BFC', link: '/基础/样式/BFC'},
    //       {text: 'flex 布局.md', link: '/基础/样式/BFC'},
    //     ],
    //   },
    //   {
    //     text: 'JavaScript 核心',
    //     collapsed: false,
    //     items: [
    //       {text: '介绍', link: '/基础/JavaScript 核心/'},
    //     ],
    //   },
    //   {
    //     text: 'JavaScript 进阶',
    //     collapsed: false,
    //     items: [
    //       {text: '介绍', link: '/基础/JavaScript 进阶/'},
    //     ],
    //   },
    //   {
    //     text: 'ES6+',
    //     collapsed: false,
    //     items: [
    //       {text: '介绍', link: '/基础/ES6+/'},
    //     ],
    //   },
    // ]

  }
}