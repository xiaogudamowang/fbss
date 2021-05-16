<template>
    <div class="div1">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin: 40px 0px 0px 0px">
        <el-form-item label="详细地址" prop="code">
          <el-input type="input" v-model="ruleForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名">
          <el-input type="input" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input type="input" v-model="ruleForm.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">新增</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="div2" v-for="(item,index) in addrs">
        <div class="div5">
          <div style="display: flex; flex-direction:row">
            <div>{{item.message}}</div>
            <div v-if="item.addCode === moren" class="div4">[默认]</div>
          </div>
          <div>{{item.name}}</div>
          <div>{{item.tel}}</div>
        </div>
          <div class="div3">
            <el-button size="mini" @click="set(item.addCode)">设置默认</el-button>
            <el-button size="mini" @click="edit(index)">编辑</el-button>
            <el-button size="mini" @click="del(item.addCode)">删除</el-button>
          </div>
      </div>
      <el-dialog title="注册" :visible.sync="centerDiaologVisible" width="400px" center>
        <el-form :model="edi" :rules="rules" ref="edi">
          <el-form-item label="地址" prop="address">
            <el-input type="textarea" show-word-limit maxlength="50" v-model="edi.address"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="edi.name"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input v-model="edi.tel"></el-input>
          </el-form-item>
          <el-button type="primary" @click="edisub('edi')">修改</el-button>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
  import {getAddressList} from "@/api/index.js"
  import {addAddress} from "@/api/index.js"
  import {setAddress} from "@/api/index.js"
  import {delAddress} from "@/api/index.js"
  import {updadd} from "@/api/index.js"
    export default {
        name: "UserAddress",
      data() {
        return {
          ruleForm: {
            address: '',
            name: '',
            tel: ''
          },
          moren: '',
          addrs:[],
          centerDiaologVisible:false,
          edi:{
            addCode:"",
            address: '',
            name: '',
            tel: ''
          },
          rules:{
            address:[
              {required:true, message: '请输入地址', trigger: 'blur'}
            ],name:[
              {required:true, message: '请输入收件人姓名', trigger: 'blur'}
            ],tel:[
              {required:true, message: '请输入联系方式', trigger: 'blur'}
            ]
          }
        };
      },
      methods: {
        set(addCode){
          var userCode = JSON.parse(localStorage.getItem("userInfo")).userCode;
          let param = new URLSearchParams();
          param.append('addCode',addCode);
          param.append('userCode',userCode);
          setAddress(param).then(res=>{
            if(res.data === 1){
              getAddressList(userCode).then(res=>{
                this.addrs = res.data;
              })
              this.moren = addCode;
              alert('设置成功')
            }else {
              alert('设置失败')
            }
          })
        },
        del(addCode){
          var userCode = JSON.parse(localStorage.getItem("userInfo")).userCode;
          if(addCode === this.moren){
            alert('不能删除默认地址')
          } else {
            let param = new URLSearchParams();
            param.append('addCode',addCode);
            delAddress(param).then(res=>{
              if(res.data === 1){
                getAddressList(userCode).then(res=>{
                  this.addrs = res.data;
                })
                alert('删除成功')
              }else{
                alert('删除失败')
              }
            })
          }
        },
        edit(index){
          this.centerDiaologVisible = true;
          this.edi.addCode = this.addrs[index].addCode;
          this.edi.address = this.addrs[index].message;
          this.edi.name = this.addrs[index].name;
          this.edi.tel = this.addrs[index].tel;
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // 提交用户信息的业务
              var userInfo = JSON.parse(localStorage.getItem('userInfo'));
              var userCode = userInfo.userCode;
              let param = new URLSearchParams();
              param.append('message',this.ruleForm.address);
              param.append('name',this.ruleForm.name);
              param.append('tel',this.ruleForm.tel);
              param.append('userCode',userCode);
              addAddress(param).then(res=>{
                if(res.data === 1){
                  alert('添加成功')
                  var userCode = JSON.parse(localStorage.getItem("userInfo")).userCode;
                  this.moren = JSON.parse(localStorage.getItem("userInfo")).address;
                  getAddressList(userCode).then(res=>{
                    this.addrs = res.data;
                  })
                }else {
                  alert('添加失败')
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        edisub(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // 修改过程
              let param = new URLSearchParams();
              param.append("addCode",this.edi.addCode);
              param.append("message",this.edi.address);
              param.append("name",this.edi.name);
              param.append("tel",this.edi.tel);
              updadd(param).then(res=>{
                alert(res.message);
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      },
      created() {
        var userCode = JSON.parse(localStorage.getItem("userInfo")).userCode;
        this.moren = JSON.parse(localStorage.getItem("userInfo")).address;
        getAddressList(userCode).then(res=>{
          this.addrs = res.data;
        })
      }
    }
</script>

<style scoped>
  .div1{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .div2{
    width: 80%;
    border: aqua 1px solid;
    border-radius: 6px;
    margin: 0px 20px 10px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .div3{
    display: flex;
    justify-content: space-between;
    margin: 0px 10px;
  }
  .div4{
    font-size: 10px;
    color: red;
  }
  .div5{
    display: flex;
    flex-direction: column;
    margin: 0px 10px;
  }
</style>
