<template>
  <div class="div1">
    <NavMenu></NavMenu>
    <router-view></router-view>
  </div>
</template>

<script>
  import NavMenu from './index2/NavMenu'
  import PBook from './index2/PBook'
    export default {
        name: "Index2",
      components: {PBook, NavMenu}
    }
</script>

<style scoped>
  .div1{
    display: flex;
    flex-direction: row;
    width: 1040px;
    justify-content: space-between;
  }
</style>
