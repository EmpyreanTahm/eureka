# HTTP 缓存机制

HTTP 缓存通过资源复用减轻服务器负担，显著提高网站和应用程序的性能。HTTP 缓存主要有客户端缓存和代理缓存，其它还包括网关缓存、CDN、反向代理缓存和负载均衡器等部署在服务器上的缓存方式。

HTTP 缓存主要用于 GET 请求静态资源，因为 GET 通常是幂等操作，不会改变服务器端的数据。AJAX 的 GET 请求通常是动态的，需要从服务器获取最新数据，一般根据业务需求配置 AJAX 的 GET 请求是否缓存。非 GET 请求通常不是幂等的，因此一般不做缓存配置，当然 HTTP 的缓存机制对它们依然生效。

根据**是否需要重新向服务器发起请求**这个条件可以将缓存分为两类：
- 强缓存：优先级最高，强缓存若有效，不会再和服务器发生交互进行协商
- 协商缓存：协商缓存需要先与服务端发生交互，以得知缓存是否有效

## 强缓存

首次向服务器发起资源请求后，服务器会告知客户端资源缓存的有效时间，有效期内直接从客户端缓存中读取，不必与服务器交互。强缓存通过 `Expires` 和 `Cache-Control` 首部字段来实现，**后者优先级更高**。

### `Expires`

HTTP/1.0 定义了 `Expires` 响应首部字段，用于告知客户端资源缓存的过期时间，在过期时间之前请求资源直接使用缓存，不需要再次请求服务器（排除其它首部字段干扰的情况下）。

```HTTP
Expires: Mon, 25 Jan 2021 23:04:06 GMT
```

`Expires` 过期时间由服务器生成，是否过期的判定最终需要参考客户端时间，其缺点在与：客户端和服务器时间可能不一致，而且客户端的时间是可以自行修改的，修改客户端操作系统的时间可能导致缓存失效，所以不一定满足预期。

### `Cache-Control`

HTTP/1.1 新增了 `Cache-Control` **通用**首部字段，设置的缓存时间为相对时间，优先级高于 `Expires`。`Cache-Control` 头的指令包括：
- `no-cache`（通用）：资源正常缓存，但使用前必须进行协商校验
- `no-store`（通用）：禁用所有缓存，直接从源服务器获取资源
- `public`（响应）：共享缓存和私有缓存都可以缓存响应，缺省 `private`
- `private`（响应）：只有私有缓存可以缓存响应
- `max-age = T`（响应）：缓存有效的秒数，为 `0` 时与 `no-cache` 效果一致
- `s-maxage = T`（响应）：覆盖 `max-age`，只适用于共享缓存，私有缓存会忽略
- `must-revalidation`（响应）：在缓存过期前可以使用，过期（如超过缓存时间）后必须向服务器验证
- `proxy-revalidation`（响应）：与 `must-revalidate` 作用相同，但仅适用于共享缓存
- `no-transform`（通用）：代理不可更改的媒体类型，如 `Content-Encoding`、`Content-Type` 等

共享缓存指可以被多个客户端使用的缓存，如中间代理服务器或 CDN 等中间层的缓存。私有缓存指只能被单个客户端使用的缓存，通常等价于浏览器缓存。

对于那些改动频率极低的资源库，常见的做法是将 `max-age` 的值设为 `31536000`，代表一年内缓存有效。如果在缓存有效期内，内容资源内容发生了改动，需要修改资源名称，如在资源名称中加版本号或生成随机 hash。

### `Pragma`

`Pragma` 是 HTTP/1.0 标准中定义的一个首部字段，`Pragma` 只有一个值 `no-cache`，效果跟 `Cache-Control: no-cache` 效果相同，请求中一般会额外添加 `Pragma` 以兼容基于 HTTP/1.0 的服务器。

```HTTP
Cache-Control: no-cache
Pragma: no-cache
```

## 协商缓存

强缓存通过设定有效时间确认缓存资源的有效性，协商缓存使用 `Last-Modified/If-Modified-Since` 和 `ETag/If-None-Match` 两对首部字段作为标识确定缓存是否有效，缓存有效返回 `304 Not Modified` 直接使用缓存，否则返回响应内容。

### `Last-Modified`

`Last-Modified` 的使用流程如下：
1. 客户端首次访问资源时，服务器返回首部字段 `Last-Modified` 表明资源在服务器最近修改的时间
2. 客户端在后续请求资源时会将这个时间放在请求首部的 `If-Modified-Since` 中
3. 服务器收到这个请求，会对比 `If-Modified-Since` 和服务器上这个资源的最后修改时间：
   - 如果一致就返回 `304 Not Modified`，让客户端直接从缓存里读取
   - 如果 `If-Modified-Since` 的时间小于服务器中这个资源的最后修改时间，说明文件有新的编辑，缓存失效，返回新的资源文件

### `Etag`

`Etag` 的使用流程如下：
1. 客户端首次访问资源时，服务器返回首部字段 `Etag`，`Etag` 的值是服务器响应请求时，返回当前资源文件的一个唯一标识
2. 客户端在后续请求此资源的时会将 `Etag` 值放在请求首部的 `If-None-Match` 中
3. 服务器收到这个请求，会对比 `If-None-Match` 和服务器此资源当前的 `Etag`：
   - 如果一致就返回 `304 Not Modified`，让客户端直接从缓存里读取
   - 否则说明文件内容有更新，缓存失效，返回新的资源文件。

`Etag` 的值为 `W/` 开头时，说明使用的是弱 `Etag`。弱 `Etag` 匹配只要求两个资源在语义上相等，强 `Etag` 匹配要求其它实体字段如 `Content-Language` 等也要一致。

若资源是分布式服务器（如 CDN）存储的情况，需要这些服务器上计算 `ETag` 的算法保持一致，才不会导致同一个文件，多台服务器返回的 `ETag` 却不一样。

### `If-Unmodified-Since` 和 `If-Match`

这两个请求首部字段与缓存关系不大，`If-Unmodified-Since` 条件请求是只有当资源在指定的时间之后没有修改的情况下，服务器才会返回请求的资源，或是接受 POST 或其它非安全方法的请求。如果所请求的资源在指定的时间之后发生了修改，那么会返回 `412 Precondition Failed`。

`If-Match` 条件请求在请求方法为 GET 和 HEAD 的情况下，服务器仅在请求的资源满足此首部列出的 `ETag` 值时才会返回资源。而对于 PUT 或其它非安全方法来说，只有在满足条件的情况下才可以将资源上传。

## 浏览器缓存

前面提到的强缓存和协商缓存根本上来说是缓存策略，资源具体的缓存位置实际只有内存和磁盘，在浏览器中包括非持久化的 "Memory Cache"、"Push Cache" 和持久化的 "Disk Cache"、"Service Worker" 四类缓存。

内存缓存的有效时间不超过标签页的存活周期，标签页被关闭时释放，具体释放时机取决于浏览器策略。内存缓存会忽略 `Cache-Control` 被标记为 `max-age=0` 或 `no-cache` 的情况，此时资源仍可被放入内存缓存，当值为 `no-store` 时，才不会被放入内存缓存。

内存缓存使得页面中的同一地址资源只需要进行一次请求，但当请求类型不同时，不会使用内存缓存。如脚本和样式表使用同一地址资源，会进行两次请求，另外预加载资源一般也存放在内存缓存中。

Service Worker 是运行在浏览器中的独立线程，可实现离线缓存、消息推送和网络代理等功能。Push Cache 是 HTTP/2 中的新内容。

浏览器缓存调用的优先关系是："Memory Cache" > "Service Worker" > "Disk Cache" > "Push Cache"，若在以上四个缓存中均未找到有效的缓存资源，将对服务器发起资源的请求。

Ajax 和 Fetch 中的 GET 请求通常会被用作等幂操作，前面讨论的 HTTP 缓存机制依然适用。

### 用户行为

用户行为对浏览器缓存的影响有以下几种（仅讨论 Memory Cache 和 Disk Cache）：
1. 标签页输入 URL 回车：首先验证缓存的有效性，有效则从磁盘获取资源
2. 普通刷新：首先验证缓存的有效性，有效优先从内存获取资源，否则从磁盘获取资源
3. 强制刷新：**浏览器不使用任何本地缓存而直接发送请求，请求头部将携带 `Cache-Control: no-cache` 和 `Pragma: no-cache`，并且不会在请求中携带协商缓存字段**，开发者工具中的 `Disable Cache` 选项的的效果与强制刷新一样

从强制刷新携带的请求头可以看出，其请求仅不使用任何本地缓存，但代理缓存依旧可能生效。

## 其它缓存首部字段

### `Date`

`Date` 通用首部包含了报文创建的日期和时间。`Date` 在响应中说明响应生成的时间，请求经过代理服务器时, 返回的 `Date` 未必是最新的，通常这个时候，代理服务器将增加一个 `Age` 字段告知该资源已缓存了多久。

### Age

`Age` 响应首部字段里包含资源在缓存代理中存贮的秒数。

```HTTP
Age: 40152
Date: Fri, 05 Feb 2021 16:58:00 GMT
```

### `Vary`

通过 `Vary` 响应首部字段，源服务器会向代理服务器传达关于本地缓存使用方法的指令。代理服务器接收到源服务器包含 `Vary` 的响应后，缓存对应资源，后续仅对 **Vary 值属性一样的请求**返回此缓存。即使对相同资源发起请求，但由于 `Vary` 指定的首部字段不相同，因此必须要从源服务器重新获取资源。

举例来说，同一 URL 的资源，根据客户端 `Accept-Language` 值的不同，需要内容不同的资源文件。中文客户端用户请求资源后，代理服务器进行了缓存。如果没有指定 `Vary: Accept-Language`，那么后续所有客户端将只能使用这份中文内容的缓存。如果指定 `Vary: Accept-Language`，那么只有中文客户端才会使用代理服务器的这份缓存。

```HTTP
Vary: Accept-Encoding, Accept-Language, User-Agent
```

如上设置，代理服务器将根据客户端支持的编码类型、自然语言和用户代理三个方面去缓存资源。如此，同一路径的资源，就能针对这三者的不同，返回对应的缓存内容，避免返回同一缓存。

## CDN

CDN (全称 Content Delivery Network)，即内容分发网络，是一种利用多个服务器在不同地理位置缓存和传输网站内容的技术，可以加快网页的加载速度，减少带宽消耗，提高用户体验和安全性。CDN 常用于提供静态内容、流媒体、直播、下载等服务。

CDN 的工作原理是通过全局负载均衡技术，将用户请求导向离用户最近的缓存服务器，由缓存服务器响应用户请求。如果缓存服务器没有用户需要的内容，会从源服务器获取内容并缓存到本地。缓存服务器会根据 HTTP 头部中的缓存控制字段，定期检查内容是否需要更新。

通过 CDN 获取资源 IP 地址的流程：
1. 浏览器发送域名给本地 DNS 服务器解析
2. 本地 DNS 服务器解析域名，获取指向 CDN 域名的 CNAME 别名记录（即 CND 网络的 DNS 服务器域名）
3. 本地 DNS 服务器向 CDN 提供商的 DNS 服务器发出请求，CDN 提供商的 DNS 服务器通过全局负载均衡技术解析域名，发返回最佳的 CDN 节点服务器的 IP 地址给 DNS
4. 本地 DNS 返回最佳 CDN 节点的 IP 给浏览器

CNAME（Canonical Name） 是一种 DNS 记录，指向 CDN 域名（而非 IP），CNAME 记录可以使域名指向不同的 CDN 服务商。
