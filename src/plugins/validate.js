/*
 * @Author: scl
 * @Date: 2023-03-02 16:57:20
 * @LastEditTime: 2023-03-02 19:01:49
 * @Description: file content
 */
//vee-validate表单验证
import Vue from 'vue'
import VeeValidate from 'vee-validate'

//中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)

//表单验证
VeeValidate.Validator.localize('zh_CN', {
    messages: {
      ...zh_CN.messages,
      is: (field) => `${field}必须与密码相同` //修改内置规则的 message ,让确认密码和密码相同
    },
    attributes: {
      phone: '手机号',
      code: '验证码',
      password: '密码',
      rePwd: '确认密码',
      agree: '协议'
    }
  })
  //自定义校验规则
  VeeValidate.Validator.extend('agree', {
    validate: (value) => {
      return value
    },
    getMessage: (field) => field + '必须同意'
  })