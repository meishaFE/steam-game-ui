# Button 按钮
常用的操作按钮

## 基础用法
基础的按钮用法，按钮分两种状态，默认和primary
:::demo

```html
<template>
  <st-button>默认按钮</st-button>
  <st-button type="primary">主要按钮</st-button>
</template>
```

:::

## 不同状态
一共四种状态、默认、hover、禁用、加载中
:::demo

```html
<template>
  <div>
    <st-button>默认状态</st-button>
    <st-button disabled>禁用状态</st-button>
    <st-button loading>加载状态</st-button>
  </div>
  <div>
    <st-button type="primary">默认状态</st-button>
    <st-button type="primary" disabled>禁用状态</st-button>
    <st-button type="primary" loading>加载状态</st-button>
  </div>
</template>
```

:::


## 不同大小
一共有四种size，默认、`medium`、`small`、`mini`
:::demo 设置size

```html
<template>
  <div>
    <st-button>默认大小</st-button>
    <st-button size="medium">中等按钮</st-button>
    <st-button size="small">小型按钮</st-button>
    <st-button size="mini">超小按钮</st-button>
  </div>
  <div>
    <st-button type="primary">默认大小</st-button>
    <st-button type="primary" size="medium">中等按钮</st-button>
    <st-button type="primary" size="small">小型按钮</st-button>
    <st-button type="primary" size="mini">超小按钮</st-button>
  </div>
</template>
```

:::


## Attribute
|参数|说明|类型|可选值|默认值|
|-|-|-|-|-|
|type|类型|string|default / primary / 2d|default|
|size|尺寸|string|large / medium / small / mini|large|

## Events
|事件名称|说明|回调参数|
|-|-|-|
|click|点击按钮触发|(event: Event)|

## TODO

- [ ] 2d类型
- [x] hover状态，loading状态，disabled状态
- [x] 完善文档，完善demo
- [x] 单元测试



