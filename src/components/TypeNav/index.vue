<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动+过度动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <!-- 利用事件委派+编程式导航实现路由的跳转与传递参数 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" :class="{ cur: currenIndex === index }"
                                v-for="(c1, index) in categoryList.slice(0, 16)" :key="c1.categoryId"
                                v-on:mouseenter="changeIndex(index)">
                                <h3>
                                    <a :data-categoryName="c1.categoryName"
                                        :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                                    <!-- <a @click="goSearch">{{c1.categoryName}}</a> -->
                                    <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                                </h3>
                                <!-- 二级，三级分类 -->
                                <div class="item-list clearfix" :style="{ display: currenIndex === index ? 'block' : 'none' }">
                                    <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                                <!-- <a @click="goSearch">{{c2.categoryName}}</a> -->
                                                <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                                            </dt>
                                            <dd>
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                    <!-- <a @click="goSearch">{{c3.categoryName}}</a> -->
                                                    <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
//引入方式：把lodash全部功能函数引入
import _ from 'lodash';
export default {
    name: 'TypeNav',
    data() {
        return {
            //存储用户鼠标位置
            currenIndex: -1,
            show: true,
        }
    },
    methods: {
        //ES6语法
        /*    changeIndex(index){
               this.currenIndex=index
               console.log(index);
           } */
        //ES5语法
        changeIndex: _.throttle(function (index) {
            this.currenIndex = index
            // console.log(index);
        }, 50),
        goSearch(event) {
            //路由跳转的最好解决方案：编程式导航+事件委派
            //存在一些问题：事件委派，是把全部的子节点【h3、dt。dl、em】的时间委派给父节点
            //点击a标签的时候，才会进行路由调转【怎么才能确定点击的一定是a标签】
            // 存在另外一个问题：既是你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签

            //第一个问题：把子节点当中a标签，加上自定义属性data-categoryName,其余的子节点无用
            //获取到当前触发这个事件的节点【h3、a、dt、dl】，需要带有data-categoryName这样的节点【一定是a标签】
            // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
            let { categoryname, category1id, category2id, category3id } = event.target.dataset
            console.log(event.target.dataset,'dateset');
            // this.$router.push('/search')
            //如果标签上有categoryname一定是a标签
            if (categoryname) {
                //整理路由跳转的参数
                let location = { name: 'search' };
                let query = { categoryName: categoryname };
                //一级分类、二级分类、三级分类的a标签
                if (category1id) {
                    query.category1Id = category1id;
                }
                else if (category2id) {
                    query.category2Id = category2id;
                }
                else {
                    query.category3Id = category3id;
                }
                //整理参数
            //判断：如果路由跳转的时候、带有params参数，捎带传递过去
            if(this.$route.params){
                location.params = this.$route.params
            }
                location.query = query
                console.log(location,'localtion');
                this.$router.push(location)
            }
        },
        enterShow() {
            this.show = true
        },
        leaveShow() {
            this.currenIndex = -1
            if (this.$route.path != '/home') {
                this.show = false
            }
        }
    },
    computed: {
        ...mapState('home', ['categoryList']),
    },
    //组件挂载完毕，可以向服务器发送请求
    mounted() {
        //通知Vuex发请求，获取数据，存储于仓库中
        // this.$store.dispatch('home/categoryList')
        if (this.$route.path != '/home') {
            this.show = false
        }
    }
}
</script>
  
<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        // display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    /*  &:hover {
                        .item-list {
                            display: block;
                        }
                    } */
                }

                .cur {
                    background-color: rgb(226, 226, 226);
                }
            }

            a {
                text-decoration: none;
            }
        }
        //过渡动画的样式
        //过渡动画开始状态（进入）
        .sort-enter{
            height: 0px;
            transform: rotate(0);
        }
        // 过渡动画结束状态（进入）
        .sort-enter-to{
            height: 461px;
        }
        // 定义动画时间、速率
        .sort-enter-active{
            transition: all 0.5s linear;
        }
    }
}
</style>