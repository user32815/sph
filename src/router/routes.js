/*
 * @Author: scl
 * @Date: 2023-02-21 11:52:51
 * @LastEditTime: 2023-03-02 19:21:37
 * @Description: file content
 */
export default [{
    name: 'home',
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: { show: true }
},
{
    name: 'login',
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: { show: false }
},
{
    name: 'register',
    path: '/register',
    component: () => import('@/pages/Register'),
    meta: { show: false }
},
{
    name: 'search',
    path: '/search/:keyword?',
    component: () => import('@/pages/Search'),
    meta: { show: true }
},
{
    name: 'detail',
    path: '/detail/:skuId',
    component: () => import('@/pages/Detail'),
    meta: { show: true }
},
{
    name: 'addcart',
    path: '/addcartsuccess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: { show: true }
},
{
    name: 'shopcart',
    path: '/shopcart',
    component: () => import('@/pages/ShopCart'),
    meta: { show: true }
},
{
    name: 'trade',
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
        if(from.path=='/shopcart'){
            next()
        }else{
            next(false)
        }
    }
},
{
    name: 'pay',
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
        if(from.path=='/trade'){
            next()
        }else{
            next(false)
        }
    }
},
{
    name: 'paysuccess',
    path: '/paysuccess',
    component: ()=>import('@/pages/PaySuccess'),
    meta: { show: true }
},
{
    name: 'center',
    path: '/center',
    component: () => import('@/pages/Center'),
    meta: { show: true },
    children: [
        {
            name: 'group',
            path: 'grouporder',
            component: () => import('@/pages/Center/myOrder'),
        }, 
        {
            name: 'myorder',
            path: 'myorder',
            component: () => import('@/pages/Center/groupOrder'),
        },
        {
            path:'/center',
            redirect:'/center/myorder'
        }
    ]
},



//重定向,在项目运行的时候,访问/,立马让他定向到首页
{
    path: '*',
    redirect: '/home'
}
]