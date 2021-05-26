<template>
    <div style="width: 100%">
      <el-button @click="drawer = true" style="margin-left: 16px;" size="medium">
        类别管理
      </el-button>
      <!--书籍管理-->
      <div style="width: 100%">
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%;margin-left: 16px;"
          height="500">
          <el-table-column
            fixed
            label="书籍名称"
            prop="bookName"
            width="400">
          </el-table-column>
          <el-table-column
            label="ISBN"
            prop="isbn"
            width="200">
          </el-table-column>
          <el-table-column
            label="作者"
            prop="author"
            width="200">
          </el-table-column>
          <el-table-column
            label="类别"
            prop="sortName"
            width="200">
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
            <el-form ref="form" :model="form" label-width="80px" :rules="rules" style="width: 100%">
              <div class="div2">
                <el-form-item label="书籍名称" prop="bookName">
                  <el-input v-model="form.bookName"></el-input>
                </el-form-item>
                <el-form-item label="ISBN" prop="isbn">
                  <el-input v-model="form.isbn"></el-input>
                </el-form-item>
              </div>
              <div class="div2">
                <el-form-item label="src" prop="press">
                  <img :src="form.src" width="60px">
                  <ImgCutter v-on:cutDown="cutDown" :sizeChange="false" :cutWidth="200" :cutHeight="200">
                    <el-button slot="open">选择图片</el-button>
                  </ImgCutter>
                </el-form-item>
                <el-form-item label="出版社" prop="press">
                  <el-input v-model="form.press"></el-input>
                </el-form-item>
              </div>
              <div class="div2">
                <el-form-item label="作者" prop="author">
                  <el-input v-model="form.author"></el-input>
                </el-form-item>
                <el-form-item label="书籍库存" prop="edition">
                  <el-input-number v-model="form.edition" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item>
              </div>
              <div class="div2">
                <el-form-item label="书籍类别" prop="sortCode">
                  <el-select v-model="form.sortCode" placeholder="请选择书籍类别">
                    <el-option v-for="(item,index) in tags" :label="item.sortName" :value="item.sortCode" :key="item.sortCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="书籍介绍" prop="message">
                  <el-input type="textarea" v-model="form.message"></el-input>
                </el-form-item>
              </div>
              <div class="div2">
                <el-form-item label="书籍单价" prop="price">
                  <el-input-number v-model="form.price" :precision="2" :step="0.1" :max="10000"></el-input-number>
                </el-form-item>
                <el-form-item label="书籍库存" prop="number">
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
      <!--类别管理-->
      <el-drawer
        title="类别管理"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="handleClose">
        <div style="margin-left:20px;margin-right: 20px ">
          <!--添加类别-->
          <el-form ref="sorts" :model="sorts" style="display: flex;" :rules="rl">
            <el-form-item style="margin-right: 10px" prop="sort">
              <el-input maxlength="5" v-model="sorts.sort" minlength="2" show-word-limit clearable></el-input>
            </el-form-item>
            <el-form-item >
              <el-button @click="submitSort('sorts')">添加</el-button>
            </el-form-item>
          </el-form>
          <!--枚举类别-->
          <div style="display: flex;flex-wrap: wrap;">
            <el-tag
              v-for="(tag,index) in tags"
              :key="tag.name"
              closable
              effect="plain"
              @close="deleteSort(tag)"
              style="margin: 2px">
              {{tag.sortName}}
            </el-tag>
          </div>
        </div>
      </el-drawer>

    </div>
</template>

<script>
  import {getBookList} from "@/api/index.js"
  import {updBook} from "@/api/index.js"
  import {delBookByCode} from "@/api/index.js"
  import {getSortList} from "@/api/index.js"
  import {addSort} from "@/api/index.js"
  import {delSort} from "@/api/index.js"
  import ImgCutter from 'vue-img-cutter'
  import axios from 'axios';

    export default {
        name: "BookAdmin2",
      components:{
        ImgCutter
      },
      data() {
        var validator1 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入类别'));
          } else {
            callback();
          }
        };
          return {
            tags: [],
            sorts: {
              sort: ''
            },
            centerDiaologVisible: false,
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
            tableData: [],
            search: '',
            total: 0,
            drawer: false,
            rules: {
              bookName: [
                { required: true, message: '请输入书籍名称', trigger: 'blur' },
              ],
              isbn: [
                { required: true, message: '请输入书籍ISBN', trigger: 'change' }
              ],
              press: [
                { required: true, message: '请输入出版社', trigger: 'change' }
              ],
              author: [
                { required: true, message: '请输入作者', trigger: 'change' }
              ],
              edition: [
                { required: true, message: '请输入版次', trigger: 'change' }
              ],
              sortCode: [
                { required: true, message: '请选择书籍类别', trigger: 'change' }
              ],
              message: [
                { required: true, message: '请填写书籍介绍', trigger: 'blur' }
              ],
              price: [
                { required: true, message: '请输入书籍单价', trigger: 'blur' }
              ],
              number: [
                { required: true, message: '请输入数量', trigger: 'blur' }
              ]
            },
            rl:{sort: [{trigger:'blur',validator:validator1}]}
          };
        },
      methods:{
        handleEdit(index, row) {
          console.log(index, row);
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
              alert('删除失败')
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
              getBookListByShopCode(JSON.parse(localStorage.getItem("shopInfo")).shopCode).then(response=>{
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
          getBookList(current).then(response=>{
            // const aaa={...response.data,price:response.data.price.fixed(2)}
            this.tableData=response.data
            this.total = response.total;
          })
        },
        submitSort(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let param = new URLSearchParams();
              param.append('sortName',this.sorts.sort);
              addSort(param).then(res=>{
                if(res.data == 1){
                  this.$message('添加成功');
                  getSortList().then(res=>{
                    this.tags = res.data;
                  })
                }else{
                  this.$message('添加失败');
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        deleteSort(tag){
          var index = this.tags.indexOf(tag)
          console.log(index)
          this.tags.splice(index, 1);
          let param = new URLSearchParams();
          param.append('sortCode',tag.sortCode);
          delSort(param).then(res=>{
            if(res.data == 1){
              this.$message('删除成功');
            }else {
              this.$message('删除失败');
            }
          });
        }
      },
      created(){
        getBookList(1).then(response=>{
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

</style>
