<template>
  <div class="div1">
    <div class="div2">
      <div style="width: 250px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router>
          <el-menu-item index="/userAdmin">
            <i class="el-icon-menu"></i>
            <span slot="title">顾客管理</span>
          </el-menu-item>
          <el-menu-item index="">
            <i class="el-icon-menu"></i>
            <span slot="title">商家管理</span>
          </el-menu-item>
          <el-menu-item index="">
            <i class="el-icon-menu"></i>
            <span slot="title">菜单三</span>
          </el-menu-item>
          <el-menu-item index="">
            <i class="el-icon-menu"></i>
            <span slot="title"></span>
          </el-menu-item>
        </el-menu>
      </div>
      <div>
        <!--<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2389042461&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:2389042461:41" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>-->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Admin",
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
  .div1{
    display: flex;
    justify-content: center;
  }
  .div2{
    display: flex;
    flex-direction: row;
  }
</style>
