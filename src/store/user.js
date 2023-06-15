/*
 * @Author: scl
 * @Date: 2023-02-27 14:05:54
 * @LastEditTime: 2023-03-02 16:18:53
 * @Description: file content
 */
import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from "@/api";
import { setToken,getToken, removeToken} from '@/utils/token'
const state = {
    codeNum:'',
    token:getToken(),
    userInfo:{}
};
const mutations = {
    GETCODE(state,code){
        state.codeNum=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    //清除相关用户信息
    CLEAR(state){
        state.token=''
        state.userInfo={}
        removeToken()
    }
};
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //获取验证码的这个接口：把验证码返回，但是正常情况，后天把验证码发送到用户手机上【省钱】
        let result = await reqGetCode(phone);
        // console.log(result);
        if(result.code==200){
            commit('GETCODE',result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({commit},user){
        let result =await reqUserRegister(user)
        console.log(result)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录
    async userLogin({commit},data){
        let result =await reqUserLogin(data);
        console.log(result);
        //服务器下发的token，用户的唯一标识
        // 将来经常通过带token找服务器要用户信息进行展示
        if(result.code==200){
            //用户已经登录成功且获取到token
            console.log('登录成功')
            commit("USERLOGIN",result.data.token)
            setToken(result.data.token);
             return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
        
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result=await reqUserInfo();  
        // console.log(result)
        if(result.code==200){
            commit("GETUSERINFO",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }

    },
    //用户退出登录
    async userLogout({commit}){
        //通知服务器清楚token
        let result = await reqLogout();
        if(result.code==200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    
    }
    
};
const getters = {

};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}