<template>
  <div class="home">
    <st-header></st-header>
    <div>
      <st-button disabled>按钮</st-button>
      <st-button >按钮</st-button>
      <st-button size="medium">按钮</st-button>
      <st-button size="small">按钮</st-button>
      <st-button size="mini">按钮</st-button>
    </div>
    <div>
      <st-button type="primary" disabled>按钮</st-button>
      <st-button type="primary">按钮</st-button>
      <st-button type="primary" size="medium">按钮</st-button>
      <st-button type="primary" size="small">按钮</st-button>
      <st-button type="primary" size="mini">按钮</st-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  }
};
</script>
