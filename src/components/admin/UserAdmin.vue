<template>
  <div class="div1">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;margin-left: 16px;">
      <el-table-column
        fixed
        label="顾客编号"
        prop="userCode"
        width="200">
      </el-table-column>
      <el-table-column
        label="顾客名称"
        prop="userName"
        width="150">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="gender"
        width="100">
      </el-table-column>
      <el-table-column
        label="联系方式"
        prop="phoneNumber"
        width="150">
      </el-table-column>
      <el-table-column
        label="电子邮箱"
        prop="e_mail"
        width="200">
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
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>



    <el-pagination
      background
      @current-change="currentchange"
      layout="prev, pager, next"
      :total="total"style=" margin: 15px auto">
    </el-pagination>



    <el-dialog title="顾客信息修改" :visible.sync="centerDiaologVisible" width="800px" center>
      <div class="div2">
        <el-form ref="form" :model="form" label-width="80px" style="width: 100%">
            <el-form-item label="顾客编号">
              <el-input v-model="form.userCode"></el-input>
            </el-form-item>
            <el-form-item label="顾客名称">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form.gender" placeholder="性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input v-model="form.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <el-input v-model="form.e_mail"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">修改</el-button>
            </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getUserList} from "@/api/index.js"
  import {delUserByUserCode} from "@/api/index.js"
  import {updateUser1} from "@/api/index.js"
  export default {
    name: "UserAdmin",
    data() {
      return {
        centerDiaologVisible: false,
        total:'',
        form: {
          id:'',
          userCode: '',
          userName: '',
          userPicture: '',
          gender: '',
          phoneNumber: '',
          password: '',
          address: '',
          e_mail: '',
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
        this.form.userCode = this.tableData[index].userCode
        this.form.userName = this.tableData[index].userName
        this.form.userPicture = this.tableData[index].userPicture
        this.form.gender = this.tableData[index].gender
        this.form.phoneNumber = this.tableData[index].phoneNumber
        this.form.address = this.tableData[index].address
        this.form.password = this.tableData[index].password
        this.form.e_mail = this.tableData[index].e_mail
      },
      handleDelete(index, row) {
        console.log(index, row);
        var userCode = this.tableData[index].userCode;
        let param = new URLSearchParams();
        param.append("userCode",userCode)
        delUserByUserCode(param).then(res=>{
          if(res.data === 1){
            getUserList().then(response=>{
              this.tableData = response.data;
              var data = this.tableData;
              response.data.forEach(function (item, index) {
                if (item.gender === 1){
                  console.log(item.gender)
                  data[index].gender = '男';
                } else {
                  data[index].gender = '女';
                }
              })
            })
          }else{
            alert('删除失败')
          }
        })
      },
      onSubmit() {
        let param = new URLSearchParams();
        param.append("userCode",this.form.userCode)
        param.append("userName",this.form.userName)
        param.append("userPicture",this.form.userPicture)
        if (this.form.gender === '男'){
          param.append("gender",1)
        } else{
          param.append("gender",0)
        }
        param.append("phoneNumber",this.form.phoneNumber)
        param.append("password",this.form.password)
        param.append("address",this.form.address)
        param.append("e_mail",this.form.e_mail)
        updateUser1(param).then(res=>{
          if (res.data) {
            alert('修改成功')
            getUserList().then(response=>{
              this.tableData = response.data;
              var data = this.tableData;
              response.data.forEach(function (item, index) {
                if (item.gender === 1){
                  data[index].gender = '男';
                } else {
                  data[index].gender = '女';
                }
              })
            })
          }
        })
      },
      handleChange(value) {
        console.log(value);
      },
      currentchange(current){
        getUserList(current).then(response=>{

        })
      }
    },
    created(){
      getUserList(1).then(response=>{
        this.tableData = response.data;
        var data = this.tableData;
        this.total = response.total;
        response.data.forEach(function (item, index) {
          if (item.gender === 1){
            data[index].gender = '男';
          } else {
            data[index].gender = '女';
          }
        })
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
