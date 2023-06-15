/*
 * @Author: scl
 * @Date: 2022-11-10 13:48:59
 * @LastEditTime: 2023-03-02 16:42:24
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字 第二个参数：那一个组件
Vue.component("TypeNav",TypeNav)
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

//引入路由
import router from '@/router'

/* import {reqCategoryList} from '@/api'
reqCategoryList(); */

import store from '@/store'
// 引入mockServe.js----mock数据
import '@/mock/mockServe';
//引入swiper样式
import 'swiper/css/swiper.css'
import {reqGetSearchInfo} from '@/api'
console.log(reqGetSearchInfo({}))
Vue.config.productionTip = false
//统一接口api文件夹里全部请求函数
import * as API from '@/api'
Vue.config.productionTip = false
//引入elementUI
import { MessageBox, Button } from 'element-ui';
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import atm from '@/assets/utman.gif'
import VueLazyload from 'vue-lazyload'
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading: atm,
})

//引入表单检测插件
import "@/plugins/validate"
new Vue({
  render: h => h(App),
  //全局路由总线 
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  },
  //注册路由
  router,
  //注册仓库：组件实例的身上会多出一个$store属性
  store,
}).$mount('#app')
