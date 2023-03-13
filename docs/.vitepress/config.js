import algoliaConfig from "./algoliaConfig";
import navConfig from "./navConfig";
import sidebarConfig from "./sidebarConfig";

export default {
  title: 'ευρηκα',
  description: '尤里卡 前端 开发 学习 EUREKA 常空 ευρηκα',
  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'ευρηκα',
    markdown: {lineNumbers: true,},
    lastUpdated: true,
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-PRESENT ευρηκα',
    },
    // ...algoliaConfig,
    ...navConfig,
    ...sidebarConfig
  },
}
