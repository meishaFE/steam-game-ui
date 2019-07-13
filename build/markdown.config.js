const md = require('markdown-it')();
const cheerio = require('cheerio');

function wrap (render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code v-pre', '<code v-pre class="hljs" ')
      .replace('<code>', '<code class="hljs">');
  };
}

function fetch (str, tag) {
  var $ = cheerio.load(str, { decodeEntities: false });
  if (!tag) return str;
  return $(tag).html();
}

module.exports = config => {
  config.module
  .rule('md')
  .test(/\.md/)
  .use('vue-loader')
  .loader('vue-loader')
  .end()
  .use('vue-markdown-loader')
  .loader('vue-markdown-loader/lib/markdown-compiler')
  .options({
    raw: true,
    preventExtract: true,
    use: [
      [require('markdown-it-container'), 'demo', {
        validate: function(params) {
          return params.trim().match(/^demo\s*(.*)$/);
        },
        render: function(tokens, idx) {
          var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
            if (tokens[idx].nesting === 1) {
              let description = (m && m.length > 1) ? m[1] : '';
              let descriptionHTML = description ? md.render(description) : '';
              var content = tokens[idx + 1].content;
              let codepen = {
                html: fetch(content, 'template'),
                js: fetch(content, 'script'),
                css: fetch(content, 'style')
              };
              codepen = md.utils.escapeHtml(JSON.stringify(codepen));
              return `<code-block :codepen="${codepen}">
                        <div slot="desc">${descriptionHTML}</div>
                        <div slot="demo">${content}</div>
                        <div slot="code">`;
            } else {
              return '</div></code-block>\n';
            }
        }
      }]
    ],
    preprocess: function(MarkdownIt, source) {
      MarkdownIt.renderer.rules.table_open = function() {
        return '<table class="table">';
      };
      MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
      return source;
    }
  });
};
