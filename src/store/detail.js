/*
 * @Author: scl
 * @Date: 2023-02-21 15:19:24
 * @LastEditTime: 2023-02-24 21:48:48
 * @Description: file content
 */
import { reqGoodsInfo, reqAddOrUpdateShopcart } from "@/api"
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID(),
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopcart({ commit }, { skuId, skuNum }) {
        /*加入购物车后返回的解构
    加入购物车后（发请求），前台将参数带给服务器
    服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作不成功
    因为服务器没有返回其余数据，不需要三连环存储 */
        let result = await reqAddOrUpdateShopcart(skuId, skuNum);
        // console.log(result);
        if (result.code = 200) {
            // 返回成功的标记
            return "ok"
        } else {
            //返回失败的标记
            return Promise.reject(new Error('failed'))
        }
    }
}
const getters = {
    //路径导航煎卷
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    //简化产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖信息
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || {}
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}