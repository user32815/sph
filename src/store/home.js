/*
 * @Author: scl
 * @Date: 2022-11-19 13:43:16
 * @LastEditTime: 2022-12-03 23:22:43
 * @Description: file content
 */
// home模块小仓库
import { reqCategoryList,reqBannerList,reqFloorList } from "@/api";

//state:仓库存储数据的地方
const state ={
    //state中数据默认初始值不确定，根据接口返回值初始化，可能是数组、对象等
    categoryList:[],
    bannerList:[],
    floorList:[],
};

//mutations:修改state的唯一手段
const mutations={
    CATEGORYLIST(state,data){
        state.categoryList=data
    },
    GETBANNERLIST(state,data){
        state.bannerList=data
    },
    GETFLOORLIST(state,data){
        state.floorList=data
    }
};

//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions={
    //通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
    async categoryList(context){
        let result=await reqCategoryList();
        // console.log(result)
        if(result.code==200){
            context.commit('CATEGORYLIST',result.data);
        }
    },
    async getBannerList(context){
        let result=await reqBannerList();
        // console.log(result)
        if(result.code==200){
            context.commit('GETBANNERLIST',result.data);
        }
    },
    async getFloorList(context){
        let result=await reqFloorList();
        // console.log(result)
        if(result.code==200){
            context.commit('GETFLOORLIST',result.data);
        }
    }
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters={};

export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
}