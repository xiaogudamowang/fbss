<template>
    <div class="div1">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin: 40px 0px 0px 0px">
        <el-form-item label="详细地址" prop="code">
          <el-input type="input" v-model="ruleForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="pass">
          <el-input type="input" v-model="ruleForm.postcode" autocomplete="off"></el-input>
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
      <div class="div2" v-for="item in [1,2,3,4,5,6]">
        <div class="div3">
          <div>
            bookName
          </div>
          <div>
            number x price
          </div>
        </div>
        <div>
          shopName
        </div>
        <div class="div3">
          <div>
            state
          </div>
          <div>
            total
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "UserAddress",
      data() {
        var validateAddress = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入地址'));
          } else {
            if (this.ruleForm.pass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePostcode = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入邮编'));
          } else {
            callback();
          }
        };
        var validateName = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入姓名'));
          } else {
            callback();
          }
        };
        var validateTel = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入联系电话'));
          } else {
            callback();
          }
        };
        return {
          ruleForm: {
            address: '',
            postcode: '',
            name: '',
            tel: ''
          },
          rules: {
            address: [
              { validator: validateAddress, trigger: 'blur' }
            ],
            postcode: [
              { validator: validatePostcode, trigger: 'blur' }
            ],
            name: [
              { validator: validateName, trigger: 'blur' }
            ],
            tel: [
              { validator: validateTel, trigger: 'blur' }
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
    flex-direction: column;
  }
  .div2{
    width: 80%;
    border: aqua 1px solid;
    border-radius: 6px;
    height: 100px;
    margin: 0px 20px 10px 40px;
  }
  .div3{
    display: flex;
    justify-content: space-between;
  }
</style>
