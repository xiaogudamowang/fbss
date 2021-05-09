<template>
  <div class="div1">
    <a href="http://localhost:8080/"><img class="header-logo" src="../static/某书店Logo（header大）.png"></a>
    <div style="display: flex;flex-direction: row;">
      <div style="margin: 8px 0;cursor:pointer " @click="user"><el-avatar icon="el-icon-user-solid"></el-avatar></div>
      <el-button @click="logout" size="mini" style="margin: 10px;">登 出</el-button>
    </div>
  </div>

</template>

<script>
    export default {
      name: "Header",
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
