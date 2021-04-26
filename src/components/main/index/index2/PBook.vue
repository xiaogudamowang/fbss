<template>
  <div class="div1">
    <div v-for="(item,i) in list" style="margin: 5px;cursor:pointer;" @click="book">
      <el-card shadow="hover" :body-style="{ padding: '6px' }">
        <img :src="item.src" class="image">
        <div style="padding: 14px;">
          <span>{{item.span}}</span>
          <div class="bottom clearfix">
            <time class="time">{{item.time}}</time>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
    export default {
        name: "PBook",
      data(){
        return{
          list:[
            {
              src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              span: "好吃的汉堡",
              time: "2021-02-04"
            },{
              src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              span: "好吃的汉堡",
              time: "2021-02-04"
            },{
              src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              span: "好吃的汉堡",
              time: "2021-02-04"
            },{
              src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              span: "好吃的汉堡",
              time: "2021-02-04"
            },{
              src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              span: "好吃的汉堡",
              time: "2021-02-04"
            },{
              src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              span: "好吃的汉堡",
              time: "2021-02-04"
            },{
              src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              span: "好吃的汉堡",
              time: "2021-02-04"
            }
          ]
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
