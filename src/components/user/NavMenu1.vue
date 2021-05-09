<template>
  <div style="width: 250px">
    <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    router>
      <el-menu-item index="/info">
        <i class="el-icon-menu"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="/address">
        <i class="el-icon-menu"></i>
        <span slot="title">收货地址</span>
      </el-menu-item>
      <el-menu-item index="/order">
        <i class="el-icon-menu"></i>
        <span slot="title">订单信息</span>
      </el-menu-item>
      <el-menu-item index="/userPicture">
        <i class="el-icon-menu"></i>
        <span slot="title">更换头像</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
    export default {
        name: "NavMenu1",
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>

</style>
