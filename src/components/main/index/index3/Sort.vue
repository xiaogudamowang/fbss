<template>
  <div class="div1">
    <div v-for="(item,i) in list1" style="margin: 5px;cursor:pointer;" @click="book(item.bookCode)">
      <el-card shadow="hover" :body-style="{ padding: '6px' }">
        <img :src="item.src" class="image">
        <div style="padding: 14px;">
          <span>{{item.span}}</span>
          <div class="bottom clearfix">
            <time class="time">{{item.time}}</time>
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
          this.$router.push({name:'book',params:{code:code}});
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
    width: 780px;

  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
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
</style>
