<template>
  <i :class="'st-icon-' + name" :style="styles"></i>
</template>

<script>
export default {
  name: 'StIcon',
  props: {
    name: String,
    size: [Number, String],
    color: String
  },
  computed: {
    styles() {
      let style = {};
      if (this.size) {
        style['font-size'] = `${this.size}rem`;
      }
      if (this.color) {
        style.color = this.color;
      }
      return style;
    }
  }
};
</script>
