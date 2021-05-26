<template>
    <div class="div1">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        height="500">
        <el-table-column
          fixed
          label="书籍名称"
          prop="bookName"
          width="200">
        </el-table-column>
        <el-table-column
          label="ISBN"
          prop="isbn"
          width="150">
        </el-table-column>
        <el-table-column
          label="出版社"
          prop="press"
          width="250">
        </el-table-column>
        <el-table-column
          label="作者"
          prop="author"
          width="150">
        </el-table-column>
        <el-table-column
          label="版次"
          prop="edition"
          width="100">
        </el-table-column>
        <el-table-column
          label="类别"
          prop="sortName"
          width="100">
        </el-table-column>
        <el-table-column
          label="价格"
          prop="price"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="right"
          width="200px"
          fixed="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="20"
        layout="prev, pager, next"
        @current-change="currentchange"
        :total="total" style=" margin: 15px auto">
      </el-pagination>
      <el-dialog title="书籍信息修改" :visible.sync="centerDiaologVisible" width="800px" center>
        <div class="div2">
          <el-form ref="form" :model="form" label-width="80px" style="width: 100%">
            <div class="div2">
              <el-form-item label="书籍名称">
                <el-input v-model="form.bookName"></el-input>
              </el-form-item>
              <el-form-item label="ISBN">
                <el-input v-model="form.isbn"></el-input>
              </el-form-item>
            </div>
            <div class="div2">
              <el-form-item label="src">
                <ImgCutter v-on:cutDown="cutDown" :sizeChange="false" :cutWidth="200" :cutHeight="200">
                  <el-button slot="open">选择图片</el-button>
                </ImgCutter>
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
                  <el-option v-for="(item,index) in tags" :label="item.sortName" :value="item.sortCode" :key="item.sortCode"></el-option>
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
                <el-button type="primary" @click="onSubmit">修改</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import {getBookListByShopCode} from "@/api/index.js"
  import {updBook} from "@/api/index.js"
  import {delBookByCode} from "@/api/index.js"
  import {getSortList} from "@/api/index.js"
  import ImgCutter from 'vue-img-cutter'
  import axios from 'axios';
    export default {
        name: "BookAdmin",
      components:{
        ImgCutter
      },
      data() {
        return {
          tags: [],
          centerDiaologVisible: false,
          current :0,
          form: {
            id:'',
            bookCode:'',
            bookName: '',
            ISBN: '',
            src: '',
            press: '',
            author: '',
            edition: 1,
            sortCode: 1,
            message: '',
            price: 0.00,
            number: 0,
            createAt: '',
            updateAt: '',
            exist: ''
          },
          tableData: [{
            id: '',
            bookCode: '',
            bookName: '',
            isbn: '',
            src: '',
            press: '',
            author: '',
            edition: '',
            shopNumber: '',
            sortCode: '',
            sortName: '',
            shopCode: '',
            message: '',
            price: '',
            number: '',
            createAt: '',
            updateAt: '',
            exist: ''
          },{
            id: '',
            bookCode: '',
            bookName: '',
            isbn: '',
            src: '',
            press: '',
            author: '',
            edition: '',
            shopNumber: '',
            sortCode: '',
            sortName: '',
            shopCode: '',
            message: '',
            price: '',
            number: '',
            createAt: '',
            updateAt: '',
            exist: ''
          },{
            id: '',
            bookCode: '',
            bookName: '',
            isbn: '',
            src: '',
            press: '',
            author: '',
            edition: '',
            shopNumber: '',
            sortCode: '',
            sortName: '',
            shopCode: '',
            message: '',
            price: '',
            number: '',
            createAt: '',
            updateAt: '',
            exist: ''
          },{
            id: '',
            bookCode: '',
            bookName: '',
            isbn: '',
            src: '',
            press: '',
            author: '',
            edition: '',
            shopNumber: '',
            sortCode: '',
            sortName: '',
            shopCode: '',
            message: '',
            price: '',
            number: '',
            createAt: '',
            updateAt: '',
            exist: ''
          },{
            id: '',
            bookCode: '',
            bookName: '',
            isbn: '',
            src: '',
            press: '',
            author: '',
            edition: '',
            shopNumber: '',
            sortCode: '',
            sortName: '',
            shopCode: '',
            message: '',
            price: '',
            number: '',
            createAt: '',
            updateAt: '',
            exist: ''
          },{
            id: '',
            bookCode: '',
            bookName: '',
            isbn: '',
            src: '',
            press: '',
            author: '',
            edition: '',
            shopNumber: '',
            sortCode: '',
            sortName: '',
            shopCode: '',
            message: '',
            price: '',
            number: '',
            createAt: '',
            updateAt: '',
            exist: ''
          }],
          search: '',
          total:0
        }
      },
      methods: {
        handleEdit(index, row) {
          this.centerDiaologVisible = true;
          this.form.bookName = this.tableData[index].bookName
          this.form.bookCode = this.tableData[index].bookCode
          this.form.isbn = this.tableData[index].isbn
          this.form.src = this.tableData[index].src
          this.form.press = this.tableData[index].press
          this.form.author = this.tableData[index].author
          this.form.edition = this.tableData[index].edition
          this.form.sortCode = this.tableData[index].sortCode
          this.form.message = this.tableData[index].message
          this.form.price = this.tableData[index].price
          this.form.number = this.tableData[index].number
        },
        cutDown(file){
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
        handleDelete(index, row) {
          var bookCode = this.tableData[index].bookCode
          var shopCode = JSON.parse(localStorage.getItem("shopInfo")).shopCode;
          let param = new URLSearchParams();
          param.append("shopCode",shopCode);
          param.append("bookCode",bookCode);
          delBookByCode(param).then(res=>{
            if (res.data === 1){
              getBookListByShopCode(JSON.parse(localStorage.getItem("shopInfo")).shopCode).then(response=>{
                this.tableData=response.data
              })
            } else{
              this.$message('删除失败')
            }
          })
        },
        onSubmit() {
          console.log('submit!');
          var shopCode = JSON.parse(localStorage.getItem("shopInfo")).shopCode;
          let param = new URLSearchParams();
          param.append("shopCode",shopCode);
          param.append("bookCode",this.form.bookCode);
          param.append("bookName",this.form.bookName);
          param.append("ISBN",this.form.isbn);
          param.append("src",this.form.src);
          param.append("press",this.form.press);
          param.append("author",this.form.author);
          param.append("edition",this.form.edition);
          param.append("sortCode",this.form.sortCode);
          param.append("message",this.form.message);
          param.append("price",this.form.price);
          param.append("number",this.form.number);
          updBook(param).then(res=>{
            if(res.data === 1){
              this.$message('修改成功')
              getBookListByShopCode(JSON.parse(localStorage.getItem("shopInfo")).shopCode,this.current).then(response=>{
                // const aaa={...response.data,price:response.data.price.fixed(2)}
                this.tableData=response.data
              })
            }else {
              this.$message('修改失败')
            }
          })
        },
        handleChange(value) {
          console.log(value);
        },
        currentchange(current){
          this.current = current;
          getBookListByShopCode(JSON.parse(localStorage.getItem("shopInfo")).shopCode,current).then(response=>{
            // const aaa={...response.data,price:response.data.price.fixed(2)}
            this.tableData=response.data
            this.total = response.total;
          })
        }
      },
      created(){
        getBookListByShopCode(JSON.parse(localStorage.getItem("shopInfo")).shopCode,1).then(response=>{
          // const aaa={...response.data,price:response.data.price.fixed(2)}
          this.tableData=response.data
          this.total = response.total;
        });
        getSortList().then(res=>{
          this.tags = res.data;
        })
      }
    }
</script>

<style scoped>
  .div1{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 10px 0px;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 400px;
  }
  .div2{
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
</style>
