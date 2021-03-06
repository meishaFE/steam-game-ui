# Loading 加载
加载，可通过指令和服务调用

## v-loading
使用v-stloading指令调用
:::demo

```html
<template>
  <div>
    <div v-loading="loadingFlag">
      <p>床前明月光 床前明月光 床前明月光 床前明月光 床前明月光 床前明月光 床前明月光 床前明月光</p>
      <p>疑是地上霜 疑是地上霜 疑是地上霜 疑是地上霜 疑是地上霜 疑是地上霜 疑是地上霜 疑是地上霜</p>
      <p>举头望明月 举头望明月 举头望明月 举头望明月 举头望明月 举头望明月 举头望明月 举头望明月</p>
      <p>低头思故乡 低头思故乡 低头思故乡 低头思故乡 低头思故乡 低头思故乡 低头思故乡 低头思故乡</p>
    </div>
    <st-button size="mini" @click="loadingFlag = !loadingFlag">通过指令调用</st-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loadingFlag: false
      }
    }
  }
</script>
```
:::

## 全屏loading
使用指令加`.fullscreen`修饰符调用，或者使用服务方式
:::demo

```html
<template>
  <div>
    <st-button size="mini" v-loading.fullscreen="loadingFlag" @click="openByDirective">通过指令调用</st-button>
    <st-button size="mini" @click="openByService">通过服务调用</st-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loadingFlag: false
      }
    },
    methods: {
      openByDirective() {
        this.loadingFlag = true;
        setTimeout(() => {
          this.loadingFlag = false;
        }, 2000);
      },
      openByService() {
        let loading = this.$loading({
          text: '2s后关闭'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      }
    }
  }
</script>
```
:::

## 自定义样式
自定义loading文案，spinner类名，背景颜色
:::demo

```html
<template>
  <div
    st-loading-text="我是提示"
    st-loading-spinner="st-icon-right"
    st-loading-background="rgba(248, 214, 29, 0.3)"
    v-loading="true">
    <p>床前明月光 床前明月光 床前明月光 床前明月光 床前明月光 床前明月光 床前明月光 床前明月光</p>
    <p>疑是地上霜 疑是地上霜 疑是地上霜 疑是地上霜 疑是地上霜 疑是地上霜 疑是地上霜 疑是地上霜</p>
    <p>举头望明月 举头望明月 举头望明月 举头望明月 举头望明月 举头望明月 举头望明月 举头望明月</p>
    <p>低头思故乡 低头思故乡 低头思故乡 低头思故乡 低头思故乡 低头思故乡 低头思故乡 低头思故乡</p>
  </div>
</template>
```

:::


## Attribute
|参数|说明|类型|可选值|默认值|
|-|-|-|-|-|
|target|Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点|object/string|-|document.body|
|text|显示在加载图标下方的加载文案|string|-|-|
|spinner|自定义加载图标类名|string|-|-|
|background|遮罩背景色|string|-|-|
|customClass|Loading 的自定义类名|string|-|-|
|fullscreen|设置该loading为全屏loading，同`v-loading`指令中的`fullscreen`修饰符|boolean|-|false|

## TODO
- [ ] 完善文档
- [ ] 单元测试


