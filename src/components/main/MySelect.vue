<template>
  <div class="div1">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.user" class="div2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "MySelect",
      data() {
        return {
          formInline: {
            user: '',
            region: ''
          }
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        }
      }
    }
</script>

<style scoped>
  .div1{
    width: 500px;
  }

  .div2{
    width: 400px;
  }
</style>
