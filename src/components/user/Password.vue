<template>
    <div class="div1">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="passpass">
          <el-input type="password" v-model="ruleForm.passpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {updPasswordByCode} from '@/api/index.js'
    export default {
        name: "Password",
      data() {
        var checkAge = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('联系电话不能为空'));
          }
          setTimeout(() => {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'));
            } else {
              callback();
            }
          }, 1000);
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePassPass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入旧密码'));
          } else {
            if(value != JSON.parse(localStorage.getItem('userInfo')).password){
              callback(new Error('旧密码错误'));
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm: {
            passpass:'',
            pass: '',
            checkPass: '',
            age: ''
          },
          rules: {
            passpass: [
              { validator: validatePassPass, trigger: 'blur' }
            ],
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            age: [
              { validator: checkAge, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log('11111111111111111');
              let param = new URLSearchParams();
              param.append('userCode',JSON.parse(localStorage.getItem('userInfo')).userCode)
              param.append('password',this.ruleForm.pass);
              param.append('phoneNumber',this.ruleForm.age);
              updPasswordByCode(param).then(res=>{
                if (res.data == 1){
                  alert('修改成功');
                  localStorage.setItem("userInfo","");
                  this.$router.push("/login");
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
          this.ruleForm.age = JSON.parse(localStorage.getItem('userInfo')).phoneNumber.parseInt;
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
