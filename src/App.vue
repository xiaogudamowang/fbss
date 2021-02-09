<template>
  <el-container>
    <el-header><Header></Header></el-header>
    <el-main><Main></Main></el-main>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script>
import Main from './components/Main';
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Main,
    Header,
    Footer
  }
}
</script>

<style>
  .el-header{
    color: #333;
    background-color: bisque;
  }
  .el-footer {
    color: gray;
    text-align: center;
    background-color: aqua;
  }
  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    background-color: antiquewhite;
  }
</style>
