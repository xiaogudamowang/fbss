<template>
    <div>
      <el-container>
        <el-main>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理1" name="first"><Index></Index></el-tab-pane>
            <el-tab-pane label="配置管理1" name="second">配置管理111</el-tab-pane>
            <el-tab-pane label="角色管理1" name="third">角色管理111</el-tab-pane>
            <el-tab-pane label="定时任务补偿1" name="fourth">定时任务补偿111</el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>


    </div>
</template>

<script>
  import Index from './index/Index'
    export default {
      name: "Main",
      components: {
        Index
      },
      data() {
        return {
          activeName: 'first'
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      }
    }
</script>

<style>
  .el-main {
    background-color: #fefefe;
    color: #333;
    text-align: center;
  }
</style>
