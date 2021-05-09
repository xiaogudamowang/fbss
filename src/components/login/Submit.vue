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
          <el-button @click="register()">注册</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="注册" :visible.sync="centerDiaologVisible" width="500px" center>
        <div class="div2">
          <el-form ref="form" :model="ruleForm" label-width="80px" style="width: 100%;margin: 30px">


              <el-form-item label="用户名" style="width: 80%">
                <el-input type="input"></el-input>
              </el-form-item>
              <el-form-item label="头像地址" style="width: 80%">
                <el-input type="input"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="gender" placeholder="请选择性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系电话" style="width: 80%">
                <el-input type="input"></el-input>
              </el-form-item>
              <el-form-item label="密码" style="width: 80%">
                <el-input type="password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" style="width: 80%">
                <el-input type="password"></el-input>
              </el-form-item>
              <el-form-item label="地址" style="width: 80%">
                <el-input type="input"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱" style="width: 80%">
                <el-input type="input"></el-input>
              </el-form-item>
              <el-form-item label="商店描述" style="width: 80%">
                <el-input type="input"></el-input>
              </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="">修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import {login} from "@/api/index.js"
  import {adminLogin} from "@/api/index.js"
  import {shopLogin} from "@/api/index.js"
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
          centerDiaologVisible: false,
          registerForm:{
            userName:'',
            userPicture:'',
            gender:'',
            phoneNumber:'',
            passWord:'',
            passWord2:'',
            address:'',
            e_mail:''
          },
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
                let param = new URLSearchParams();
                param.append('userName',this.ruleForm.code);
                param.append('password',this.ruleForm.pass);
                login(param).then(
                  res=>{
                    if(res.data === null){
                      alert("账号或密码错误")
                    }else{
                      localStorage.setItem('userInfo',JSON.stringify(res.data));
                      this.$router.push("/index");
                    }
                  }
                )
              } else if(this.ruleForm.resource === '商家'){
                let param = new URLSearchParams();
                param.append('shopCode',this.ruleForm.code);
                param.append('password',this.ruleForm.pass);
                shopLogin(param).then(
                  res=>{
                    console.log(res.data)
                    if(res.data === null){
                      alert("账号或密码错误")
                    }else{
                      localStorage.setItem('shopInfo',JSON.stringify(res.data));
                      this.$router.push("/bookshop");
                    }
                  }
                )
              } else if(this.ruleForm.resource === '管理员'){
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
        },
        register(){
          this.centerDiaologVisible = true;
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
