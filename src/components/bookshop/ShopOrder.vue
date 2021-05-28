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
            <el-form-item label="退款码" v-if="props.row.src != null">
              <img :src="props.row.src">
            </el-form-item>
            <el-form-item label="操作" v-if="props.row.state ==='申请退货'">
              <el-button size="small" type="primary" plain @click="querenshouhuo(props.row.orderCode)">确认收货</el-button>
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
      <el-table-column
        prop="state"
        label="标签"
        width="100"
        :filters="orderState"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="stateType(scope.row.state)"
            disable-transitions>{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getOrderListByShopCode} from "@/api/index.js"
  import {updStateByOrderCode} from "@/api/index.js"
    export default {
        name: "ShopOrder",
      data() {
        return {
          tableData: [],
          orderState:[{ text: '已下单', value: '已下单' }, { text: '申请退货', value: '申请退货' }],

        }
      },
      computed:{
        stateType: function () {
          return function (state) {
            var type = 'primary';
            if (state === '申请退货'){
              type = 'danger';
            }else if(state === '退货完成'){
              type = 'success';
            }
            return type;
          }
        }
      },
      methods:{
        filterTag(value, row) {
          return row.state === value;
        },
        querenshouhuo(orderCode){
          let param = new URLSearchParams();
          param.append('orderCode',orderCode);
          param.append('state','退货完成');
          updStateByOrderCode(param).then(res=>{
            console.log(res.data);
          })
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
