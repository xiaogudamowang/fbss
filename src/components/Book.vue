<template>
    <div class="div1">
      <div class="div2">
        <div class="div3">
              <!--<div style="background: url(http://img3m0.ddimg.cn/83/2/29199440-1_u_17.jpg); width: 300px;height: 300px">-->
              <!--</div>-->
          <img :src="book.src" style="width: 280px"></img>
        </div>
        <div class="div4">

          <div class="div6 divt">《{{book.bookName}}》</div>
          <div class="divt">简介：{{book.message}}</div>
          <div class="divt">作者：{{book.author}} 著</div>
          <div class="divt">出版社：{{book.press}}</div>
          <div class="divt">出版时间：{{book.createAt}} </div>
          <div class="divt">版次：{{book.edition}} </div>
          <div class="div7 divt">¥{{book.price}}</div>
          <el-input-number v-model="num" :min="1" :max="10" label="描述文字" ></el-input-number>
          <div class="div5">
            <el-button type="primary" @click="car">加入购物车</el-button>
            <el-button type="success" @click="pay">立即下单</el-button>
          </div>

          <el-dialog title="支付宝" :visible.sync="centerDiaologVisible" width="400px" center>
            <div>
              <img :src="'http://localhost:8888/alipay/pay?bookCode='+bookCode+'&userCode='+userCode+'&number='+num">
            </div>
          </el-dialog>
        </div>
      </div>

    </div>
</template>

<script>
  import {getBookListByCode} from '../api/index.js'
  import {addBookToCar} from '../api/index.js'
    export default {
        name: "Book",
      data(){
        return{
          centerDiaologVisible: false,
          bookCode: '',
          userCode: '',
          num:'',
          book:{}
        }
      },
      created() {
        this.bookCode = this.$route.query.code
        //alert(this.bookCode);
      }
      ,
      mounted() {
        //alert(this.bookCode);
        getBookListByCode(this.bookCode).then(response=>{
          this.book = response.data;
          console.log(this.book)
        })
      },
      methods:{
        pay(){
          this.centerDiaologVisible = true;
          this.bookCode = this.book.bookCode;
          this.userCode = JSON.parse(localStorage.getItem('userInfo')).userCode
        },
        car(){
          let param = new URLSearchParams();
          // 获取userCode
          param.append('userCode',JSON.parse(localStorage.getItem('userInfo')).userCode)
          // 获取bookCode
          param.append('bookCode',this.bookCode)
          // 获取number
          param.append('number',this.num);
          // 调用接口
          addBookToCar(param).then(res=>{
            if(res.data === 1){
              alert("添加成功")
            } else {
              alert("添加失败")
            }
          })
        }
      }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .div1{
    display: flex;
    justify-content: center;
  }

  .div2{
    width: 1080px;
    display: flex;
  }

  .div3{
    width: 280px;
    margin: 10px;
  }
  .div4{
    width: 740px;
    margin: 10px;
  }
  .div5{
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
  }
  .div6{
    color: #F56C6C;
    font-weight:bold;
    font-size: 30px;
  }
  .div7{
    color: #F56C6C;
    font-size: 25px;
  }
  .divt{
    margin: 10px 0px 10px 0px;
  }

</style>
