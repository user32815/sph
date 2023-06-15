/*
 * @Author: scl
 * @Date: 2022-11-18 15:08:38
 * @LastEditTime: 2023-02-27 14:21:48
 * @Description: file content
 */
import Vue from "vue";
import Vuex from 'vuex';
 //使用插件
Vue.use(Vuex)
/*//state:仓库存储数据的地方
const state ={};
//mutations:修改state的唯一手段
const mutations={};
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions={};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters={};
 */
//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from "./shopcart";
import user from "./user"
import trade from "./trade"

//对外暴露store实例
export default new Vuex.Store({
   //实现Vuex仓库模块式开发存储数据
   modules:{
    search,
    home,
    detail,
    shopcart,
    user,
    trade,
   }
})