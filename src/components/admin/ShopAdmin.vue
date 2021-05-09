<template>
  <div class="div1">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        fixed
        label="商店编号"
        prop="shopCode"
        width="200">
      </el-table-column>
      <el-table-column
        label="商店名称"
        prop="shopName"
        width="250">
      </el-table-column>
      <el-table-column
        label="联系方式"
        prop="phoneNumber"
        width="200">
      </el-table-column>
      <el-table-column
        label="电子邮箱"
        prop="e_mail"
        width="250">
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
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
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
    <el-dialog title="商店信息修改" :visible.sync="centerDiaologVisible" width="800px" center>
      <div class="div2">
        <el-form ref="form" :model="form" label-width="80px" style="width: 100%">
          <div class="div2">
            <el-form-item label="商店编号">
              <el-input v-model="form.shopCode" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="商店名称">
              <el-input v-model="form.shopName"></el-input>
            </el-form-item>
          </div>
          <div class="div2">
            <el-form-item label="联系方式">
              <el-input v-model="form.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
          </div>
          <div class="div2">
            <el-form-item label="电子邮箱">
              <el-input v-model="form.e_mail"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </div>
          <div class="div2">
            <el-form-item label="会员时间">
              <el-input v-model="form.memberTime"></el-input>
            </el-form-item>
            <el-form-item label="QQ">
              <el-input v-model="form.QQ"></el-input>
            </el-form-item>
          </div>
          <div class="div2">
            <el-form-item label="商店描述" style="width: 640px">
              <el-input type="textarea" v-model="form.message"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getShopList} from "@/api/index.js"
  import {delShopByShopCode} from "@/api/index.js"
  import {updShopByShopCode} from "@/api/index.js"
  export default {
    name: "ShopAdmin",
    data() {
      return {
        centerDiaologVisible: false,
        form: {
          id: '',
          shopCode: '',
          shopName: '',
          shopPicture: '',
          phoneNumber: '',
          password: '',
          e_mail: '',
          address: '',
          memberTime: '',
          QQ: '',
          message: '',
          createAt: '',
          updateAt: '',
          exist: ''
        },
        tableData: [],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.centerDiaologVisible = true;
        this.form.shopCode = this.tableData[index].shopCode
        this.form.shopName = this.tableData[index].shopName
        this.form.shopPicture = this.tableData[index].shopPicture
        this.form.phoneNumber = this.tableData[index].phoneNumber
        this.form.password = this.tableData[index].password
        this.form.e_mail = this.tableData[index].e_mail
        this.form.address = this.tableData[index].address
        this.form.memberTime = this.tableData[index].memberTime
        this.form.QQ = this.tableData[index].qq
        this.form.message = this.tableData[index].message

      },
      handleDelete(index, row) {
        console.log(index, row);
        var shopCode = this.tableData[index].shopCode;
        let param = new URLSearchParams();
        param.append("shopCode",shopCode)
        delShopByShopCode(param).then(res=>{
          if(res.data === 1){
            getShopList().then(response=>{
              this.tableData = response.data;
            })
          }else{
            alert('删除失败')
          }
        })
      },
      onSubmit() {
        let param = new URLSearchParams();
        param.append("shopCode",this.form.shopCode)
        param.append("shopName",this.form.shopName)
        param.append("shopPicture",this.form.shopPicture)
        param.append("phoneNumber",this.form.phoneNumber)
        param.append("password",this.form.password)
        param.append("e_mail",this.form.e_mail)
        param.append("address",this.form.address)
        param.append("memberTime",this.form.memberTime)
        param.append("QQ",this.form.QQ)
        param.append("message",this.form.message)
        updShopByShopCode(param).then(res=>{
          if(res.data){
            alert('修改成功');
            getShopList().then(response=>{
              this.tableData = response.data;
            })
          }else {
            alert('修改失败')
          }
        })

      },
      handleChange(value) {
        console.log(value);
      }
    },
    created(){
      getShopList().then(response=>{
        this.tableData = response.data;
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
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 400px;
  }
  .div2{
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
</style>
