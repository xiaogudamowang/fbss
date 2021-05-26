<template>
  <ImgCutter v-on:cutDown="cutDown">
    <button slot="open">选择图片</button>
  </ImgCutter>
</template>

<script>
  import ImgCutter from 'vue-img-cutter'
    export default {
        name: "CutTest",
      components:{
        ImgCutter
      },
      methods:{
        cutDown(pic){
          console.log(pic)
        }
      }
    }
</script>

<style scoped>

</style>
