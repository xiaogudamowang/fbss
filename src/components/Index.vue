<template>
  <el-container class="div1">
    <el-header><Header></Header></el-header>
    <el-main class="div2"><Main></Main></el-main>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script>
  import Main from './Main';
  import Header from './Header'
  import Footer from './Footer'

  export default {
    name: 'Index',
    components: {
      Main,
      Header,
      Footer
    }
  }
</script>

<style scoped>

  .div2{
    display: flex;
    justify-content: center;
  }

  .div1{
    min-width: 1080px;
  }

</style>
