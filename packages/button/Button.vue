<template>
  <button
    class="st-button"
    @click="handleClick"
    :disabled="disabled || loading"
    :class="[
      type ? `st-button--${type}` : 'st-button--default',
      size ? `st-button--${size}` : 'st-button--large',
      {
        'is-disabled': disabled,
        'is-loading': loading
      },
      `st-button__shadow--${type}-${size}`
    ]"
  >
    <i class="st-icon-loading" v-if="loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: 'StButton',
  props: {
    disabled: Boolean,
    loading: Boolean,
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'large'
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import 'src/style/var';
@import 'src/style/mixins';

@include b(button) {
  box-sizing: border-box;
  background-color: $--button-fill;
  color: $--button-color;
  border-radius: $--button-border-radius;
  border: $--button-border;
  overflow: hidden;
  line-height: 1;
  vertical-align: middle;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  & [class*="st-icon-"] {
    position: absolute;
    margin-left: -0.25rem;
  }

  @include m(primary) {
    background-color: $--button-primary-fill;
    color: $--button-primary-color;
  }

  @include m(large) {
    min-height: $--button-height;
    padding: 0 $--button-padding-horizontal;
    font-size: $--button-font-size;
  }

  @include m(medium) {
    min-height: $--button-medium-height;
    padding: 0 $--button-medium-padding-horizontal;
    font-size: $--button-medium-font-size;
  }

  @include m(small) {
    min-height: $--button-small-height;
    padding: 0 $--button-small-padding-horizontal;
    font-size: $--button-small-font-size;
  }

  @include m(mini) {
    min-height: $--button-mini-height;
    padding: 0 $--button-mini-padding-horizontal;
    font-size: $--button-mini-font-size;
  }

  @include e(shadow) {
    &--default {
      &-large {
        box-shadow: inset -4px -4px 0 0 rgba(224,141,32,0.50), inset 4px 4px 0 0 rgba(255,255,255,0.60);
      }
      &-medium {
        box-shadow: inset -3px -3px 0 0 rgba(224,141,32,0.50), inset 3px 3px 0 0 rgba(255,255,255,0.60);
      }
      &-small {
        box-shadow: inset -2px -2px 0 0 rgba(224,141,32,0.50), inset 2px 2px 0 0 rgba(255,255,255,0.60);
      }
      &-mini {
        box-shadow: inset -1px -1px 0 0 rgba(224,141,32,0.50), inset 1px 1px 0 0 rgba(255,255,255,0.60);
      }
    }
    &--primary {
      &-large {
        box-shadow: inset -4px -4px 0 0 rgba(36, 0, 127, 0.6), inset 4px 4px 0 0 rgba(118, 68, 243, 0.6);
      }
      &-medium {
        box-shadow: inset -3px -3px 0 0 rgba(36, 0, 127, 0.6), inset 3px 3px 0 0 rgba(118, 68, 243, 0.6);
      }
      &-small {
        box-shadow: inset -2px -2px 0 0 rgba(36, 0, 127, 0.6), inset 2px 2px 0 0 rgba(118, 68, 243, 0.6);
      }
      &-mini {
        box-shadow: inset -1px -1px 0 0 rgba(36, 0, 127, 0.6), inset 1px 1px 0 0 rgba(118, 68, 243, 0.6);
      }
    }
  }

  @include when(disabled) {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @include when(loading) {
    cursor: progress;
    opacity: 0.6;
    position: relative;
  }
}
</style>
