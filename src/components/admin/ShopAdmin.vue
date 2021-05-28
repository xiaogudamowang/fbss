<template>
  <div class="div1">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;;margin-left: 16px;">
      <el-table-column
        fixed
        label="商店编号"
        prop="shopCode"
        width="200">
      </el-table-column>
      <el-table-column
        label="商店名称"
        prop="shopName"
        width="250">
      </el-table-column>
      <el-table-column
        label="联系方式"
        prop="phoneNumber"
        width="200">
      </el-table-column>
      <el-table-column
        label="电子邮箱"
        prop="e_mail"
        width="250">
      </el-table-column>
      <el-table-column
        align="right"
        width="250px"
        fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button @click="dingdan(scope.$index, scope.row)" size="mini">
            订单
          </el-button>
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
    <!--分页-->
    <el-pagination
      background
      :page-size="20"
      @current-change="currentchange"
      layout="prev, pager, next"
      :total="total"style=" margin: 15px auto">
    </el-pagination>
    <!--弹窗，信息修改-->
    <el-dialog title="商店信息修改" :visible.sync="centerDiaologVisible" width="800px" center>
      <div class="div2">
        <el-form ref="form" :model="form" label-width="80px" style="width: 100%">
          <div class="div2">
            <el-form-item label="商店编号" prop="shopCode">
              <el-input v-model="form.shopCode" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="商店名称" prop="shopName">
              <el-input v-model="form.shopName"></el-input>
            </el-form-item>
          </div>
          <div class="div2">
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input v-model="form.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
          </div>
          <div class="div2">
            <el-form-item label="电子邮箱" prop="e_mail">
              <el-input v-model="form.e_mail"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </div>
          <div class="div2">
            <el-form-item label="会员时间" prop="memberTime">
              <el-input v-model="form.memberTime"></el-input>
            </el-form-item>
            <el-form-item label="QQ" prop="QQ">
              <el-input v-model="form.QQ"></el-input>
            </el-form-item>
          </div>
          <div class="div2">
            <el-form-item label="商店描述" style="width: 640px" prop="message">
              <el-input type="textarea" v-model="form.message"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      size="1000px">
      <el-table
        :data="tableData1"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单编码" prop="orderCode">
                <span>{{ props.row.orderCode }}</span>
              </el-form-item>
              <el-form-item label="书籍编码" prop="bookCode">
                <span>{{ props.row.bookCode }}</span>
              </el-form-item>
              <el-form-item label="书籍名称" prop="bookName">
                <span>{{ props.row.bookName }}</span>
              </el-form-item>
              <el-form-item label="数量" prop="number">
                <span>{{ props.row.number }}</span>
              </el-form-item>
              <el-form-item label="单价" prop="price">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="用户编码" prop="userCode">
                <span>{{ props.row.userCode }}</span>
              </el-form-item>
              <el-form-item label="订单状态" prop="state">
                <span>{{ props.row.state }}</span>
              </el-form-item>
              <el-form-item label="总价" prop="total">
                <span>{{ props.row.total }}</span>
              </el-form-item>
              <el-form-item label="商家付款码">
                <img :src="shop.shopPicture" width="100px">
              </el-form-item>
              <el-form-item label="操作" v-if="props.row.state ==='已收货'">
                <el-button size="small" type="primary" plain @click="dingdanwancheng(props.row.orderCode)">订单完成</el-button>
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="订单编号"
          prop="orderCode">
        </el-table-column>
        <el-table-column
          label="书籍名称"
          prop="bookName">
        </el-table-column>
        <el-table-column
          label="顾客编号"
          prop="userCode">
        </el-table-column>
        <el-table-column
          prop="state"
          label="标签"
          width="100"
          :filters="orderState"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="stateType(scope.row.state)"
              disable-transitions>{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
  import {getShopList} from "@/api/index.js"
  import {delShopByShopCode} from "@/api/index.js"
  import {updStateByOrderCode} from "@/api/index.js"
  import {getOrderListByShopCode} from "@/api/index.js"
  export default {
    name: "ShopAdmin",
    data() {
      return {
        tableData: [],
        orderState:[{ text: '已下单', value: '已下单' }, { text: '申请退货', value: '申请退货' }, { text: '已收货', value: '已收货' }, { text: '退货完成', value: '退货完成' }],
        drawer: false,
        centerDiaologVisible: false,
        form: {
          id: '',
          shopCode: '',
          shopName: '',
          shopPicture: '',
          phoneNumber: '',
          password: '',
          e_mail: '',
          address: '',
          memberTime: '',
          QQ: '',
          message: '',
          createAt: '',
          updateAt: '',
          exist: ''
        },
        tableData1: [],
        shop:{},
        search: '',
        total:0
      }
    },
    computed:{
      stateType: function () {
        return function (state) {
          var type = 'primary';
          if (state === '已收货'){
            type = 'danger';
          }else if(state === '订单完成'){
            type = 'success';
          }else if(state === '申请退款'){
            type = 'warning';
          }else if(state === '退款完成'){
            type = 'success';
          }else if(state === '已下单'){
            type = 'info';
          }
          return type;
        }
      }
    },
    methods: {
      filterTag(value, row) {
        return row.state === value;
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.centerDiaologVisible = true;
        this.form.shopCode = this.tableData[index].shopCode
        this.form.shopName = this.tableData[index].shopName
        this.form.shopPicture = this.tableData[index].shopPicture
        this.form.phoneNumber = this.tableData[index].phoneNumber
        this.form.password = this.tableData[index].password
        this.form.e_mail = this.tableData[index].e_mail
        this.form.address = this.tableData[index].address
        this.form.memberTime = this.tableData[index].memberTime
        this.form.QQ = this.tableData[index].qq
        this.form.message = this.tableData[index].message

      },
      handleDelete(index, row) {
        console.log(index, row);
        var shopCode = this.tableData[index].shopCode;
        let param = new URLSearchParams();
        param.append("shopCode",shopCode)
        delShopByShopCode(param).then(res=>{
          if(res.data === 1){
            getShopList().then(response=>{
              this.tableData = response.data;
            })
          }else{
            alert('删除失败')
          }
        })
      },
      onSubmit() {
        let param = new URLSearchParams();
        param.append("shopCode",this.form.shopCode)
        param.append("shopName",this.form.shopName)
        param.append("shopPicture",this.form.shopPicture)
        param.append("phoneNumber",this.form.phoneNumber)
        param.append("password",this.form.password)
        param.append("e_mail",this.form.e_mail)
        param.append("address",this.form.address)
        param.append("memberTime",this.form.memberTime)
        param.append("QQ",this.form.QQ)
        param.append("message",this.form.message)
        updShopByShopCode(param).then(res=>{
          if(res.data){
            alert('修改成功');
            getShopList().then(response=>{
              this.tableData = response.data;
            })
          }else {
            alert('修改失败')
          }
        })

      },
      handleChange(value) {
        console.log(value);
      },
      currentchange(current){
        getShopList(current).then(response=>{
          this.tableData = response.data;
          this.total = response.total;
        })
      },
      dingdan(index, row){
        this.drawer = true;
        this.shop = row
        getOrderListByShopCode(row.shopCode).then(res=>{
          this.tableData1 = res.data;
        })
      },
      dingdanwancheng(orderCode){
        let param = new URLSearchParams();
        param.append('orderCode',orderCode);
        param.append('state','订单完成');
        updStateByOrderCode(param).then(res=>{
          this.$message('订单完成');
          getOrderListByShopCode(this.shop.shopCode).then(res=>{
            this.tableData1 = res.data;
          })
        })

      }
    },
    created(){
      getShopList(0).then(response=>{
        this.tableData = response.data;
        this.total = response.total;
      });
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
