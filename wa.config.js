// const path = require('path')

// 可以在此配置webpack文件
module.exports = () => {
  return {
    // output: path.resolve(__dirname, './build')
    devServer: {
      // history 模式下，刷新 404
      historyApiFallback: true
    }
  }
}
