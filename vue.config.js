/*
 * @Author: scl
 * @Date: 2022-11-10 13:48:59
 * @LastEditTime: 2023-03-02 12:36:22
 * @Description: file content
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // target:'http://49.232.112.44'
        //  pathRewrite:{'^/api':''},
      }
    }
  }
})
