# 参与开发

## 新建组件
- `npm run new 组件名 [组件中文名]` 中文名选填

```shell
npm run new button 按钮
npm run serve
```

## 单元测试
```shell
npm run test
```

## 发布
⚠️发布完了之后记得把代码合并到主仓库
```shell
npm run test
npm version patch
npm run lib
git add .
git commit --amend
npm publish
```


