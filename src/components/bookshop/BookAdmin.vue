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
          prop="ISBN"
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
          width="100">
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
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"style=" margin: 15px auto">
      </el-pagination>
      <el-dialog title="书籍信息修改" :visible.sync="centerDiaologVisible" width="800px" center>
        <div class="div2">
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
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "BookAdmin",
      data() {
        return {
          centerDiaologVisible: false,
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
          },
          tableData: [{
            id: '',
            bookCode: '',
            bookName: '',
            ISBN: '',
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
            number: ''
          },{
            id: '',
            bookCode: '',
            bookName: '',
            ISBN: '',
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
            number: ''
          },{
            id: '',
            bookCode: '',
            bookName: '',
            ISBN: '',
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
            number: ''
          },{
            id: '',
            bookCode: '',
            bookName: '',
            ISBN: '',
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
            number: ''
          },{
            id: '',
            bookCode: '',
            bookName: '',
            ISBN: '',
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
            number: ''
          },{
            id: '',
            bookCode: '',
            bookName: '',
            ISBN: '',
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
            number: ''
          }],
          search: ''
        }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
          this.centerDiaologVisible = true;
          this.form.bookName = this.tableData[index].bookName
          this.form.ISBN = this.tableData[index].ISBN
          this.form.src = this.tableData[index].src
          this.form.press = this.tableData[index].press
          this.form.author = this.tableData[index].author
          this.form.edition = this.tableData[index].edition
          this.form.sortCode = this.tableData[index].sortCode
          this.form.message = this.tableData[index].message
          this.form.price = this.tableData[index].price
          this.form.number = this.tableData[index].number

        },
        handleDelete(index, row) {
          console.log(index, row);
        },
        onSubmit() {
          console.log('submit!');
        },
        handleChange(value) {
          console.log(value);
        }
      },
      created(){
        this.axios.get('http://localhost:8080/static/mock/book.json').then(response=>{
          // this.tableData=response.data;
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
