<template>
  <div>
    <el-container>
      <el-main><Tabs></Tabs></el-main>
    </el-container>
  </div>
</template>

<script>
  import Tabs from './tabs/Tabs'
    export default {
        name: "Index",
      components: {
        Tabs
      }
    }
</script>

<style scoped>

</style>
