<template>
    <div class="div1">
      <div style="width: 100px">
        <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        >
          <el-menu-item v-for="(item,index) in list" :index="index" @click="tosort(item)" :key="index">
            <span slot="title">{{item.sortName}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
    import {getSortList} from '@/api/index.js'
    export default {
      name: "Index3",
      data(){
        return{
          list:[]
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
        },
        tosort(sort){
          this.$router.push({path:'sort',query:{sortName:sort.sortName}});
        }
      },
      created() {
        getSortList().then(res=>{
          this.list = res.data;
        })
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
