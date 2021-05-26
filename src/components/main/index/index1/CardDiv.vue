<template>
    <div class="div2">
      <div class="div3">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="formInline.value" class="div2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="div1" v-loading="loading">
        <div v-for="(item,i) in list" style="margin: 5px;cursor:pointer;width: 240px;height: 328px" @click="book(item.bookCode)">
          <el-card shadow="hover" :body-style="{ padding: '6px' }">
            <img :src="item.src" class="image">
            <div style="padding: 14px; display: flex; flex-direction:column">
              <span class="bookName">{{item.bookName}}</span>
              <div class="mas">
                <div class="author">{{item.author}}</div>
                <div class="time">{{item.price.toFixed(2)}}</div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div style="width: 100%;display: flex;justify-content:center;">
        <el-pagination
          background
          :page-size="20"
          layout="prev, pager, next"
          :total="total"
          @current-change="currentchange">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import {getBookList} from "../../../../api/index.js";
  import {selectBook} from "../../../../api/index.js";

  export default {
        name: "CardDiv",
      data(){
        return{
          list:[],
          total:0,
          loading:false,
          formInline: {
            value: '',
            region: ''
          }
        }
      },
      computed:{
        onRoutes(){
          return this.$route.path.replace('/','');
        }
      },
      methods:{
          book(code){
            // console.log(code)
            this.$router.push({name:'book',query:{code:code}});
          },
          onSubmit() {
            // console.log(this.formInline.value)
            selectBook(this.formInline.value).then(response=>{
              this.list = response.data;
            })
          },
          currentchange(current){
            this.loading = true;
            getBookList(current).then(response=>{
              this.list = response.data;
              this.total = response.total;
              this.loading = false;
            })
          }
      },
      created() {
          getBookList(1).then(response=>{
            this.list = response.data;
            this.total = response.total;
          })
      }
  }
</script>

<style scoped>
  .div1{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    height: 100%;
  }
  .div3{
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
  }
  .div2{
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content:center;
  }
  .time {
    font-size: 23px;
    color: #999;
  }

  .mas{
    display: flex;
    justify-content:space-between;
  }

  .image {
    width: 235px;
    height: 236px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .bookName{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 200px;
  }

  .author{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 200px;
  }
</style>
