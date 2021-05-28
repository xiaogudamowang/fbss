<template>
    <div class="div1">
      <div class="div2">
        <div class="div3">
              <!--<div style="background: url(http://img3m0.ddimg.cn/83/2/29199440-1_u_17.jpg); width: 300px;height: 300px">-->
              <!--</div>-->
          <img :src="book.src" style="width: 280px">
        </div>
        <div class="div4">

          <div class="div6 divt">《{{book.bookName}}》</div>
          <div class="divt">简介：{{book.message}}</div>
          <div class="divt">作者：{{book.author}} 著</div>
          <div class="divt">出版社：{{book.press}}</div>
          <div class="divt">出版时间：{{book.createAt}} </div>
          <div class="divt">版次：{{book.edition}} </div>
          <div class="div7"><span style="margin-right: 10px">¥{{book.price}}</span>
            <el-input-number v-model="num" :min="1" :max="1000" label="描述文字" ></el-input-number></div>
          <div class="div5">
            <el-button type="primary" @click="car" plain>加入购物车</el-button>
            <el-button type="success" @click="pay" plain>立即下单</el-button>
            <a target="_blank" :href="'http://wpa.qq.com/msgrd?v=3&uin='+bookShop.qq+'&site=qq&menu=yes'"><el-button>联系客服</el-button></a>
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
  import {getBookShopByCode} from '../api/index.js'
    export default {
        name: "Book",
      data(){
        return{
          centerDiaologVisible: false,
          bookCode: '',
          userCode: '',
          num:'',
          book:{},
          bookShop:{}
        }
      },
      created() {
        this.bookCode = this.$route.query.code
      }
      ,
      mounted() {
        getBookListByCode(this.bookCode).then(response=>{
          this.book = response.data;
          getBookShopByCode(response.data.shopCode).then(res=>{
            this.bookShop = res.data;
          })
        });
      },
      methods:{
        pay(){
          if (this.num > this.book.number){
            this.$message('商品数量不足');
          }else{
            this.centerDiaologVisible = true;
            this.bookCode = this.book.bookCode;
            this.userCode = JSON.parse(localStorage.getItem('userInfo')).userCode
          }
        },
        car(){
          if (this.num > this.book.number){
            this.$message('商品数量不足');
          }
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
              this.$message("添加成功")
            } else {
              this.$message("添加失败")
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
    display: flex;
    margin: 10px 0px 20px 0px;
  }
  .divt{
    margin: 10px 0px 15px 0px;
  }

</style>
