<template>
    <div class="div1">
      <el-table
        :data="tableData"
        style="width: 100%">
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
          tableData: [],
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
                this.tableData=response.data
              })
            }
          })
        },
        handleChange(value) {
          console.log(value);
        }
      },
      created(){
        var userCode = JSON.parse(localStorage.getItem('userInfo')).userCode;
        gatCarList(userCode).then(response=>{
          console.log(response.data);
          this.tableData=response.data
        })
      }
    }
</script>

<style scoped>
  .div1{
    width: 1040px;

  }
</style>
