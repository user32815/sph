/*
 * @Author: scl
 * @Date: 2022-11-16 14:39:12
 * @LastEditTime: 2023-03-02 14:46:31
 * @Description: file content
 */
//当前这个模块：API进行同一管理
import request from './request';
import mockRequest from './mockAjax';
//三级联动的接口
///api/product/getBaseCategoryList get请求 无参数
export const reqCategoryList = ()=>{
  //发请求:axios发请求返回结果是promise对象
  return request({url:'/product/getBaseCategoryList',method:'get'});
}
// 获取banner（home首页轮播图接口）
export const reqBannerList=()=>mockRequest.get('/banner')
//获取floor数据
export const reqFloorList = ()=>{
  return mockRequest.get('/floor')
}
//获取搜索模块数据 地址：/api/list 请求方式：/post 需带参数
/* {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
} */ 
//需要接受外部传递参数
export const reqGetSearchInfo = (params)=>request({url:'/list',method:"post",data:params})

// 获取产品详情信息的接口 url:/api/item/{ skuId } get请求
export const reqGoodsInfo = (skuId)=>request({url:`/item/${skuId}`,method:'get'})

// 将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopcart = (skuId,skuNum)=>request({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})

//向服务器发请求获取购物车列表数据
export const reqCartList = function(){
  return request({url:'cart/cartList',method:'get'})
}

//删除购物车产品的接口
export const reqDeleteCartById = (skuId)=>request({url:`/cart/deleteCart/${skuId}`,method:'DELETE'})

//修改商品选中的状态
export const reqUpdateCheckedById = (skuId,isChecked) =>request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
export const reqGetCode = phone =>request({url:`user/passport/sendCode/${phone}`,method:'get'})

//用户注册
export const reqUserRegister = (data)=>request({url:'/user/passport/register',data,method:'post'})

//登录、
export const reqUserLogin =data =>request({url:'/user/passport/login',data,method:'post'})

//获取用户信息 需要带用户的token向服务器索要用户信息
export const reqUserInfo = ()=>request({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录
export const reqLogout = ()=>{
  return request({url:'/user/passport/logout',method:'get'})
}

//获取用户地址信息
export const reqAddressInfo = ()=> request({url:"/user/userAddress/auth/findUserAddressList",method:'get'}) ;
// export const reqAddressInfo=()=>mockRequest.get('/address')

//获取商品订单
export const reqOrderInfo = ()=> request({url:"/order/auth/trade",method:"get"}) ;


//提交订单的接口
/* export const reqSubmitOrder = (tradeNo,data)=>{
  return request({url:`/order/auth/submitOrder?trade=${tradeNo}`,data,method:"post"})
} */
export const reqSubmitOrder = (tradeNo, data) => request({url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,method: 'POST',data})

//获取支付信息
export const reqPayInfo = (orderId)=> request({url:`/payment/weixin/createNative/${orderId}`,method:'get'}) ;

//支付是否成功
export const reqPayStatus = (orderId)=>request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//我的订单信息
export const reqMyOrderList = (page,limit)=>request({url:`/order/auth/${page}/${limit}`,method:'get'})  ;