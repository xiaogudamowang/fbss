<template>
    <div class="div1">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="code">
          <el-input type="password" v-model="ruleForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="顾客"></el-radio>
            <el-radio label="商家"></el-radio>
            <el-radio label="管理员"></el-radio>
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
        name: "Submit",
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
              if (this.ruleForm.resource === '顾客'){
                this.axios.get('http://localhost:8080/static/mock/user.json').then(
                  res=>{
                    localStorage.setItem('userInfo',JSON.stringify(res.data));
                  }
                )
                this.$router.push("/index");
              } else if(this.ruleForm.resource === '商家'){
                this.$router.push("/bookshop");
              } else if(this.ruleForm.resource === '管理员'){
                this.$router.push("/admin");
              } else{
                callback(new Error('跳转错误!'));
              }

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
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
