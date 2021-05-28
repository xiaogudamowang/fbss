<template>
    <div class="div1">
      <el-button size="small" style="width: 80px" @click="isNotExist">失效商品</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        empty-text="购物车空空如也"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          label="书籍编号"
          prop="bookCode"
          width="200">
        </el-table-column>
        <el-table-column
          fixed
          label="书籍名称"
          prop="bookName"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="数量"
          prop="number"
          width="150">
        </el-table-column>
        <el-table-column
          label="单价"
          prop="price"
          width="250">
        </el-table-column>
        <el-table-column
          label="共计"
          prop="total"
          width="150">
        </el-table-column>
        <el-table-column
          label="书店名称"
          prop="shopName"
          width="100">
        </el-table-column>
        <el-table-column
          align="right"
          width="200px"
          fixed="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"style=" margin: 15px auto">
      </el-pagination>
      <el-button type="primary" style="width: 100px" @click="tijiao" plain>结算</el-button>
      <el-dialog title="失效商品" :visible.sync="centerDiaologVisible2" width="1000px" center>
        <div class="div2">
          <el-table
            :data="tableDataIsNotExist"
            style="width: 100%"
            empty-text="没有失效商品">
            <el-table-column
              fixed
              label="书籍编号"
              prop="bookCode"
              width="200">
            </el-table-column>
            <el-table-column
              fixed
              label="书籍名称"
              prop="bookName"
              width="200">
            </el-table-column>
            <el-table-column
              label="数量"
              prop="number"
              width="150">
            </el-table-column>
            <el-table-column
              label="单价"
              prop="price"
              width="250">
            </el-table-column>
            <el-table-column
              label="共计"
              prop="total"
              width="150">
            </el-table-column>
            <el-table-column
              label="书店名称"
              prop="shopName"
              width="100">
            </el-table-column>
            <el-table-column
              align="right"
              width="200px"
              fixed="right">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete2(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <el-dialog title="确认订单" :visible.sync="centerDiaologVisible3" width="500px" center>
        <div class="div2">
          <!--地址-->
          <div style="display: flex;justify-content:space-between">
            <div>
              <div style="font-size: 20px;font-weight: bold">{{address.message}}</div>
              <div>{{address.tel}}</div>
              <div>{{address.name}}</div>
            </div>
            <div style="display: flex;align-items:center"><el-button size="mini" @click="drawer = true"><i class="el-icon-edit"></i></el-button></div>
          </div>
          <!--分割线-->
          <el-divider></el-divider>
          <!--书籍-->
          <div style="display: flex;margin: 10px 0px" v-for="(item,index) in multipleSelection">
            <div>
              <img :src=item.src width="80px">
            </div>
            <div style="display: flex;flex-direction:column;align-items:flex-start;padding: 6px 0px 0px 8px">
              <div style="font-size: 15px;margin: 0px 0px 10px 0px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: 320px">书名：{{item.bookName}}</div>
              <div style="font-size: 15px">数量：{{item.number}}</div>
              <div style="font-size: 15px">单价：<span style="font-size: 20px;font-weight: bold;color: red">￥{{item.price}}</span></div>
            </div>
          </div>
          <!--分割线-->
          <el-divider></el-divider>
          <!--合计价格-->
          <div style="display: flex;justify-content:space-between">
            <div style="font-size: 10px;font-weight: bold;color: red">￥<span style="font-size: 25px;font-weight: bold;color: red">{{totalMoney}}</span></div>
            <div><el-button type="danger" size="mini" round @click="jiesuan(multipleSelection)">提交订单</el-button></div>
          </div>
        </div>
      </el-dialog>

      <!--付款码-->
      <el-dialog :visible.sync="centerDiaologVisible4" center width="150px">
        <img :src="'http://localhost:8888/alipay/payList?code='+code" width="100px">
      </el-dialog>

      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false">
        <div style="margin: 20px">
          <div v-for="(item,index) in addressList">
            <!--if for 遍历-->
            <div @click="changeAddress(index)" style="cursor:pointer">
              <div style="font-size: 20px;font-weight: bold">{{item.message}}</div>
              <div>{{item.tel}}</div>
              <div>{{item.name}}</div>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </el-drawer>
    </div>
</template>

<script>
import {gatCarList} from "@/api/index.js";
import {delCarByCarCode} from "@/api/index.js";
import {carapy} from "@/api/index.js";
import {getMoRenAddressByUserCode} from "@/api/index.js";
import {getAddressList} from "@/api/index.js";
import {insertOrder} from "@/api/index.js";
    export default {
        name: "Index4",
      data() {
        return {
          centerDiaologVisible: false,
          centerDiaologVisible2: false,
          centerDiaologVisible3: false,
          centerDiaologVisible4: false,
          drawer: false,
          tableData: [],
          tableDataIsNotExist:[],
          search: '',
          total:20,
          multipleSelection: [],
          code:'1',
          address:'',
          addressList:[],
          totalMoney:''
        }
      },
      methods: {
        handleDelete(index, row) {
          console.log(index, row);
          var carCode = this.tableData[index].carCode;
          let param = new URLSearchParams();
          param.append('carCode',carCode);
          delCarByCarCode(param).then(res=>{
            if(res.data){
              var userCode = JSON.parse(localStorage.getItem('userInfo')).userCode;
              gatCarList(userCode).then(response=>{
                let t1 = [];
                let t2 = [];
                response.data.forEach(myForEach);
                // 遍历CarList将失效的放进失效数组，有效的放进常规数组
                function myForEach(value, index, array) {
                  if (value.exist === 1){
                    t1.push(value)
                  } else {
                    t2.push(value)
                  }
                }
                this.tableData =t1
                this.tableDataIsNotExist =t2
              })
            }
          })
        },
        isNotExist(){
          this.centerDiaologVisible2 = true;
        },
        handleDelete2(index, row) {
        },
        handleChange(value) {
          console.log(value);
        },
        tijiao() {
          if (this.multipleSelection.length == 0){
            alert('请选择商品');
          } else{
            //更改address
            var userCode = JSON.parse(localStorage.getItem('userInfo')).userCode;
            getMoRenAddressByUserCode(userCode).then(res=>{
              this.address = res.data;
            })
            var t = 0;
            this.multipleSelection.forEach(foreach1)
            function foreach1(value, index, array) {
              t+=(value.number*100)*(value.price*100)
            }
            t = t / 10000
            this.totalMoney=t
            this.centerDiaologVisible3 = true;
          }
        },
        jiesuan(rows){
          if (rows) {
            var carlist = [];
            rows.forEach((row,index) => {
              var car = {};
              car.bookCode = this.multipleSelection[index].bookCode;
              car.userCode = JSON.parse(localStorage.getItem('userInfo')).userCode
              car.number = this.multipleSelection[index].number;
              let param = new URLSearchParams();
              param.append("bookCode",car.bookCode);
              param.append("userCode",car.userCode);
              param.append("number",car.number);
              param.append("bookName",this.multipleSelection[index].bookName);
              insertOrder(param).then(res=>{})
              carlist.push(car);
            });
            carapy(carlist).then(res=>{
              this.code = res;
            });
            this.centerDiaologVisible4 = true;
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        changeAddress(index){
          this.address = this.addressList[index];
        }
      },
      created(){
        // 获取userCode
        var userCode = JSON.parse(localStorage.getItem('userInfo')).userCode;
        // 获取CarList
        gatCarList(userCode).then(response=>{
          let t1 = this.tableData;
          let t2 = this.tableDataIsNotExist;
          var t = 0
          response.data.forEach(myForEach);
          // 遍历CarList将失效的放进失效数组，有效的放进常规数组
          function myForEach(value, index, array) {
            if (value.exist === 1){
              t1.push(value)
              t++
            } else {
              t2.push(value)
            }
          }
          this.total = t;
        })
        getAddressList(userCode).then(res=>{
          this.addressList = res.data;
        })
      }
    }
</script>

<style scoped>
  .div1{
    width: 1040px;

  }
</style>
