<template>
  <section class="codeblock">
    <div class="codeblock-demo"><slot name="demo"></slot></div>
    <div class="codeblock-code-title">
      <span>示例代码👇</span>
      <span class="icon-code-platform-codepen" @click="goCodepen">在线运行</span>
    </div>
    <!-- <div class="codeblock-desc"><slot name="desc"></slot></div> -->
    <div :class="['codeblock-code', showCodeMaskFlag && 'codeblock-code--half']" ref="code">
      <div v-show="showCodeMaskFlag" class="codeblock-code__mask" @click="showCodeMaskFlag = false">
        点击加载全部
        <img :src="down">
      </div>
      <slot name="code"></slot>
    </div>
  </section>
</template>

<script>
import SteamUI from 'packages/index.js';

export default {
  name: 'CodeBlock',
  props: {
    codepen: {}
  },
  data() {
    return {
      down: require('./../assets/img/down.png'),
      showCodeMaskFlag: false
    };
  },
  mounted () {
    let range = document.createRange();
    let codeChild = this.$refs.code;
    range.setStart(codeChild, 0);
    range.setEnd(codeChild, codeChild.childNodes.length);
    const rangeHeight = range.getBoundingClientRect().height;
    this.showCodeMaskFlag = rangeHeight > 300;
  },
  methods: {
    goCodepen() {
      // https://blog.codepen.io/documentation/api/prefill
      const { js, html, css } = this.codepen;
      const resourcesTpl =
        '<scr' +
        'ipt src="//unpkg.com/vue/dist/vue.js"></scr' +
        'ipt>' +
        '\n<scr' +
        `ipt src="//unpkg.com/steam-game-ui@${SteamUI.version}/lib/steam-game-ui.umd.min.js"></scr` +
        'ipt>';
      let jsTpl = (js || '').replace(/export default/, 'var Main =').trim();
      let htmlTpl = `${resourcesTpl}\n<div id="app">\n${html.trim()}\n</div>`;
      jsTpl = jsTpl
        ? jsTpl + "\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount('#app')"
        : "new Vue().$mount('#app')";
      let cssTpl = `html { font-size: 100px; } #app{ font-size: 14px; }\n${css ||
        ''}`;
      const data = { js: jsTpl, css: cssTpl, html: htmlTpl };
      const form =
        document.getElementById('fiddle-form') ||
        document.createElement('form');
      while (form.firstChild) {
        form.removeChild(form.firstChild);
      }
      form.method = 'POST';
      form.action = 'https://codepen.io/pen/define/';
      form.target = '_blank';
      form.style.display = 'none';

      const input = document.createElement('input');
      input.setAttribute('name', 'data');
      input.setAttribute('type', 'hidden');
      input.setAttribute('value', JSON.stringify(data));

      form.appendChild(input);
      document.body.appendChild(form);

      form.submit();
    }
  },
  components: {}
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.codeblock-code-title {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.codeblock-code {
  position: relative;
  border-radius: 10px;
  overflow-y: hidden;
  max-height: initial;
  &__mask {
    height: 30px;
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
    border: 1px dotted #000;
    border-top: 0;
    line-height: 30px;
    cursor: pointer;
    background: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    img {
      width: 12px;
      height: 12px;
      margin-left: 4px;
    }
  }
  &--half {
    max-height: 300px;
  }
}
.codeblock-demo {
  padding: 0.2rem;
  background-color: #5131ef;
  border-radius: 10px;
  overflow: hidden;
}
.icon-code-platform-codepen {
  padding-right: 22px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  background: url('./../assets/img/codepen.png') no-repeat right center/contain;
  background-size: 20px;
}
</style>
