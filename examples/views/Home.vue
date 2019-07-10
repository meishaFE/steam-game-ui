<template>
  <div class="demo">
    <section class="demo__button">
      <h1>Button</h1>
      <div>
        <h2>不同按钮</h2>
        <st-button>默认按钮</st-button>
        <st-button type="primary">主要按钮</st-button>
      </div>
      <div>
        <h2>不同大小</h2>
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
      </div>
      <div>
        <h2>不同状态</h2>
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
      </div>
    </section>
    <section class="demo__icon">
      <h1>Icon</h1>
      <div>
        <i class="st-icon-loading"></i>Loading
      </div>
      <div>
        <i class="st-icon-wrong"></i>Wrong
      </div>
      <div>
        <i class="st-icon-error"></i>Error
      </div>
      <div>
        <i class="st-icon-right"></i>Right
      </div>
      <div>
        <i class="st-icon-success"></i>Success
      </div>
    </section>
    <section class="demo__loading">
      <h1>Loading</h1>
      <h2>v-loading指令调用</h2>
      <div style="width: 2rem;" v-stloading="loadingFlag">
        <p>加载区加载区加载区加载区加载区加载区</p>
        <p>加载区加载区加载区加载区加载区加载区</p>
        <p>加载区加载区加载区加载区加载区加载区</p>
      </div>
      <st-button size="mini" @click="loadingFlag = !loadingFlag;">指令方式</st-button>
      <h2>自定义loading文案，spinner类名，背景颜色</h2>
      <div
        style="width: 2rem;"
        st-loading-text="对的"
        st-loading-spinner="st-icon-right"
        st-loading-background="rgba(255, 255, 255, 0.2)"
        v-stloading="true"
      >
        <p>加载区加载区加载区加载区加载区加载区</p>
        <p>加载区加载区加载区加载区加载区加载区</p>
        <p>加载区加载区加载区加载区加载区加载区</p>
      </div>
    </section>
    <section class="demo__message">
      <h1>Message</h1>
      <st-button @click="showMessage">正常的</st-button>
      <st-button @click="showErrorMessage">错误的</st-button>
      <st-button @click="showSuccessMessage">正确的</st-button>
      <st-button @click="showLoadingMessage">加载中</st-button>
      <st-button @click="showCbMessage">可回调</st-button>
      <st-button @click="showAlawaysMessage">一直在</st-button>
    </section>
    <section class="demo__clickoutside">
      <h1>Clickoutside</h1>
      <p v-clickoutside="clickOut" @click="clickIn">{{clickText}}</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingFlag: false,
      nowMessage: null,
      clickText: '初始'
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
    },
    clickOut() {
      this.clickText = '点到外面啦';
    },
    clickIn() {
      this.clickText = '点在里面';
    }
  }
};
</script>

<style lang="scss">
html {
  background-color: #555efb;
}
.demo {
  max-width: 10rem;
  padding: 0.1rem;
  margin: 0 auto;
  margin: 0 auto;
  font-size: 16px;
  background-color: #5131ef;
  section {
    margin-top: 20px;
    padding: 10px;
    border-bottom: 2px solid #4411c3;
    h1 {
      font-weight: 500;
      font-size: 30px;
      margin-bottom: 10px;
    }
  }
  &__button {
    div {
      margin: 10px 0;
    }
    button {
      margin-right: 10px;
    }
  }
  &__icon {
    div {
      color: #606266;
      font-size: 0.2rem;
    }
  }
  &__clickoutside {
    p {
      width: 100px;
      height: 50px;
      line-height: 50px;
      background: #fff;
      text-align: center;
    }
  }
}
</style>
