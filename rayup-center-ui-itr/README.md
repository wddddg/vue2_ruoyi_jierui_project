## 开发

```bash
# 克隆项目
git clone https://gitee.com/y_project/RuoYi-Vue

# 进入项目目录
cd ruoyi-ui

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 http://localhost:80

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

##Vue 项目推荐命名规范
1、*.js文件
属于类的.js文件，除index.js外，使用PascalBase风格
其它类型的.js文件，使用kebab-case风格
属于api的，统一加上api后缀

2、*.vue文件
除index.vue之外，其它.vue文件统一用PascalBase风格

3、*scss/*.css/*文件
统一使用kebab-case命名风格

4、vue，js的变量、方法用驼峰命名方式，如：onSelectChange(currentData)

5、所有文件夹用kebab-case风格
