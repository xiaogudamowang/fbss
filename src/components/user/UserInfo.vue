<template>
  <div class="div1">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="昵称" prop="code">
        <el-input type="input" v-model="ruleForm.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="pass">
        <el-input type="input" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
