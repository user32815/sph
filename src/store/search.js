/*
 * @Author: scl
 * @Date: 2022-11-19 13:38:01
 * @LastEditTime: 2023-02-12 14:38:08
 * @Description: file content
 */

// serach模块小仓库
import {reqGetSearchInfo} from '@/api'                         
//state:仓库存储数据的地方
const state ={
    zxx:'scl',
    // 初始化仓库
    searchList:{},
};
//mutations:修改state的唯一手段
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
};
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions={
    //获取search模块数据
    async getSearchList({commit},params={}){ 
        //params形参，是当用户派发action的时候，第二额参数传递过来的，至少是一个对象
        let result =await reqGetSearchInfo(params)
        if(result.code ==200){
            commit('GETSEARCHLIST',result.data)
        }
    }
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
//简化仓库中的数据  
const getters={
    //state形参为当期那仓库的state
    goodsList(state){
        return state.searchList.goodsList||{};
    },
    trademarkList(state){
      return state.searchList.trademarkList||{};  
    },
    attrsList(state){
      return state.searchList.attrsList||{};  
    }
};

export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
} 