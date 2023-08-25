<div align="center">
  <img alt="logo" src="src/assets/logo.png" width="160">
  <h1>抖音 web 小助手</h1>
  <p align="center">
    <a href="https://chrome.google.com/webstore/detail/khgcifnapfcaleokihendkolpcfgkepk"><img alt="Web Store" src="https://img.shields.io/chrome-web-store/v/khgcifnapfcaleokihendkolpcfgkepk?color=blue&label=Chrome%20Web%20Store&style=flat-square"></a>
    <a href="https://chrome.google.com/webstore/detail/khgcifnapfcaleokihendkolpcfgkepk"><img alt="Web Store" src="https://img.shields.io/chrome-web-store/users/khgcifnapfcaleokihendkolpcfgkepk?color=important&label=Users&style=flat-square"></a>
    <a href="https://github.com/douyin-helper/douyin-helper/graphs/contributors"><img alt="Make with Hobby" src="https://img.shields.io/static/v1?label=Make%20with&message=Hobby&color=critical&style=flat-square"></a>
  </p>
</div>

抖音网页版（[douyin.com](https://douyin.com)）浏览器插件，集成多种实用小功能，安装后使用抖音可获得更好的体验。这是免费开源的第三方项目，并非官方产品。

## 安装

通过 [Chrome Web Store](https://chrome.google.com/webstore/detail/khgcifnapfcaleokihendkolpcfgkepk) 安装（推荐），或在 [Releases 页面](https://github.com/douyin-helper/douyin-helper/releases) 中下载最新版本的 `.crx` 文件至本地再手动安装。

## 功能

### 保持评论区展开

添加时间：`2022-01-02`

刷抖音不看评论，乐趣少七分。相比于移动端，web 端有足够的空间同时展示视频和评论。此功能可以让评论区保持展开，刷视频时不再需要手动打开了，欸，就很香。

### 自定义快捷键

添加时间：`2022-03-02`

修改官方原有的快捷键配置。

### 右键搜索

添加时间：`2022-03-09`

在网页里选中文本后，右键菜单增加「使用抖音搜索“所选文本”」。

### 下载视频

添加时间：`2022-03-27`

可下载信息流和列表页的视频。此功能仅供个人学习研究使用，禁止用于其他用途，使用即承诺遵守法律法规与相关协议。

### 更多

前往[讨论区](https://github.com/douyin-helper/douyin-helper/discussions/categories/%E9%9C%80%E6%B1%82%E5%BB%BA%E8%AE%AE)说出你的需求。

## 失效反馈

抖音网站迭代较频繁，其中一些变动可能会导致小助手的功能失效，这时请在[讨论区](https://github.com/douyin-helper/douyin-helper/discussions/categories/%E5%A4%B1%E6%95%88-bug)中反馈。

因为插件版本更新需要经过审核，时长在几小时至数周（3 周之内算正常）不等。为了缩短失效时间，小助手从 `v1.1.1` 版本开始引入了配置下发机制，无需等待漫长的审核即可适配网站新版，这在大多数情况下应该能起到作用。

## 更新日志

[`v3.0.0`](https://github.com/douyin-helper/douyin-helper/releases/tag/v3.0.0) - `2023-08-25`

- 优化选项页面
- 移除显示视频发布时间功能（官方已支持）
- 支持右键搜索结果页在当前标签打开
- 修正视频检测失败的问题
- 优化视频下载体验

[`v2.2.4`](https://github.com/douyin-helper/douyin-helper/releases/tag/v2.2.4) - `2022-06-19`

- 修正浏览器升级后点击下载没反应的问题

[`v2.2.3`](https://github.com/douyin-helper/douyin-helper/releases/tag/v2.2.3) - `2022-05-11`

- 优化下载文件名（新版 Chrome）

[`v2.2.2`](https://github.com/douyin-helper/douyin-helper/releases/tag/v2.2.2) - `2022-03-31`

- 修正更新后自动打开的页面 url

[`v2.2.1`](https://github.com/douyin-helper/douyin-helper/releases/tag/v2.2.1) - `2022-03-27`

- 修正下载动作偶尔没有触发的问题

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
