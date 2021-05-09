<template>
  <div class="div12222">
    <Menu></Menu>
  </div>
</template>

<script>
  import Menu from "./main/Menu"
    export default {
      name: "Main",
      components: {
        Menu
      },
      data() {
        return {
          activeName: 'first'
        };
      }
    }
</script>

<style>
  .div12222{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1080px;
  }
</style>
