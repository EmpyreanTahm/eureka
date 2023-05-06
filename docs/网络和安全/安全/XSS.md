# XSS

跨站脚本攻击（Cross-Site Scripting），由于与层叠样式表的缩写相同，为避免混淆简称为 XSS。

XSS 是由于 Web 应用程序对用户的输入过滤不足而产生的，攻击者利用网页漏洞向页面插入恶意脚本，其他用户浏览网页时，就会执行其中的恶意代码，对受害者用户可能采取 Cookie 窃取、会话劫持、钓鱼欺骗等各种攻击。

## 攻击类型

XSS 攻击通常分为三类：反射型 XSS、存储型 XSS、DOM-based XSS。


### 反射型 XSS

反射型 XSS 漏洞常见于通过 URL 传递参数，网站通过 `innerHTML` 等方式使用 URL 参数，攻击者将含恶意脚本放入 `<script>` 标签，并拼接到网站参数中，诱导用户点击。

### 存储型 XSS

存储型 XSS 指恶意脚本永久存储在服务器上。如博客类网站未对用户输入做好过滤，导致其他用户访问攻击者的文章时，会自动执行恶意脚本。

### DOM-based XSS

前端开发者对于表单、URL 参数等用户输入未严格过滤，使用 `innerHTML`、`outerHTML`、`appendChild`、`document.write()` 等 API 将用户输入插入页面，执行恶意代码。

## 防范

对待 XSS 攻击，需要认识到所有的用户输入都有恶意的可能性。防范 XSS 攻击，需要将 URL 或用户输入中的特殊符号 `<`、`>` 等进行转义，避免或谨慎使用 `innerHTML`、`outerHTML`、`appendChild`、`document.write()` 等 API。

XSS 攻击往往通过获取用户 Cookie 造成更严重的后果，可以：
- 给 `Set-Cookie` 添加 `HttpOnly` 属性，防止脚本读取和修改 Cookie
- 开启内容安全策略（CSP）防护，通过 `Content-Security-Policy` 响应头规定资源的可信任的域名
