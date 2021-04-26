<template>
  <div class="div12222">
    <MySelect></MySelect>
    <Menu></Menu>
  </div>
</template>

<script>
  import Menu from "./main/Menu"
  import MySelect from "./main/MySelect"
    export default {
      name: "Main",
      components: {
        MySelect,
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
