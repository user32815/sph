<!--
 * @Author: scl
 * @Date: 2022-11-10 13:48:59
 * @LastEditTime: 2023-03-01 21:53:37
 * @Description: file content
-->
<template>
  <div>
    <Header/>
    <router-view></router-view>
    <!-- 在home,search显示,login,register隐藏 -->
    <Footer v-show="$route.meta.show"/>
    <!-- <router-link to="/home">home</router-link>
    <router-view></router-view> -->
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    this.$store.dispatch('home/categoryList')
  }
}
</script>

<style>
</style>
