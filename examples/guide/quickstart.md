# 快速上手

`steam-game-ui`是专门为梅沙steamGame系列项目设计的组件库，[官网链接](http://fex.meishakeji.com/steam-game-ui)

## 设置根字体
组件的大小单位为`rem`，引用前记得设置根字体大小👇
```js
(function() {
  function resize() {
    var html = document.documentElement;
    html.style.fontSize = 100 * Math.min(html.clientWidth, 1440) / 1440 + 'px';
  }
  window.addEventListener('resize', resize, false);
  resize();
})();
```
或者用css去设置
```css
@media screen and (min-width:960px) and (min-width:1440px){
  html{
    font-size: 96px;
  }
}
@media screen and (min-width:1440px){
  html{
    font-size: 144px;
  }
}

```

## 项目中引用
在main.js中写入一下内容👇
```js
import Vue from 'vue';
import SteamUI from 'steam-game-ui';
import App from './App.vue';

Vue.use(SteamUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```
⚠️不支持按需引入

⚠️样式已经打包进去，不用额外引用