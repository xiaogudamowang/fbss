<template>
  <div style="width: 250px">
    <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    router>
    <el-menu-item index="pBook">
      <i class="el-icon-menu"></i>
      <span slot="title">购买数</span>
    </el-menu-item>
  </el-menu></div>
</template>

<script>
  import {getSortList} from "../../../../api/index.js";
    export default {
        name: "NavMenu",
      data(){
          return{
            sortList:[
              {
                pName: '购买数',
                pid:'1'
              }
            ]
          }
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      },
      created() {
        getSortList().then(response=>{
          this.sortList = response.data;
        })
      }
    }
</script>

<style scoped>

</style>
