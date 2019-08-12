/*
 * @Description: markdown to Vue
 * @Author: Aaron
 * @Date: 2019-08-10 23:45:55
 * @LastEditTime: 2019-08-12 22:52:04
 */

const md = require('markdown-it');
const MarkdownItContainer = require('markdown-it-container');
const VueTemplateComplier = require('vue-template-compiler');
const hljs = require('highlight.js');
const { parse, compileTemplate } = require('@vue/component-compiler-utils');

module.exports = function(source) {
  // 需要解析成vue代码块集合
  const componentCodeList = [];
  let styleCodeList = [];
  const markdownIt = md({
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return `<pre class="hljs"><code>${
          hljs.highlight(lang, str, true).value
        }</code></pre>`;
      }
      return `<pre class="hljs"><code>${markdownIt.utils.escapeHtml(
        str
      )}</code></pre>`;
    }
  });
  // 使用【markdown-it-container】插件解析【:::demo :::】代码块为vue渲染
  markdownIt.use(MarkdownItContainer, 'demo', {
    // 验证代码块为【:::demo :::】才进行渲染
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    // 代码块渲染
    render(tokens, index) {
      const token = tokens[index];
      const tokenInfo = token.info.trim().match(/^demo\s*(.*)$/);
      if (token.nesting === 1) {
        // 获取demo的第一行代码描述，即::: demo xxx 中的xxx
        const desc = tokenInfo && tokenInfo.length > 1 ? tokenInfo[1] : '';

        // 获取demo中需要渲染的内容
        const nextIndex = tokens[index + 1];
        const content = nextIndex.type === 'fence' ? nextIndex.content : '';

        // 将content解析为vue组件基本属性对象
        let { template, script, styles } = parse({
          source: content,
          compiler: VueTemplateComplier,
          needMap: false
        });

        // 将content的内容分别提炼出来并转码，给codepen作为提交表单使用
        let rawCodepen = {
          html: (template && template.content || '').replace(/^(\/|\n)*/g, ''),
          js: (script && script.content || '').replace(/^(\/|\n)*/g, ''),
          css: (styles && styles.content || '').replace(/^(\/|\n)*/g, '')
        };
        let codepen = markdownIt.utils.escapeHtml(JSON.stringify(rawCodepen));

        // 将template转为render函数
        const { code } = compileTemplate({
          source: template.content,
          compiler: VueTemplateComplier
        });

        styleCodeList = styleCodeList.concat(styles);

        // 获取script的代码
        script = script ? script.content : '';
        if (script) {
          script = script.replace(
            /export\s+default/,
            'const exportJavaScript ='
          );
        } else {
          script = 'const exportJavaScript = {} ;';
        }

        // 将代码解析成vue组件存储，然后在渲染html中引用该组件
        const name = `st-demo-${componentCodeList.length}`;
        componentCodeList.push(`"${name}":(function () {
          ${code}
          ${script}
           return {
             ...exportJavaScript,
             render,
             staticRenderFns
          }
        })()`);

        // 将需要渲染的示例用code-block组件包裹替换插槽显示示例效果
        return `<code-block :codepen="${codepen}">
                  <div slot="desc">${markdownIt.render(desc)}</div>
                  <template slot="demo"><${name} /></template>
                  <div slot="code">`;
      }
                  return `    </div>
                </code-block> `;
    }
  });

  markdownIt.renderer.rules.table_open = function() {
    return '<table class="st-doc__table">';
  };

  function genInlineLabel (render) {
    return function() {
      return render.apply(this, arguments)
        .replace('{{', '{ { ')
        .replace('}}', ' } }');
    };
  }
  markdownIt.renderer.rules.fence = genInlineLabel(markdownIt.renderer.rules.fence);

  return `
        <template>
          <div class="st-doc">
            ${markdownIt.render(source)}
          </div>
        </template>
        <script>
           export default {
           name: 'st-doc',
           components: {
            ${componentCodeList.join(',')}
           }
         }
       </script>
       <style>
         ${Array.from(styleCodeList, m => m.content).join('\n')}
       </style>`;
};
