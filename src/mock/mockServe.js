/*
 * @Author: scl
 * @Date: 2022-11-27 00:48:55
 * @LastEditTime: 2023-03-01 17:11:09
 * @Description: file content
 */
//引入mockjs模块
import Mock from "mockjs";
//把JSON数据格式引入
// webpack默认对外暴露：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'
import address from './address.json'

// mock数据:第一个参数：请求地址 第二个数据：请求对象
Mock.mock('/mock/banner',{code:200,data:banner});//首页大轮播图的数据
Mock.mock('/mock/floor',{code:200,data:floor});
Mock.mock('/mock/address',{code:200,data:address});
