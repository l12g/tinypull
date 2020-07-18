## pullx

一个超迷你的下拉刷新的库

## 安装

```bash
npm i pullx
```

with yarn

```bash
yarn add pullx
```

## 使用

```js
import pullx from 'pullx'

pullx(wrapper:string | HtmlElement,trigger:Function,config?:Object)

```

参数说明

- `wrapper` 要下拉的容器，字符串或 dom 节点
- `trigger` 回调函数，接受一个参数`done`用于结束下拉，也可返回一个`Promise`
- `config` 一些配置

pullx 返回一个函数，用于清理实例

```js
const clear = tinypull(wrapper, trigger);
clear();
```

## 配置

`pullx.defaults` 用于更改默认参数

- `duration` 回弹速度，默认 200
- `successedDelay` 成功状态持续时间，默认 200
- `loadingText` 加载状态的文案
- `holdText` 按住状态的文案
- `releaseText` 可进行刷新时状态的文案
- `successedText` 刷新成功的文案
- `className` 自定义 class

```js
pullx.defaults.holdText = "下拉刷新";
```


## 本地开发

```bash
npm run dev
```

打包
```bash
npm run build
```