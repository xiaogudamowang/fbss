<template>
  <el-container>
    <el-header><Header></Header></el-header>
    <el-main><Main></Main></el-main>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script>
import Main from './components/main/Main';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

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
  }
  .el-footer {
    color: #333;
    text-align: center;
  }
  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
  }
</style>
