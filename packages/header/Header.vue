<template>
  <header class="st-header">
    <div class="st-header__left" @click="$emit('back')">
      <div class="st-header__back">
        <img src="./images/icon__arrow--left.png">
        <span>退出游戏</span>
      </div>
    </div>
    <div class="st-header__right">
      <div class="st-header__money">
        <img src="./images/icon__money.png">
        <span>100</span>
      </div>
      <div class="st-header__guide" @click="guide">
        <img src="./images/icon__guide.png">
        <span>游戏指南</span>
      </div>
      <div class="st-header__earn" @click="earn">
        <img src="./images/icon__money.png">
        <span>赚金币</span>
      </div>
      <div class="st-header__prop" @click="prop">
        <img src="./images/icon__shop.png">
        <span>道具箱</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'StHeader',
  componentName: 'StHeader',
  methods: {
    prop() {
      this.$emit('prop');
    },
    guide() {
      this.$emit('guide');
    },
    earn() {
      this.$emit('earn');
    }
  }
};
</script>

<style lang="scss" scoped>
@import './style/index';
</style>
