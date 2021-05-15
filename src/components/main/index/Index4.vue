<template>
    <div class="div1">
      <el-button size="small" style="width: 80px" @click="isNotExist">失效商品</el-button>
      <el-table
        :data="tableData"
        style="width: 100%"
        empty-text="购物车空空如也">
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
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"style=" margin: 15px auto">
      </el-pagination>
      <el-dialog title="注册" :visible.sync="centerDiaologVisible2" width="1000px" center>
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
    </div>
</template>

<script>
import {gatCarList} from "@/api/index.js";
import {delCarByCarCode} from "@/api/index.js";
    export default {
        name: "Index4",
      data() {
        return {
          centerDiaologVisible: false,
          centerDiaologVisible2: false,
          tableData: [],
          tableDataIsNotExist:[],
          search: ''
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
                let t1 = this.tableData;
                let t2 = this.tableDataIsNotExist;
                response.data.forEach(myForEach);
                // 遍历CarList将失效的放进失效数组，有效的放进常规数组
                function myForEach(value, index, array) {
                  if (value.exist === 1){
                    t1.push(value)
                  } else {
                    console.log(t2)
                    t2.push(value)
                  }
                }
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
        }
      },
      created(){
        // 获取userCode
        var userCode = JSON.parse(localStorage.getItem('userInfo')).userCode;
        // 获取CarList
        gatCarList(userCode).then(response=>{
          let t1 = this.tableData;
          let t2 = this.tableDataIsNotExist;
          response.data.forEach(myForEach);
          // 遍历CarList将失效的放进失效数组，有效的放进常规数组
          function myForEach(value, index, array) {
            if (value.exist === 1){
              t1.push(value)
            } else {
              console.log(t2)
              t2.push(value)
            }
          }
        })
      }
    }
</script>

<style scoped>
  .div1{
    width: 1040px;

  }
</style>
