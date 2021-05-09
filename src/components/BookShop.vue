<template>
  <div class="div1">
    <div class="div2">
      <div style="width: 250px">
          <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose" router>
          <el-menu-item index="addBook">
            <i class="el-icon-menu"></i>
            <span slot="title">添加书籍</span>
          </el-menu-item>
          <el-menu-item index="bookAdmin">
            <i class="el-icon-menu"></i>
            <span slot="title">书籍管理</span>
          </el-menu-item>
          <el-menu-item index="bookShopMessage">
            <i class="el-icon-menu"></i>
            <span slot="title">信息管理</span>
          </el-menu-item>
          <el-menu-item index="changePassword">
            <i class="el-icon-menu"></i>
            <span slot="title">密码修改</span>
          </el-menu-item>
          <el-menu-item index="shopOrder">
            <i class="el-icon-menu"></i>
            <span slot="title">订单查看</span>
          </el-menu-item>
          <!--<el-menu-item index="bookData">-->
            <!--<i class="el-icon-menu"></i>-->
            <!--<span slot="title">数据统计</span>-->
          <!--</el-menu-item>-->
        </el-menu>
      </div>
      <div style="width: 100%">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "BookShop",
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
    width: 100%;
  }
</style>
