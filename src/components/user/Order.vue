<template>
    <div class="div1">
      <div class="div2" v-for="item in [1,2,3,4,5,6]">
        <div class="div3">
          <div>
            bookName
          </div>
          <div>
            number x price
          </div>
        </div>
        <div>
          shopName
        </div>
        <div class="div3">
          <div>
            state
          </div>
          <div>
            total
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Order"
    }
</script>

<style scoped>
  .div1{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .div2{
    width: 80%;
    border: aqua 1px solid;
    border-radius: 6px;
    height: 100px;
    margin: 0px 20px 10px 40px;
  }
  .div3{
    display: flex;
    justify-content: space-between;
  }
</style>
