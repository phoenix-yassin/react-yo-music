# react-yo-player
music player build with React.


### overview
* 慕课网的例子
* 实现了随机播放、全部不循环播放等功能

### 如何运行

**开发启动**
```shell
npm start
```

**编译产品**
```shell
npm run build
```

**运行各阶段例子**

修改`webpack.config.js`中`entry`

比如`Router`例子
```javascript
entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, 'app/router/index.js')
],
```