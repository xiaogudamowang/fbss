<template>
  <div class="div1">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="昵称" prop="code">
        <el-input type="input" v-model="ruleForm.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="pass">
        <el-input type="input" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {updateUser} from "@/api/index.js"
    export default {
        name: "UserInfo",
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入昵称'));
          } else {
            if (this.ruleForm.pass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入邮箱'));
          } else {
            callback();
          }
        };
        return {
          ruleForm: {
            code: '',
            pass: '',
            resource: ''
          },
          rules: {
            code: [
              { validator: validatePass, trigger: 'blur' }
            ],
            pass: [
              { validator: validatePass2, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // 提交用户信息的业务
              let param = new URLSearchParams();
              var userInfo = JSON.parse(localStorage.getItem('userInfo'));
              var userCode = userInfo.userCode;
              param.append('userName',this.ruleForm.code);
              param.append('e_mail',this.ruleForm.pass);
              param.append('userCode',userCode);
              updateUser(param).then(res=>{

                if(res.data){
                  userInfo.userName = this.ruleForm.code;
                  userInfo.e_mail = this.ruleForm.pass;
                  localStorage.setItem('userInfo',JSON.stringify(userInfo));
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
        }
      },
      created() {
          this.ruleForm.code = JSON.parse( localStorage.getItem("userInfo")).userName;
          this.ruleForm.pass = JSON.parse( localStorage.getItem("userInfo")).e_mail;
      }
    }
</script>

<style scoped>
  .div1{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  }
</style>
