<template>
  <div class="div1">
    <CardDiv></CardDiv>
  </div>
</template>

<script>
  import Carousel from "./index1/Carousel"
  import CardDiv from "./index1/CardDiv"
    export default {
      name: "Index1",
      components: {CardDiv, Carousel},
      data() {
        return {
          info:{
            "data" : null,
            "mes" : null
          }
        };
      },
      methods: {

      },

    }
</script>

<style scoped>
  .dvi1{
    display: flex;
    flex-direction: column;
  }
</style>
