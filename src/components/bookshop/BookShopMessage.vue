<template>
  <div class="div1">
    <div class="div2">
      <el-form ref="form" :model="form" label-width="80px" style="width: 100%">
        <el-form-item label="书店名称">
          <el-input v-model="form.shopName"></el-input>
        </el-form-item>
        <el-form-item label="书店图片">
          <el-input v-model="form.shopPicture"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input v-model="form.e_mail"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="form.qq"></el-input>
        </el-form-item>
        <el-form-item label="书店地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="书店介绍">
          <el-input type="textarea" v-model="form.message"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {updBookShop} from "@/api/index.js"
    export default {
        name: "BookShopMessage",
      data() {
        return {
          form: {
            id:'',
            shopCode: '',
            shopName: '',
            shopPicture: '',
            phoneNumber: '',
            password: '',
            e_mail: '',
            address: '',
            message: '',
            qq: '',
            createAt: '',
            updateAt: '',
            exist: ''
          }
        }
      },
      methods: {
        onSubmit() {
          let param = new URLSearchParams();
          param.append("shopCode",this.form.shopCode)
          param.append("shopName",this.form.shopName)
          param.append("shopPicture",this.form.shopPicture)
          param.append("phoneNumber",this.form.phoneNumber)
          param.append("e_mail",this.form.e_mail)
          param.append("address",this.form.address)
          param.append("message",this.form.message)
          param.append("QQ",this.form.qq)
          updBookShop(param).then(res=>{
            console.log(res.data);
            if (res.data === 1){
              alert('修改成功');
              this.$router.push("/login");
            }else{
              alert('修改失败');
            }
          })
        },
        handleChange(value) {
          console.log(value);
        }
      },
      created() {
          this.form.id = JSON.parse(localStorage.getItem("shopInfo")).id;
          this.form.shopCode = JSON.parse(localStorage.getItem("shopInfo")).shopCode;
          this.form.shopName = JSON.parse(localStorage.getItem("shopInfo")).shopName;
          this.form.shopPicture = JSON.parse(localStorage.getItem("shopInfo")).shopPicture;
          this.form.phoneNumber = JSON.parse(localStorage.getItem("shopInfo")).phoneNumber;
          this.form.password = JSON.parse(localStorage.getItem("shopInfo")).password;
          this.form.e_mail = JSON.parse(localStorage.getItem("shopInfo")).e_mail;
          this.form.address = JSON.parse(localStorage.getItem("shopInfo")).address;
          this.form.message = JSON.parse(localStorage.getItem("shopInfo")).message;
          this.form.qq = JSON.parse(localStorage.getItem("shopInfo")).qq;
          this.form.createAt = JSON.parse(localStorage.getItem("shopInfo")).createAt;
          this.form.updateAt = JSON.parse(localStorage.getItem("shopInfo")).updateAt;
          this.form.exist = JSON.parse(localStorage.getItem("shopInfo")).exist;
      }
    }
</script>

<style scoped>
  .div1{
    display: flex;
    justify-content: center;
  }
  .div2{
    width: 500px;
    margin: 50px;
  }
</style>
