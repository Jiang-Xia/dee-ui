
<div align="center">
	<!-- <img style="width: 80px;height: 80px" src=""/> -->
	<h1>DeeUI</h1>
</div>


[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## 简介

DeeUI  是一个基于 Vue2、Vue-cli、Element UI 的业务表单组件库，方便多个项目中使用古封装一个npm包发布。

## 主要技术和依赖

- [Vue2](https://v2.cn.vuejs.org/)
- [Element UI](https://element.eleme.cn/#/zh-CN/component/installation)
  

## 推荐IDE
- [VSCode](https://code.visualstudio.com/) + [vuter](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)


## 代码仓库

- [dee-ui](https://gitee.com/jiang-xia/dee-ui)

## 安装使用

- 安装依赖

```bash
npm install
```

- 本地运行预览

```bash
npm run serve
```

- 打包为npm包

```bash
npm run lib
```
- 发布npm包

```bash
// 登录(未登录需登录验证npm账号)
npm login
```
- 更新版本号(xx.xx.xx)

```bash
npm version patch修改版本号最后一位，表示一些补丁和修复
npm version minor修改版本号第二位，表示一个小版本的更新
npm version major修改版本号第一位，表示一个大版本的更新
```
- 发布
```bash
npm publish
```

- 安装 dee-ui

```bash
npm install dee-ui
```

- vue-cli中使用 dee-ui

```JavaScript
import Vue from 'vue'
import DeeUI from 'dee-ui'
import 'dee-ui/lib/dee-ui.css'
Vue.use(DeeUI)
```
## 开源作者

**jiang-xia**
