<template>
  <div class="demo">
    <section class="demo__button">
      <h1>Button</h1>
      <div>
        <h2>不同按钮</h2>
        <st-button >默认按钮</st-button>
        <st-button type="primary">主要按钮</st-button>
      </div>
      <div>
        <h2>不同大小</h2>
        <div>
          <st-button >默认大小</st-button>
          <st-button size="medium">中等按钮</st-button>
          <st-button size="small">小型按钮</st-button>
          <st-button size="mini">超小按钮</st-button>
        </div>
        <div>
          <st-button type="primary" >默认大小</st-button>
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
      <div><i class="st-icon-loading"></i> Loading</div>
      <div><i class="st-icon-wrong"></i> Wrong</div>
      <div><i class="st-icon-error"></i> Error</div>
      <div><i class="st-icon-right"></i> Right</div>
      <div><i class="st-icon-success"></i> Success</div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  width: 800px;
  margin: 0 auto;
  margin: 0 auto;
  font-size: 16px;
  section {
    margin-top: 20px;
    padding: 10px;
    border-bottom: 2px solid grey;
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
      font-size: .2rem;
    }
  }
}
</style>
