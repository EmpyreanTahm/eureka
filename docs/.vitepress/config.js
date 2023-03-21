import algoliaConfig from "./algoliaConfig";
import navConfig from "./navConfig";
import sidebarConfig from "./sidebarConfig";

export default {
  title: 'Eureka',
  description: '尤里卡 前端 开发 学习 Eureka 常空',
  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'Eureka',
    markdown: { lineNumbers: true, },
    lastUpdated: true,
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-PRESENT Eureka',
    },
    // ...algoliaConfig,
    ...navConfig,
    ...sidebarConfig
  },
}
