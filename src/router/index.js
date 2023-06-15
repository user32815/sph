/*
 * @Author: scl
 * @Date: 2022-11-10 14:20:42
 * @LastEditTime: 2023-03-02 16:16:38
 * @Description: file content
 */
//配置路由
import Vue from 'vue'
import VueRouter from "vue-router"
import store from '@/store'
//使用插件
Vue.use(VueRouter)
//引入路由组件
import routes from './routes'

// 需要重写VueRouter.prototype原型对象身上的push|replace方法
// 先把VueRouter.prototype身上的push|replace方法进行保存一份
//#region 重写push|replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};
// 重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};
//#endregion

//对外暴露VueRouter类的实例
let router = new VueRouter({
  //配置路由
  //第一:路径的前面需要有/(不是二级路由)
  //路径中单词都是小写的
  //component右侧V别给我加单引号【字符串：组件是对象（VueComponent类的实例）】
  routes,
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    //返回的这个y=0，代表的滚动条在最上方
    return { y: 0 };
  },
});

//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
  //next放行函数 next() next(path)放行到指定位置 
  // nex(false): 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  //#region
  if (token) {
    if (!name) {
      try {
        let result = await store.dispatch("user/getUserInfo")
        // console.log(result)
      } catch (error) {
        // console.log(error.message)
        await store.dispatch('user/userLogout')
        next('/home')
      }
    } 
    if (to.path == '/login' || to.path == "/register") {
      next('/home')
    } else {
      next()
    }
    
    // next()
  } else {
    //未登录:不能去支付相关、交易相关【pay|paysuccess】、不能去个人中心
    let arr=['home','detail',"search","register","login"]
    // console.log(
    //   arr.indexOf(to.path.split('/')[1])!=-1
    // )
    // if (to.path == '/home' || to.path == '/detail/*'||to.path=='/search'||to.path=='register'||to.path=='/login') {
    if (arr.indexOf(to.path.split('/')[1])!=-1) {
      next()
    } else {
      next('/login?redirect='+to.path)
    }

  }
})
//#endregion
//#region
/*if(token){
  //用户已经登录不能去login页面
  if(to.path == '/login'){
      next('/home')
  }else{
      //登录去的是除login页面
      if(name){
          next();
      }else{
          //没有用户信息 派发action
          try {
              //获取用户信息成功
             await  store.dispatch('user/getUserInfo')
             next();
          } catch (error) {
              //token失效 重新登录
            await store.dispatch('user/userLogout')
              next('/login');
          }
        
      }
      
  }
}else{
  //未登录
  // next();
  let toPath = to.path;
  if(to.path == '/trade' || toPath.indexOf('/pay')!== -1 || toPath.indexOf('/center')!== -1){
      //把未登录时候想去没有去成的信息 存储在地址栏
      next('/login?redirect=' + toPath)
  }else{
      next();
  }
}
})*/
//#endregion
export default router;