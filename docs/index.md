---
layout: home

hero:
  name: ευρηκα
  text: Μη μου τους κύκλους τάραττε!
  tagline: ——´Αρχιμήδης
  image:
    src: /Αρχιμήδης.png
    alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: /guide/what-is-vitepress
    - theme: alt
      text: View on GitHub
      link: https://github.com/GeekKery/eureka

features:
  - icon: 🍚
    title: 基础
    details: 前端从业者需要掌握的基础知识。
    link: '/基础/index'
  - icon: 🍔
    title: 框架
    details: 前端框架基本知识梳理，一些思考和备忘。
    link: '/框架/index'
  - icon: 🛠️
    title: 工具
    details: 开发利器，提高生产力。
    link: '/工具/index'
  - icon: 📡
    title: 网络和安全
    details: 保护关键系统和敏感信息免遭数字攻击的实践。
    link: '/网络和安全/index'
  - icon: 🧮
    title: 算法
    details: 解决问题的清晰指令。
    link: '/算法/index'
  - icon: ✂️
    title: 设计模式
    details: 面临的一般问题的三板斧。
    link: '/设计模式/index'
  - icon: 🏎️
    title: 性能优化
    details: 提供给用户更好的体验。
    link: '/性能优化/index'
  - icon: ✍️
    title: 随笔
    details: 沵恏，迣鎅。
    link: '/随笔/index'
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme';
const members = [
  {
    avatar: '/avatar_GeekKery.png',
    name: 'GeekKery',
    title: '行远自迩，登高自卑',
    links: [
      { icon: 'github', link: 'https://github.com/GeekKery' },
      { icon: 'youtube', link: 'https://space.bilibili.com/389697113' },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>About me</template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="members"/>
</VPTeamPage>
