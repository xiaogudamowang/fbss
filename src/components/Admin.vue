<template>
  <div class="div1">
    <div class="div2">
      <div style="width: 250px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <!--<el-submenu index="1">-->
          <!--<template slot="title">-->
          <!--<i class="el-icon-location"></i>-->
          <!--<span>导航一</span>-->
          <!--</template>-->
          <!--<el-menu-item-group>-->
          <!--<template slot="title">分组一</template>-->
          <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
          <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--<el-menu-item-group title="分组2">-->
          <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--<el-submenu index="1-4">-->
          <!--<template slot="title">选项4</template>-->
          <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
          <!--</el-submenu>-->
          <!--</el-submenu>-->
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">菜单一</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">菜单二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">菜单三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">菜单四</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div>
        管理员
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
    width: 1080px;
  }
</style>
