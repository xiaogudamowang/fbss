<template>
  <div class="div1">
    <a href="http://localhost:8080/"><img class="header-logo" width="50px" src="https://shudianbucket-guangzhou.oss-cn-beijing.aliyuncs.com/%E5%9B%BE%E6%80%AA%E5%85%BD_d206fc54acd2c1946ff8e6f1609fd736_51302.jpg"></a>
    <div style="display: flex;flex-direction: row;">
      <div style="margin: 8px 0;cursor:pointer " @click="user"><img :src="'https://shudianbucket-guangzhou.oss-cn-beijing.aliyuncs.com/'+pic" width="50px" height="50px"/></div>
      <el-button @click="logout" size="mini" style="margin: 10px;">登 出</el-button>
    </div>
  </div>

</template>

<script>
    export default {
      name: "Header",
      data(){
        return{
          pic:''
        }
      },
      methods:{
        user(){
          if (localStorage.getItem("userInfo") == null || localStorage.getItem("userInfo") == ""){
            this.$router.push("/login");
          } else{
            this.$router.push("/user");
          }
        },
        logout(){
          localStorage.setItem("userInfo","");
          this.$router.push('/login');
        }
      },
      created() {
        if(!localStorage.getItem("userInfo")){
          this.pic = '1620613909472.jpg';
          console.log(this.pic)
        }else{
          this.pic = JSON.parse(localStorage.getItem("userInfo")).userPicture;
          console.log(this.pic)
        }

      }
    }
</script>

<style scoped>
  .header-logo{
    width: 110px;
    height: 60px;
  }
  .el-col{
    height: 60px;
  }
  .div1{
    display: flex;
    justify-content: space-between;
  }

</style>
