<template>
  <div class="div1">
    <el-form ref="form" :model="form" label-width="80px" style="width: 100%">
    <div style="display: flex;flex-direction:row;">
      <div class="div2">
        <el-form-item label="书籍名称">
          <el-input v-model="form.bookName"></el-input>
        </el-form-item>
        <el-form-item label="src">
          <ImgCutter v-on:cutDown="cutDown" :sizeChange="false" :cutWidth="200" :cutHeight="200">
            <el-button slot="open">选择图片</el-button>
          </ImgCutter>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="书籍类别">
          <el-select v-model="form.sortCode" placeholder="请选择书籍类别">
            <el-option v-for="(item,index) in tags" :label="item.sortName" :value="item.sortCode" :key="item.sortCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍单价">
          <el-input-number v-model="form.price" :precision="2" :step="0.1" :max="10000"></el-input-number>
        </el-form-item>
        <el-form-item label="书籍库存">
          <el-input-number v-model="form.number" @change="handleChange" :min="1" :max="100000"></el-input-number>
        </el-form-item>
      </div>
      <div class="div2">
        <el-form-item label="ISBN">
          <el-input v-model="form.ISBN"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="form.press"></el-input>
        </el-form-item>
        <el-form-item label="版次">
          <el-input-number v-model="form.edition" @change="handleChange" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="书籍介绍">
          <el-input type="textarea" v-model="form.message" rows="5"></el-input>
        </el-form-item>
      </div>
    </div>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {addBook} from "@/api/index.js"
  import {getSortList} from "@/api/index.js"
  import ImgCutter from 'vue-img-cutter'
  import axios from 'axios';
    export default {
        name: "AddBook",
      components:{
        ImgCutter
      },
      data() {
        return {
          tags: [],
          form: {
            id:'',
            bookName: '',
            ISBN: '',
            src: '',
            press: '',
            author: '',
            edition: 1,
            sortCode: '',
            message: '',
            price: 0.00,
            number: 0,
            createAt: '',
            updateAt: '',
            exist: ''
          }
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
          var shopCode = JSON.parse(localStorage.getItem("shopInfo")).shopCode;
          let param = new URLSearchParams();
          param.append('bookName',this.form.bookName);
          param.append('ISBN',this.form.ISBN);
          param.append('src',this.form.src);
          param.append('press',this.form.press);
          param.append('author',this.form.author);
          param.append('edition',this.form.edition);
          param.append('sortCode',this.form.sortCode);
          param.append('shopCode',shopCode);
          param.append('message',this.form.message);
          param.append('price',this.form.price);
          param.append('number',this.form.number);
          addBook(param).then(res=>{
            if (res.data === 1){
              alert('添加成功')
            }
          })
        },
        handleChange(value) {
          console.log(value);
        },
        cutDown(file){
          console.log(file.file)
          let param = new FormData();
          param.append('file',file.file);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }  //添加请求头
          axios.post('/picTest',param,config)
            .then(response=>{
              this.form.src = 'https://shudianbucket-guangzhou.oss-cn-beijing.aliyuncs.com/'+response.data;
            })
        },
      },
      created() {
        if (JSON.parse(localStorage.getItem('userInfo')).memberTime < 7){
          alert('会员时间还剩'+memberTime+'天，请及时充值。以免影响使用!');
        };
        getSortList().then(res=>{
          this.tags = res.data;
        })
      }
    }
</script>

<style scoped>
  .div1{
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    margin: 60px 0px;
  }
  .div2{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
