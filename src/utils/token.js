/*
 * @Author: scl
 * @Date: 2023-02-28 22:16:53
 * @LastEditTime: 2023-02-28 23:05:58
 * @Description: file content
 */
//对外暴露一个函数
//存储token
export const setToken=(token)=>{
  localStorage.setItem('TOKEN',token);
}
// 获取token
export const getToken=()=>{
   return localStorage.getItem('TOKEN')
}
// 清楚本地存储的token
export const removeToken = ()=>{
  localStorage.removeItem("TOKEN")
}