<template>
    <div class="div1">
      <el-table
        :data="tableData"
        style="width: 100%;margin-left: 16px;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="书店编号">
                <span>{{ props.row.shopCode }}</span>
              </el-form-item>
              <el-form-item label="书店名称">
                <span>{{ props.row.shopCode }}</span>
              </el-form-item>
              <el-form-item label="书店头像">
                <span>{{ props.row.shopPicture }}</span>
              </el-form-item>
              <el-form-item label="联系方式">
                <span>{{ props.row.phoneNumber }}</span>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <span>{{ props.row.e_mail }}</span>
              </el-form-item>
              <el-form-item label="书店地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="会员时间">
                <span>{{ props.row.memberTime }}</span>
              </el-form-item>
              <el-form-item label="QQ">
                <span>{{ props.row.qq }}</span>
              </el-form-item>
              <el-form-item label="书店介绍">
                <span>{{ props.row.message }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="书店编码"
          prop="shopCode"
          width="250px">
        </el-table-column>
        <el-table-column
          label="书店名称"
          prop="shopName"
          width="250px">
        </el-table-column>
        <el-table-column
          label="联系方式"
          prop="phoneNumber"
          width="250px">
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">未通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import {getShopListShenHe} from '@/api/index.js'
  import {updShopExistByShopCode} from '@/api/index.js'
    export default {
        name: "shenHe",
      data() {
        return {
          tableData: []
        }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
          let param = new URLSearchParams();
          param.append('shopCode',this.tableData[index].shopCode);
          param.append('exist',1);
          updShopExistByShopCode(param).then(res=>{
            console.log(res.message);
            if (res.code == 0){
              getShopListShenHe().then(res=>{
                console.log(res.data)
                this.tableData = res.data;
              })
            }
          })

        },
        handleDelete(index, row) {
          console.log(index, row);
          let param = new URLSearchParams();
          param.append('shopCode',this.tableData[index].shopCode);
          param.append('exist',3);
          updShopExistByShopCode(param).then(res=>{
            console.log(res.message);
            if (res.code == 0){
              getShopListShenHe().then(res=>{
                console.log(res.data)
                this.tableData = res.data;
              })
            }
          })
        }
      },
      created() {
        getShopListShenHe().then(res=>{
          console.log(res.data)
          this.tableData = res.data;
        })
      }
    }
</script>

<style scoped>
  .div1{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 10px 0px;
  }
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
