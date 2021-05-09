<template>
    <div class="div1">
      <div style="width: 250px">
        <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
        >
        <el-menu-item index="1" :route="{path: list[0].url, query: { sortName: list[0].sortName }}">
          <i class="el-icon-menu"></i>
          <span slot="title">文学</span>
        </el-menu-item>
        <el-menu-item index="2" :route="{path: list[1].url, query: { sortName: list[1].sortName }}">
          <i class="el-icon-menu"></i>
          <span slot="title">教育</span>
        </el-menu-item>
        <el-menu-item index="3" :route="{path: list[2].url, query: { sortName: list[2].sortName }}">
          <i class="el-icon-menu"></i>
          <span slot="title">科学</span>
        </el-menu-item>
      </el-menu>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>

    export default {
      name: "Index3",
      data(){
        return{
          list:[
            {url:'/sort',sortName:'文学'},
            {url:'/sort',sortName:'教育'},
            {url:'/sort',sortName:'科学'}
          ]
        }
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        push(){
          console.log('22222');
        }
      }
    }
</script>

<style scoped>
  .div1{
    width: 1080px;
    display: flex;
    flex-direction: row;
  }
</style>
