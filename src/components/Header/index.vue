<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="!userName">
                        <span>请</span>
                        <!-- 声明式导航:务必要有to属性 -->
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                        <!-- <a href="###" class="register">免费注册</a> -->
                    </p>
                    <p v-else>
                        <a>{{ userName }}</a>&nbsp;
                        <a class="register" @click="logout">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center">我的订单</router-link>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <router-link to="/home">我的尚品汇</router-link>
                    <router-link to="">尚品汇会员</router-link>
                    <router-link to="">企业采购</router-link>
                    <router-link to="">关注尚品汇</router-link>
                    <router-link to="">合作招商</router-link>
                    <router-link to="">商家后台</router-link>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link to="/home" class="logo" title="尚品汇">
                    <img src="./images/logo.png" alt="图片无法加载">
                </router-link>
                <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
            </a> -->
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" v-model="keyword" class="input-error input-xxlarge" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="GoSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderIndex',
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        GoSearch() {
            // 路由传递参数
            /* //搜索按钮的回调函数,需要想search路由进行跳转 第一种:字符串形式
            this.$router.push('/search/'+this.keyword+"?keyword="+this.keyword.toUpperCase()) */
            // //第二种:模板字符串
            // this.$router.push(`/search/${this.keyword}?keyword={this.keyword.toUpperCase()}`)
            /* //第三种:对象
            this.$router.push({name:'search',params:{keyword:this.keyword},query:{keyword:this.keyword.toUpperCase()}}) */
            //代表如果有有query参数也携带过去 
            let location = { name: 'search', params: { keyword: this.keyword || undefined }/* ,query:{keyword:this.keyword.toUpperCase()} */ }
            location.query = this.$route.query
            this.$router.push(location)
            /*路由传参相关面试题
            1)路由传递参数(对象写法)paht是否可以结合params参数一起使用?
            答: 路由跳转传参的时候,对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用
            this.$router.push({path:'/search',params:{keyword:this.keyword},query:{keyword:this.keyword.toUpperCase()}})
            
            2)如何指定params参数可传不可传?
            如果路由要求传递params参数，但是不传递params参数，URL就会出问题
            如何指定params参数可以传递、或者不传递，在配置路由的时候，在占位的后面加上一个问号
            this.$router.push({name:'search',query:{keyword:this.keyword.toUpperCase()}})
            
            3)params参数可以传递也可以不传递,但是如果传递的是空串,如何解决?
            使用undefined解决：params参数可以传递、不传递（空的字符串）
            this.$router.push({name:'search',params:{keyword:''||undefined},query:{keyword:this.keyword.toUpperCase()}})

            4)路由组件能不能传递props数据?
            能，有三种写法：布尔值写法、对象写法、函数写法
            */
        },
        logout() {
            //退出登录需要做的事
            // 1：需要发请求，通知服务器退出登录【清楚一些数据：token】
            // 2.清楚项目中的数据【userInfo，token，】
            try {
                this.$store.dispatch('user/userLogout')
                this.$router.push('/home')
            } catch (error) {
                console.log(error.message);
            }

        }
    },
    computed: {
        userName() {
            return this.$store.state.user.userInfo.name
        }
    },
    mounted() {
        this.$bus.$on('clear', () => {
            this.keyword = ''
        })
    },
}
</script>

<style lang="less" scoped>
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>