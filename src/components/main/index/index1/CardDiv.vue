<template>
    <div class="div1">
      <div v-for="(item,i) in list" style="margin: 5px;cursor:pointer;" @click="book">
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
</template>

<script>
    export default {
        name: "CardDiv",
      data(){
        return{
          list:[]
        }
      },
      computed:{
        onRoutes(){
          return this.$route.path.replace('/','');
        }
      },
      methods:{
          book(){
            this.$router.push("/book");
          }
      },
      created() {
          this.axios.get('http://localhost:8080/static/mock/book.json').then(
            response=>{
              this.list=response.data;
            }
          )
      }
    }
</script>

<style scoped>
  .div1{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

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
