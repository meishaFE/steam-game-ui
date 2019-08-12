# Message 消息提示
消息提示

## 服务方式调用$message

:::demo

```html
<template>
  <div>
    <st-button @click="showMessage">正常的</st-button>
    <st-button @click="showErrorMessage">错误的</st-button>
    <st-button @click="showSuccessMessage">正确的</st-button>
    <st-button @click="showLoadingMessage">加载中</st-button>
    <st-button @click="showCbMessage">可回调</st-button>
    <st-button @click="showAlawaysMessage">一直在</st-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loadingFlag: false
    };
  },
  methods: {
    showMessage() {
      this.$message({ content: '这是正常的' });
    },
    showErrorMessage() {
      this.$message.error({ content: '竟然失败了' });
    },
    showSuccessMessage() {
      this.$message.success({ content: '居然成功了' });
    },
    showLoadingMessage() {
      this.$message.loading({ content: '真慢啊' });
    },
    showCbMessage() {
      this.$message({
        content: '这是正常的',
        cb: () => {
          this.$message({ content: '我是回调啊', type: 'success' });
        }
      });
    },
    showAlawaysMessage() {
      this.nowMessage = this.$message.loading({
        content: '我会一直在的哦，直到你点击关闭',
        duration: 0
      });
      setTimeout(() => {
        this.nowMessage.close();
      }, 6000);
    }
  }
};
</script>
```

:::
