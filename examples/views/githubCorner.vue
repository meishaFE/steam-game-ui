<template>
  <a href="https://github.com/meishaFE/steam-game-ui" target="_bank">
    <span></span>
  </a>
</template>

<script>
export default {
  name: 'GithubCorner',
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
a {
  position: fixed;
  right: 0;
  top: 50px;
  span {
    width: 149px;
    height: 149px;
    display: inline-block;
    background: url('./../assets/img/corner.png') no-repeat center center/cover;
  }
}
</style>
