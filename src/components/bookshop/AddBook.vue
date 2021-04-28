<template>
  <div class="div1">
    <el-form ref="form" :model="form" label-width="80px" style="width: 100%">
      <div class="div2">
        <el-form-item label="书籍名称">
          <el-input v-model="form.bookName"></el-input>
        </el-form-item>
        <el-form-item label="ISBN">
          <el-input v-model="form.ISBN"></el-input>
        </el-form-item>
      </div>
      <div class="div2">
        <el-form-item label="src">
          <el-input v-model="form.src"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="form.press"></el-input>
        </el-form-item>
      </div>
      <div class="div2">
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="书籍库存">
          <el-input-number v-model="form.edition" @change="handleChange" :min="1" :max="10"></el-input-number>
        </el-form-item>
      </div>
      <div class="div2">
        <el-form-item label="书籍类别">
          <el-select v-model="form.sortCode" placeholder="请选择书籍类别">
            <el-option label="文学" value="1"></el-option>
            <el-option label="科学" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍介绍">
          <el-input type="textarea" v-model="form.message"></el-input>
        </el-form-item>
      </div>
      <div class="div2">
        <el-form-item label="书籍单价">
          <el-input-number v-model="form.price" :precision="2" :step="0.1" :max="10000"></el-input-number>
        </el-form-item>
        <el-form-item label="书籍库存">
          <el-input-number v-model="form.number" @change="handleChange" :min="1" :max="100000"></el-input-number>
        </el-form-item>
      </div>
      <div class="div2">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "AddBook",
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
    width: 100%;
    margin: 100px 0px;
  }
  .div2{
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
</style>
