<template>
    <div class="div1">
      <div class="div2" v-for="item in list" style="padding: 12px">
        <div style="display: flex;flex-direction: column;">
          <div style="font-weight: bold;margin-bottom: 10px;display: flex;flex-direction: column; font-size: 20px">
            {{item.shopName}}
          </div>
          <div style="display: flex;flex-direction: row;justify-content: space-between;margin-bottom: 10px">
            <img :src="item.pictrue" width="100px">
            <div style="width: 100%;padding: 12px;display: flex;align-items: center;overflow: hidden;text-overflow: ellipsis;">
              {{item.bookName}}
            </div>
            <div>
              <div style="font-size: 12px">
                {{item.number}} x {{item.price}}
              </div>
              <div style="font-size: 24px;">
                ￥{{item.total}}
              </div>
              <div style="font-size: 14px; color: gray">
                {{item.state}}
              </div>
            </div>
          </div>
          <div style="display: flex;flex-direction: row-reverse;">
            <el-button size="mini" round @click="tuihuo(item)" v-if="item.state === '已收货' || item.state === '订单完成'">
              退货
            </el-button>
            <el-button size="mini" round @click="querenshouhuo(item)" v-if="item.state === '已下单'">
              确认收货
            </el-button>
          </div>
        </div>
      </div>
      <el-dialog title="退货信息" :visible.sync="centerDiaologVisible" width="600px" center>
        <div style="color: red">（请上传您的支付宝收款码）</div>
        <img :src="src">
        <ImgCutter v-on:cutDown="cutDown" :sizeChange="false" :cutWidth="100" :cutHeight="100">
          <el-button slot="open">选择图片</el-button>
        </ImgCutter>
        <div style="color: red">（保存以下书店信息用于邮寄商品）</div>
        <div>商家地址：{{shop.address}}</div>
        <div>商家名称：{{shop.shopName}}</div>
        <div>商家电话：{{shop.phoneNumber}}</div>
        <el-button @click="tijiao()">提交</el-button>
      </el-dialog>
    </div>
</template>

<script>
  import {getOrderList} from "@/api/index.js"
  import {getBookShopByCode} from "@/api/index.js"
  import {updsrcByOrderCode} from "@/api/index.js"
  import {updStateByOrderCode} from "@/api/index.js"
  import ImgCutter from 'vue-img-cutter'
  import axios from 'axios';
    export default {
        name: "Order",
      components:{
        ImgCutter
      },
      data(){
          return{
            list:[],
            shop:{},
            centerDiaologVisible: false,
            src:'',
            order:{}
          }
      },
      methods:{
        tijiao(){
          if (this.src == ''){
            this.$message('请添加收款码');
          } else{
            let param = new URLSearchParams();
            console.log(this.order.orderCode);
            param.append('orderCode',this.order.orderCode);
            param.append('src',this.src);
            updsrcByOrderCode(param).then(res=>{
              console.log(res.data);
            })
            this.$message('提交成功')
            var userCode = JSON.parse(localStorage.getItem("userInfo")).userCode;
            getOrderList(userCode).then(res=>{
              this.list = res.data;
            })
          }
        },
        tuihuo(item){
          this.order = item;
          getBookShopByCode(item.shopCode).then(res=>{
            this.shop = res.data;
            this.centerDiaologVisible = true;
          })
        },
        querenshouhuo(item){
          let param = new URLSearchParams();
          param.append('orderCode',item.orderCode);
          param.append('state','已收货');
          updStateByOrderCode(param).then(res=>{
            console.log(res.data);
            this.$message('成功收货');
            var userCode = JSON.parse(localStorage.getItem("userInfo")).userCode;
            getOrderList(userCode).then(res=>{
              this.list = res.data;
            })
          })
        },
        cutDown(file){
          let param = new FormData();
          param.append('file',file.file);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }  //添加请求头
          axios.post('/picTest',param,config)
            .then(response=>{
              this.src = 'https://shudianbucket-guangzhou.oss-cn-beijing.aliyuncs.com/'+response.data;
            })
        }
      },
      created() {
        var userCode = JSON.parse(localStorage.getItem("userInfo")).userCode;
        getOrderList(userCode).then(res=>{
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
    box-shadow: 0 0 6px #b3b3b3;
    border-radius: 6px;
    margin: 0px 20px 20px 40px;
  }
  .div3{
    display: flex;
    justify-content: space-between;
    margin: 9px;
  }
</style>
