<template>
  <div class="div1">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单编码">
              <span>{{ props.row.orderCode }}</span>
            </el-form-item>
            <el-form-item label="书籍编码">
              <span>{{ props.row.bookCode }}</span>
            </el-form-item>
            <el-form-item label="书籍名称">
              <span>{{ props.row.bookName }}</span>
            </el-form-item>
            <el-form-item label="数量">
              <span>{{ props.row.number }}</span>
            </el-form-item>
            <el-form-item label="单价">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="用户编码">
              <span>{{ props.row.userCode }}</span>
            </el-form-item>
            <el-form-item label="订单状态">
              <span>{{ props.row.state }}</span>
            </el-form-item>
            <el-form-item label="总价">
              <span>{{ props.row.total }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="订单编号"
        prop="orderCode">
      </el-table-column>
      <el-table-column
        label="书籍名称"
        prop="bookName">
      </el-table-column>
      <el-table-column
        label="顾客编号"
        prop="userCode">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getOrderListByShopCode} from "@/api/index.js"
    export default {
        name: "ShopOrder",
      data() {
        return {
          tableData: []
        }
      },
      created() {
          var shopCode = JSON.parse(localStorage.getItem("shopInfo")).shopCode;
          console.log(shopCode)
        getOrderListByShopCode(shopCode).then(res=>{
            this.tableData = res.data;
          })
      }
    }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
