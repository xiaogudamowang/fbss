<template>
  <div class="div1">
    <el-menu :default-active="onRoutes" :collapse="false" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
      <el-menu-item index="/index1-1">首页</el-menu-item>
      <el-menu-item index="/index1-2">排行榜</el-menu-item>
      <el-submenu index="3">
        <template slot="title">分类</template>
        <el-menu-item index="index1-3">分类1</el-menu-item>
        <el-menu-item index="index1-3">分类2
        </el-menu-item>
        <el-submenu index="3-4">
          <template slot="title">分类3</template>
          <el-menu-item index="index1-3">分类3-1</el-menu-item>
          <el-menu-item index="index1-3">分类3-2</el-menu-item>
          <el-menu-item index="index1-3">分类3-3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="index1-4">购物车</el-menu-item>
      <!--<el-menu-item index="4" disabled>消息中心</el-menu-item>-->
      <!--<el-menu-item index="5"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
    </el-menu>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
    export default {
      name: "Menu",
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      },
      computed:{
        onRoutes(){
          return this.$route.path.replace('/','');
        }
      }
    }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
  .div1{
    display: flex;
    flex-direction: column;
  }

</style>
