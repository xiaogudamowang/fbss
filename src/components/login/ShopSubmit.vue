<template>
  <div class="div1">
    <span style="margin: 0px 0px 20px 40px;font-size: 40px;color: white">商家登录</span>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="code">
        <el-input v-model="ruleForm.code" autocomplete="off" placeholder="账号或店铺名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">充值</el-button>
        <el-button @click="register()">注册</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="centerDiaologVisible2" width="150px" center>
      <img src="http://localhost:8888/alipay/pay?bookCode=16213096370229&userCode=123&number=1" width="100px">
    </el-dialog>
    <el-dialog title="注册" :visible.sync="centerDiaologVisible" width="1000px" center>
      <div class="div2">
        <el-form ref="registerForm" :model="registerForm" :rules="redisterrules" label-width="80px" style="width: 100%">
          <div class="div2">
            <el-form-item label="书店名" prop="shopName">
              <el-input v-model="registerForm.shopName"></el-input>
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
            <el-form-item label="QQ" prop="QQ">
              <el-input v-model="registerForm.QQ"></el-input>
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
                style="width: 180px"
                show-word-limit
              >
              </el-input>
            </el-form-item>
            <el-form-item label="描述" prop="message">
              <el-input
                type="textarea"
                placeholder="请输入地址"
                v-model="registerForm.message"
                maxlength="50"
                style="width: 180px"
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
  import {shopLogin} from "@/api/index.js"
  import {shopRegister} from "@/api/index.js"
  import {updMemberTimeByBookCode} from "@/api/index.js"
  
  export default {
    name: "ShopSubmit",
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
        centerDiaologVisible2: false,
        registerForm:{
          shopName:'',
          phoneNumber:'',
          passWord:'',
          passWord2:'',
          address:'',
          e_mail:'',
          QQ:'',
          message:''
        },
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
        },
        redisterrules:{
          shopName:[
            {required: true, message: '请输入书店名', trigger: 'blur'}
          ],QQ:[
            {required: true, message: '请输入QQ', trigger: 'blur'}
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
          ],message:[
            {required: true, message: '请输入店铺描述', trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let param = new URLSearchParams();
              param.append('shopCode',this.ruleForm.code);
              param.append('password',this.ruleForm.pass);
              shopLogin(param).then(
                res=>{
                  console.log(res.data)
                  if(res.data === null){
                    alert("账号或密码错误")
                  }else{
                    if(res.data.memberTime < 1){
                      alert('会员时间不足，请充值后登陆')
                    }else{
                      localStorage.setItem('shopInfo',JSON.stringify(res.data));
                      this.$router.push("/bookshop");
                    }
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = new URLSearchParams();
            param.append('shopCode',this.ruleForm.code);
            param.append('password',this.ruleForm.pass);
            shopLogin(param).then(
              res=>{
                console.log(res.data)
                if(res.data === null){
                  alert("账号或密码错误")
                }else{
                  //弹出二维码窗口
                  this.centerDiaologVisible2 = true;
                  //会员天数加30
                  let param1 = new URLSearchParams();
                  param1.append('shopCode',this.ruleForm.code);
                  updMemberTimeByBookCode(param1).then(res=>{
                    if (res.data == 1){
                      console.log(res.message)
                    } else{
                      console.log('充值失败')
                    }
                  })
                }
              }
            )
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      register(){
        this.centerDiaologVisible = true;

      },
      registersubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = new URLSearchParams();
            param.append('shopName',this.registerForm.shopName);
            param.append('QQ',this.registerForm.QQ);
            param.append('phoneNumber',this.registerForm.phoneNumber);
            param.append('password',this.registerForm.passWord);
            param.append('password2',this.registerForm.passWord2);
            param.append('address',this.registerForm.address);
            param.append('e_mail',this.registerForm.e_mail);
            param.append('message',this.registerForm.message);
            shopRegister(param).then(res=>{
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

