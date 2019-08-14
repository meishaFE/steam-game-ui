'use strict';

console.log();
process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('[组件名]必填');
  process.exit(1);
}

const path = require('path');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentname = process.argv[2];
const chineseName = process.argv[3] || componentname;
const ComponentName = uppercamelcase(componentname);
const PackagePath = path.resolve(__dirname, './../packages', componentname);
const Files = [
  {
    filename: path.join(`${ComponentName}.vue`),
    content: `<template>
  <div class="st-${componentname}">新组件</div>
</template>

<script>
export default {
  name: 'St${ComponentName}'
};
</script>`
  },
  {
    filename: path.join('index.js'),
    content: `import ${ComponentName} from './${ComponentName}';

${ComponentName}.install = function(Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName});
};

export default ${ComponentName};`
},
  {
    filename: path.join(`docs`, `index.md`),
    content: `# ${ComponentName} ${chineseName}`
  },
  {
    filename: path.join(`./../../tests/specs`, `${componentname}.spec.js`),
    content: `import { shallowMount } from '@vue/test-utils';
import ${ComponentName} from 'packages/${componentname}/${ComponentName}.vue';

describe('${ComponentName}', () => {
  it('default', () => {
    const wrapper = shallowMount(Hahaha);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
`
  }
];

// 创建 package
Files.forEach(file => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
});

// 添加到 components.json
const componentsFile = require('./../components.json');
if (componentsFile[componentname]) {
  console.error(`${componentname} 已存在.`);
  process.exit(1);
}
componentsFile[componentname] = `packages/${componentname}/index.js`;
fileSave(path.join(__dirname, './../components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n');

// 添加到 nav.config.json
const navConfigFile = require('./../examples/nav.config.json');
navConfigFile['components'].children.push({
  name: componentname !== chineseName ? `${ComponentName} ${chineseName}` : ComponentName,
  path: `/${componentname}`,
  docsPath: `packages/${componentname}/docs/index.md`
});

fileSave(path.join(__dirname, './../examples/nav.config.json'))
  .write(JSON.stringify(navConfigFile, null, '  '), 'utf8')
  .end('\n');

console.log('DONE!');
