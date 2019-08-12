# Click outside

## 基本用法
使用v-clickoutside指令调用
:::demo

```html
<template>
  <st-button v-clickoutside="clickOut" @click="clickIn">{{clickText}}</st-button>
</template>
<script>
export default {
  data() {
    return {
      clickText: '来吧，戳我'
    };
  },
  methods: {
    clickOut() {
      this.clickText = '点到外面啦';
    },
    clickIn() {
      this.clickText = '点在里面';
    }
  }
};
</script>


```

:::
