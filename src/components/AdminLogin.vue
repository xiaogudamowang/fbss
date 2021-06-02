<template>
  <div class="div1" >
    <AdminSubmit></AdminSubmit>
  </div>
</template>

<script>
  import AdminSubmit from './login/AdminSubmit'
  export default {
    name: "AdminLogin",
    components: {AdminSubmit}
  }
</script>

<style scoped>
  .div1{
    background-image: url('https://shudianbucket-guangzhou.oss-cn-beijing.aliyuncs.com/%E7%AE%A1%E7%90%86%E5%91%98%E7%99%BB%E5%BD%95%E5%A3%81%E7%BA%B8.jpeg');
    background-repeat: no-repeat;
  }
</style>
