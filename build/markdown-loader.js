const MarkdownIt = require('markdown-it');
const MarkdownItContainer = require('markdown-it-container');
const VueTemplateComplier = require('vue-template-compiler');
const hljs = require('highlight.js');
const { parse, compileTemplate } = require('@vue/component-compiler-utils');
// const cheerio = require('cheerio');

// function fetch (str, tag) {
//   var $ = cheerio.load(str, { decodeEntities: false });
//   if (!tag) return str;
//   return $(tag).html();
// }

module.exports = function(source) {
  // 需要解析成vue代码块集合
  const componentCodeList = [];
  let styleCodeList = [];
  const markdownIt = MarkdownIt({
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
  markdownIt.use(MarkdownItContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, index) {
      const token = tokens[index];
      const tokenInfo = token.info.trim().match(/^demo\s*(.*)$/);
      if (token.nesting === 1) {
        const desc = tokenInfo && tokenInfo.length > 1 ? tokenInfo[1] : '';
        const nextIndex = tokens[index + 1];
        const content = nextIndex.type === 'fence' ? nextIndex.content : '';
        // let codepen = {
        //   html: fetch(content, 'template'),
        //   js: fetch(content, 'script'),
        //   css: fetch(content, 'style')
        // };
        // codepen = markdownIt.utils.escapeHtml(JSON.stringify(codepen));
        let { template, script, styles } = parse({
          source: content,
          compiler: VueTemplateComplier,
          needMap: false
        });
        styleCodeList = styleCodeList.concat(styles);
        const { code } = compileTemplate({
          source: template.content,
          compiler: VueTemplateComplier
        });
        script = script ? script.content : '';
        if (script) {
          script = script.replace(
            /export\s+default/,
            'const exportJavaScript ='
          );
        } else {
          script = 'const exportJavaScript = {} ;';
        }
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
        return `<code-block>
                  <div slot="desc">${markdownIt.render(desc)}</div>
                  <${name} slot="demo" />
                  <div slot="code">`;
      }
      return `    </div>
                </code-block> `;
    }
  });
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
