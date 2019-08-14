<template>
  <section class="home">
    <corner></corner>
    <header class="home__header" @click="$router.push({ name: 'home' })">
      <b>Steam-game-ui 游戏组件库</b>
      <p style="opacity: 0.1;font-size: 12px;">设计请假了</p>
    </header>
    <div class="home__container">
      <div class="home__container-left">
        <div class="home__routebtn" v-for="(nav, idx) in navs" :key="idx">
          <router-link :to="nav.path">{{nav.name}}</router-link>
        </div>
      </div>
      <div class="home__container-right" :class="$route.name == 'home' && 'no-design'">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Corner from './githubCorner';
import Navs from './../nav.config.json';
export default {
  name: 'Home',
  data() {
    return {
      navs: []
    };
  },
  created () {
    this.extractNav();
  },
  methods: {
    extractNav() {
      Object.keys(Navs).forEach(key => {
        Navs[key].children.forEach(nav => {
          if (nav.name && nav.path && nav.docsPath) {
            this.navs.push(nav);
          }
        });
      });
    }
  },
  components: {
    Corner
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.home {
  width: 100vw;
  height: 100vh;
  font-size: 16px;
  box-sizing: border-box;
  &__header {
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
    border-bottom: 2px #000 solid;
    text-indent: 2em;
    user-select: none;
    b {
      cursor: pointer;
    }
  }
  &__container {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
  }
  &__container-left {
    width: 300px;
    height: 100%;
    border-right: 1px gray dotted;
  }
  &__routebtn {
    cursor: pointer;
    padding: 10px;
    text-align: center;
    text-decoration: underline;
    &:hover {
      font-weight: bold;
      animation: shake 0.3s ease;
    }
    a {
      color: #000;
    }
  }
  &__container-right {
    height: 100%;
    width: 100%;
    padding: 0.2rem 1rem;
    overflow: auto;
    font-size: 18px;
    & > div {
      max-width: 1000px;
      margin: 0 auto;
    }
    p {
      margin: 20px 0;
    }
    h1 {
      margin-bottom: 10px;
      font-size: 30px;
      font-weight: bold;
      text-indent: 5px;
    }
    h2 {
      margin: 70px 0 20px 0;
      font-weight: bold;
      text-indent: 5px;
      border-left: 4px solid #000;
      border-bottom: 1px dotted #000;
    }
    table {
      th,
      td {
        padding: 20px;
        border-bottom: 1px solid #dcdfe6;
      }
      td {
        color: gray;
      }
    }
  }
}
@keyframes shake {
  0% {
    transform: translateX(10px) rotate(10deg);
  }
  20% {
    transform: translateX(-7px) rotate(-7deg);
  }
  40% {
    transform: translateX(5px) rotate(6deg);
  }
  60% {
    transform: translateX(-3px) rotate(-3deg);
  }
  80% {
    transform: translateX(6px) rotate(5deg);
  }
  100% {
    transform: translateX(0) rotate(0);
  }
}
.no-design {
  background: url('./../assets/img/bg.png') no-repeat center center;
}
</style>
