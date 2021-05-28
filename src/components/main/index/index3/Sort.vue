<template>
  <div class="div1">
    <div v-for="(item,i) in list1" style="margin: 5px;cursor:pointer;" @click="book(item.bookCode)">
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
</template>

<script>
  import {getBookListBySort} from "../../../../api/index.js"
  export default {
        name: "Sort",
      data(){
        return{
          list1:[

          ]
        }
      },
      computed:{
        onRoutes(){
          return this.$route.path.replace('/','');
        }
      },
      methods:{
        book(code){
          this.$router.push({name:'book',query:{code:code}});
        }
      },
      mounted() {
        var sortName = this.$route.query.sortName;
        getBookListBySort(sortName).then(res=>{
          this.list1 = res.data;
        })
      },
      beforeUpdate() {
        var sortName = this.$route.query.sortName;
        getBookListBySort(sortName).then(res=>{
          this.list1 = res.data;
        })
      }
    }
</script>

<style scoped>
  .div1{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 980px;

  }
  .time {
    font-size: 20px;
    color: #999;
  }

  .image {
    width: 100%;
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
    width: 180px;
  }

  .mas{
    display: flex;
    justify-content:space-between;
  }

  .author{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 130px;
    font-size: 12px;
    color: gray;
    padding-top: 8px;
  }
</style>
