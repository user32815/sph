/*
 * @Author: scl
 * @Date: 2022-11-16 14:22:18
 * @LastEditTime: 2023-02-28 14:56:56
 * @Description: file content
 */
//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nProgress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'
//在当前模块引入store
import store from '@/store';
//1.利用axios对象方法create，创建一个axios实例
const Req = axios.create({
    //配置对象
    baseURL:'/api',//基础路径，发请求的时候，路径当中会出现api http://lacalhost:8080/api
    timeout:5000,//请求超时的时间为5s

});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出之前做一些事情

Req.interceptors.request.use((config)=>{
  //config：配置对象，里有一个很重要的属性header请求头
  if(store.state.detail.uuid_token){
    //请求头添加一个字段：和后台已经确认好头名
    config.headers.userTempId = store.state.detail.uuid_token
  }//需要token带给服务器
  if(store.state.user.token){
    config.headers.token = store.state.user.token
  }
  nProgress.start();
  return config
})

//响应拦截器
Req.interceptors.response.use((res)=>{
    //服务器成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，做一些相应的事情
    //   console.log(res.data);
    nProgress.done()
    return res.data
},
(error)=>{
    //响应失败回调函数
    // return Promise.reject(new error('fail'));//终止promise量
    console.log(error.data);
})


//对外暴露
export default Req