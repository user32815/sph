/*
 * @Author: scl
 * @Date: 2023-02-22 15:27:04
 * @LastEditTime: 2023-03-02 13:31:30
 * @Description: file content
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
