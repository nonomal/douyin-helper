<div align="center">
  <img alt="logo" src="src/assets/logo.png" width="160">
  <h1>抖音 web 小助手</h1>
  <p align="center">
    <a href="https://chrome.google.com/webstore/detail/khgcifnapfcaleokihendkolpcfgkepk"><img alt="Web Store" src="https://img.shields.io/chrome-web-store/v/khgcifnapfcaleokihendkolpcfgkepk?color=blue&label=Chrome%20Web%20Store&style=flat-square"></a>
    <a href="https://chrome.google.com/webstore/detail/khgcifnapfcaleokihendkolpcfgkepk"><img alt="Web Store" src="https://img.shields.io/chrome-web-store/users/khgcifnapfcaleokihendkolpcfgkepk?color=important&label=Users&style=flat-square"></a>
    <a href="https://github.com/douyin-helper/douyin-helper/graphs/contributors"><img alt="Make with Hobby" src="https://img.shields.io/static/v1?label=Make%20with&message=Hobby&color=critical&style=flat-square"></a>
  </p>
</div>

抖音 web 端（[douyin.com](https://douyin.com)）浏览器插件，集成多种实用小功能。这是第三方开源项目，功能会逐步增加，即使暂未满足你的需求，也欢迎安装使用，以随版本更新，第一时间获得新功能以及更好的观看体验。

## 安装

通过 [Chrome Web Store](https://chrome.google.com/webstore/detail/khgcifnapfcaleokihendkolpcfgkepk) 安装（推荐），或在 [Releases 页面](https://github.com/douyin-helper/douyin-helper/releases) 中下载最新版本的 `.crx` 文件至本地再手动安装。

## 功能

### 保持评论区展开

添加时间：`2022-01-02`

评论如同相声中的捧哏，是短视频表达中必不可少的一部分，刷抖音不看评论，乐趣少七分。相比于移动端，web 端有足够的空间同时展示视频和评论。此功能可以让评论区保持展开，刷视频时不再需要手动打开了，欸，就很香。

### 显示视频发布时间

添加时间：`2022-01-22`

有时候我们会刷到一些已经过时了的内容，而现在信息流里并没有显示视频发布时间，加上这个信息可以使上下文更完整。

### 自定义快捷键

添加时间：`2022-03-02`

覆盖官方原有的快捷键配置。

### 右键搜索

添加时间：`2022-03-09`

在网页里选中文本后，右键菜单增加「使用抖音搜索“所选文本”」。

### 下载视频

添加时间：`2022-03-27`

浏览信息流、详情页时点击插件，可下载当前播放的视频。此功能仅用于个人学习研究，请务必在遵守当地法律法规的前提下，合理使用内容。因浏览器存在一些 BUG（[1288041](https://bugs.chromium.org/p/chromium/issues/detail?id=1288041), [579563](https://bugs.chromium.org/p/chromium/issues/detail?id=579563)），更复杂的下载功能暂无法实现（比如指定下载文件名、批量下载等）。

### 更多

前往[讨论区](https://github.com/douyin-helper/douyin-helper/discussions/categories/%E9%9C%80%E6%B1%82%E5%BB%BA%E8%AE%AE)说出你的需求。

## 失效反馈

抖音网站迭代较频繁，其中一些变动可能会导致小助手的功能失效，这时请在[讨论区](https://github.com/douyin-helper/douyin-helper/discussions/categories/%E5%A4%B1%E6%95%88-bug)中反馈，有反馈就会有响应。

因为插件版本更新需要经过审核，时长在几小时至数周（3 周之内算正常）不等。为了缩短失效时间，小助手在 `v1.1.1` 版本中引入了配置下发机制，无需等待漫长的审核即可适配网站新版，这在大多数情况下应该能起到作用。

## 更新日志

[`v2.2.0`](https://github.com/douyin-helper/douyin-helper/releases/tag/v2.2.0) - `2022-03-27`

- 支持下载视频
- 移除优化视频描述功能（官方已支持）
- 移除自动隐藏光标功能（官方已支持）
- 修正切换页面后功能失效的问题

[`v2.1.0`](https://github.com/douyin-helper/douyin-helper/releases/tag/v2.1.0) - `2022-03-09`

- 支持右键搜索

[`v2.0.2`](https://github.com/douyin-helper/douyin-helper/releases/tag/v2.0.2) - `2022-03-05`

- 应对抖音 A/B test 的情况

[`v2.0.1`](https://github.com/douyin-helper/douyin-helper/releases/tag/v2.0.1) - `2022-03-04`

- 修正远程配置同步逻辑

[`v2.0.0`](https://github.com/douyin-helper/douyin-helper/releases/tag/v2.0.0) - `2022-03-02`

- 启用全新配置页
- 减少插件权限要求
- 支持自定义快捷键（[#8](https://github.com/douyin-helper/douyin-helper/discussions/8)）
- 修正视频发布时间偶尔不显示的问题
- 移除信息流视频描述内用户（@）点击跳转（官方已支持）
- 移除展开评论区时维持上下快捷键切换视频的功能（官方已支持）

[`v1.1.3`](https://github.com/douyin-helper/douyin-helper/releases/tag/v1.1.3) - `2022-02-13`

- 支持显示关注信息流视频发布时间
- 支持自动隐藏光标

[`v1.1.2`](https://github.com/douyin-helper/douyin-helper/releases/tag/v1.1.2) - `2022-01-22`

- 支持显示推荐信息流视频发布时间
- 启用「保持评论区展开」时，上下快捷键维持切换视频的功能

[`v1.1.1`](https://github.com/douyin-helper/douyin-helper/releases/tag/v1.1.1) - `2022-01-19`

- 引入配置下发机制，快速应对网站更新
- 支持点击信息流视频描述内的用户（@）跳转至搜索页

[`v1.1.0`](https://github.com/douyin-helper/douyin-helper/releases/tag/v1.1.0) - `2022-01-16`

- 支持点击信息流视频描述内的话题（#）跳转至搜索页

[`v1.0.1`](https://github.com/douyin-helper/douyin-helper/releases/tag/v1.0.1) - `2022-01-04`

- 兼容旧版抖音

[`v1.0.0`](https://github.com/douyin-helper/douyin-helper/releases/tag/v1.0.0) - `2022-01-02`

- 初始版本
