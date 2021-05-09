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
      <div class="div1">
        <div v-for="(item,i) in list" style="margin: 5px;cursor:pointer;" @click="book(item.bookCode)">
          <el-card shadow="hover" :body-style="{ padding: '6px' }">
            <img :src="item.src" class="image">
            <div style="padding: 14px; display: flex; flex-direction:column">
              <span>{{item.bookName}}</span>
              <div class="mas">
                <div>{{item.author}}</div>
                <div class="time">{{item.price.toFixed(2)}}</div>
              </div>
            </div>
          </el-card>
        </div>
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
          }
      },
      created() {
          getBookList().then(response=>{
            this.list = response.data;
          })
      }
  }
</script>

<style scoped>
  .div1{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .div3{
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
  }
  .div2{

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
</style>
