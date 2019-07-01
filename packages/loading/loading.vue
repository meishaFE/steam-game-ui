<template>
  <div
    v-show="visible"
    :class="['st-loading__mask', customClass]"
    :style="{
      backgroundColor: background || ''
    }"
    >
    <div class="st-loading__spinner">
      <i v-if="!spinner" class="st-icon-loading"></i>
      <i v-else :class="spinner"></i>
      <p v-if="text" class="st-loading__text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StLoading',
    data () {
      return {
        text: '',
        spinner: '',
        background: '',
        customClass: '',
        visible: true
      };
    },
    methods: {
      setText(str) {
        this.text = str;
      }
    },
    components: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss">
@import 'src/style/var';
@import 'src/style/mixins';
@include b(loading) {
  @include e(mask) {
    position: absolute;
    margin: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #5131EF, $alpha: .8);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fade .3s;
  }
  @include e(spinner) {
    color: mix(#fff, transparent, 70);
    text-align: center;
    user-select: none;
    font-size: .2rem;
  }
  @include e(text) {
    font-size: 12px;
  }
}
@include b('loading-parent') {
  @include m(relative) {
    position: relative !important;
  }
  @include m(hidden) {
    overflow: hidden !important;
  }
}
@keyframes fade {
  from{
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
