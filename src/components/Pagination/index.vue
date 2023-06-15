<!--
 * @Author: scl
 * @Date: 2023-02-20 08:36:53
 * @LastEditTime: 2023-03-02 15:07:14
 * @Description: file content
-->
<template>
  <div class="pagination">
  <button  :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
  <button v-if="startNumAndEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
  <button v-if="startNumAndEndNum.start>2">···</button>

    <!--  <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>7</button> -->
    <!-- 中间部分 -->
    <button v-for="item,index in pageRange" :key="index" @click="$emit('getPageNo',item)" :class="{active:pageNo==item}">
      {{ item }}
    </button>


    <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
    <button v-if="startNumAndEndNum.end<totalPage"   @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo>=totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continue'],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    //计算连续页码的起始数据和终止数据
    startNumAndEndNum() {
      let start = 0, end = 0;
      console.log(this.pageNo,this.pageSize,this.total,this.continue)
      if (this.continue > this.totalPage) {
        start = 1,
          end = this.totalPage
      } else {
        if (this.pageNo > Math.floor(this.continue / 2)) {
          if (this.pageNo + 2 > this.totalPage) {
            start = this.totalPage - this.continue - 1
            end = this.totalPage
          } else {
            start = this.pageNo - Math.floor(this.continue / 2)
            end = this.pageNo + 2
          }
        } else {
          start = 1,
          end = this.continue
        }
      }
      return { start, end }
    },
    pageRange(){
      let num=1
      let pageRange=[]
      while(num<=this.startNumAndEndNum.end){
        if(num>=this.startNumAndEndNum.start){
          pageRange.push(num)
        }
        num++
      }
      return pageRange
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #ea4a36;
      color: #fff;
    }
  }
}
</style>