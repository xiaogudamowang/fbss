<template>
    <div class="div1">
      <div class="div2" v-for="item in list">
        <div class="div3">
          <div>
            {{item.bookName}}
          </div>
          <div>
            {{item.number}} x {{item.price}}
          </div>
        </div>
        <div class="div3">
          {{item.shopName}}
        </div>
        <div class="div3">
          <div>
            {{item.state}}
          </div>
          <div>
            {{item.total}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {getOrderList} from "@/api/index.js"
    export default {
        name: "Order",
      data(){
          return{
            list:[]
          }
      },
      created() {
        var userCode = JSON.parse(localStorage.getItem("userInfo")).userCode;
        getOrderList(userCode).then(res=>{
          console.log(res.data)
          this.list = res.data;
        })
      }
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
    margin: 0px 20px 10px 40px;
  }
  .div3{
    display: flex;
    justify-content: space-between;
    margin: 9px;
  }
</style>
