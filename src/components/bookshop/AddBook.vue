<template>
  <div class="div1">
    <el-form ref="form" :model="form" label-width="80px" style="width: 100%" :rules="rules">
    <div style="display: flex;flex-direction:row;">
      <div class="div2">
        <el-form-item label="书籍名称" prop="bookName">
          <el-input v-model="form.bookName"></el-input>
        </el-form-item>
        <el-form-item label="src" prop="src">
          <ImgCutter v-on:cutDown="cutDown" :sizeChange="false" :cutWidth="200" :cutHeight="200">
            <el-button slot="open">选择图片</el-button>
          </ImgCutter>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="书籍类别" prop="sortCode">
          <el-select v-model="form.sortCode" placeholder="请选择书籍类别">
            <el-option v-for="(item,index) in tags" :label="item.sortName" :value="item.sortCode" :key="item.sortCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍单价" prop="price">
          <el-input-number v-model="form.price" :precision="2" :min="0" :step="0.1" :max="10000"></el-input-number>
        </el-form-item>
        <el-form-item label="书籍库存" prop="number">
          <el-input-number v-model="form.number" @change="handleChange" :min="1" :max="100000"></el-input-number>
        </el-form-item>
      </div>
      <div class="div2">
        <el-form-item label="ISBN" prop="ISBN">
          <el-input v-model="form.ISBN"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="press">
          <el-input v-model="form.press"></el-input>
        </el-form-item>
        <el-form-item label="版次" prop="edition">
          <el-input-number v-model="form.edition" @change="handleChange" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="书籍介绍" prop="message">
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
          },
          rules:{
            bookName:[{required: true, message: '请输入书籍名称', trigger: 'blur'}],
            src:[{required: true}],
            price:[{required: true}],
            number:[{required: true}],
            edition:[{required: true}],
            author:[{required: true, message: '请输入作者名称', trigger: 'blur'}],
            sortCode:[{required: true, message: '请选择类别', trigger: 'blur'}],
            ISBN:[{required: true, message: '请输入ISBN码', trigger: 'blur'}],
            press:[{required: true, message: '请输入出版社名称', trigger: 'blur'}],
            message:[{required: true, message: '请输入书籍简介', trigger: 'blur'}]
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
    width: 90%;
    margin-top: 60px;
    padding-right: 20px;
    padding-left: 20px;
  }
  .div2{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
