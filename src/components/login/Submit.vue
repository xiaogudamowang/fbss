<template>
    <div class="div1">
      <span style="margin: 0px 0px 20px 40px;font-size: 40px;color: white">用户登录</span>
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
          <el-button @click="register()">注册</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="注册" :visible.sync="centerDiaologVisible" width="1000px" center>
        <div class="div2">
          <el-form ref="registerForm" :model="registerForm" :rules="redisterrules" label-width="80px" style="width: 100%">
            <div class="div2">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="registerForm.userName"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="phoneNumber">
                <el-input v-model="registerForm.phoneNumber"></el-input>
              </el-form-item>
            </div>
            <div class="div2">
              <el-form-item label="密码" prop="passWord">
                <el-input type="password" v-model="registerForm.passWord"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="passWord2">
                <el-input type="password" v-model="registerForm.passWord2"></el-input>
              </el-form-item>
            </div>
            <div class="div2">
              <el-form-item label="性别" prop="gender">
                <el-select v-model="registerForm.gender" placeholder="请选择性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电子邮箱" prop="e_mail">
                <el-input v-model="registerForm.e_mail"></el-input>
              </el-form-item>
            </div>
            <div class="div2">
              <el-form-item label="地址" prop="address">
                <el-input
                  type="textarea"
                  placeholder="请输入地址"
                  v-model="registerForm.address"
                  maxlength="50"
                  style="width: 660px"
                  show-word-limit
                >
                </el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" @click="registersubmit('registerForm')">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import {login} from "@/api/index.js"
  import {register} from "@/api/index.js"
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
        var validatePass3 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.registerForm.passWord) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          centerDiaologVisible: false,
          registerForm:{
            userName:'',
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
          },
          redisterrules:{
            userName:[
              {required: true, message: '请输入用户名', trigger: 'blur'}
            ],gender:[
              {required: true, message: '请选择性别', trigger: 'blur'}
            ],phoneNumber:[
              {required: true, message: '请输入联系方式', trigger: 'blur'}
            ],passWord:[
              {required: true, message: '请输入密码', trigger: 'blur'}
            ],passWord2:[
              {validator: validatePass3, trigger: 'blur',required: true}
            ],address:[
              {required: true, message: '请输入地址', trigger: 'blur'}
            ],e_mail:[
              {required: true, message: '请输入电子邮箱', trigger: 'blur'}
            ],
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
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

        },
        registersubmit(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let param = new URLSearchParams();
              param.append('userName',this.registerForm.userName);
              param.append('gender',this.registerForm.gender);
              param.append('phoneNumber',this.registerForm.phoneNumber);
              param.append('password',this.registerForm.passWord);
              param.append('password2',this.registerForm.passWord2);
              param.append('address',this.registerForm.address);
              param.append('e_mail',this.registerForm.e_mail);
              register(param).then(res=>{
                alert(res.message)
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
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
