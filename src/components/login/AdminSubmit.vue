<template>
  <div class="div1">
    <span style="margin: 0px 0px 20px 40px;font-size: 40px;color: white">管理员登录</span>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="code">
        <el-input type="password" v-model="ruleForm.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {adminLogin} from "@/api/index.js"
  import {register} from "@/api/index.js"
  export default {
    name: "AdminSubmit",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          if (this.ruleForm.pass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          code: '',
          pass: ''
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
              let param = new URLSearchParams();
              param.append('adminName',this.ruleForm.code);
              param.append('password',this.ruleForm.pass);
              adminLogin(param).then(
                res=>{
                  if(res.data === null){
                    alert("账号或密码错误")
                  }else{
                    localStorage.setItem('shopInfo',JSON.stringify(res.data));
                    this.$router.push("/admin");
                  }
                }
              )
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .div1{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .div2{
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
</style>
