<template>
    <div class="div1">
      <NavMenu1></NavMenu1>
      <router-view></router-view>
    </div>
</template>

<script>
  import NavMenu1 from './user/NavMenu1'
    export default {
        name: "User",
      components: {NavMenu1}
    }
</script>

<style scoped>
  .div1{
    width: 1080px;
    display: flex;
    flex-direction: row;
  }
</style>
