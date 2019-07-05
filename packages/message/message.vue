<template>
  <div class="st-message">
    <p class="st-message__text">
      <i :class="`st-icon-${icon}`" v-if="icon"></i>
      <i :class="typeClass" v-else></i>
      <slot>{{ content }}</slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      icon: '',
      content: '',
      duration: 3000,
      cb: null,
      type: ''
    };
  },
  computed: {
    typeClass() {
      return this.type && !this.icon ? `st-icon-${this.type} }` : '';
    }
  },
  mounted() {
    if (+this.duration > 0) {
      setTimeout(() => {
        this.close();
      }, this.duration);
    }
  },
  methods: {
    close() {
      this.$el.parentNode.removeChild(this.$el);
      if (this.cb) this.cb();
      this.$destroy(true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'src/style/var';
@import 'src/style/mixins';
@include b(message) {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: transparent;
  color: #fff;
  user-select: none;
  i {
    font-size: 20px;
    margin-right: 10px;
    &.st-icon-success {
      color: #73cc1e;
    }
    &.st-icon-error {
      color: #f74e4f;
    }
    &.st-icon-loading {
      color: #fea94f;
    }
  }
  @include e(text) {
    display: flex;
    align-items: center;
    padding: 14px 50px;
    font-size: 16px;
    background: rgba(45, 0, 118, 0.9);
    box-shadow: inset 3px 3px 0 0 rgba(255, 255, 255, 0.2),
      inset -3px -3px 0 0 rgba(25, 0, 65, 0.2);
    border-radius: 6px;
  }
}
</style>
