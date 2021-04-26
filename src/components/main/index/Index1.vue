<template>
  <div class="div1">
    {{info}}
    <Carousel></Carousel>
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
      created(){
        this.axios.get('http://localhost:8080/static/mock/data.json').then(response=>{
          this.info=response.data;
        })
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
