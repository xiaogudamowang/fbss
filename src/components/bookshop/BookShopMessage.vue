<template>
  <div class="div1">
    <div class="div2">
      <el-form ref="form" :model="form" label-width="80px" style="width: 100%">
        <el-form-item label="书店名称">
          <el-input v-model="form.bookName"></el-input>
        </el-form-item>
        <el-form-item label="书店图片">
          <el-input v-model="form.ISBN"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.src"></el-input>
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input v-model="form.press"></el-input>
        </el-form-item>
        <el-form-item label="书店地址">
          <el-input v-model="form.author"></el-input>
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
    export default {
        name: "BookShopMessage",
      data() {
        return {
          form: {
            bookName: '',
            ISBN: '',
            src: '',
            press: '',
            author: '',
            edition: 1,
            sortCode: 1,
            message: '',
            price: 0.00,
            number: 0
          }
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        },
        handleChange(value) {
          console.log(value);
        }
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
