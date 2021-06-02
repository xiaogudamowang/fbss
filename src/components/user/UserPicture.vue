<template>
    <div class="div1">
      <div>
        <span>当前头像：</span>
        <img :src="'https://shudianbucket-guangzhou.oss-cn-beijing.aliyuncs.com/'+pic" width="200px" height="200px">
      </div>
      <div style="padding-top: 160px;padding-left: 10px">
        <ImgCutter v-on:cutDown="cutDown" :sizeChange="false" :cutWidth="200" :cutHeight="200">
          <el-button slot="open" type="primary" plain>选择图片</el-button>
        </ImgCutter>
      </div>
    </div>
</template>

<script>
  import {updPicByUserCode} from "@/api/index.js"
  import {login} from "@/api/index.js"
  import ImgCutter from 'vue-img-cutter'
  import axios from 'axios';
    export default {
        name: "UserPicture",
      components:{
        ImgCutter
      },
      data(){
        return{
          pic:''
        }
      },
      methods:{
          picTest(response, file, fileList){
            this.pic = response;

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
              this.pic = response.data;
              // var info = JSON.parse(localStorage.getItem('userInfo'))
              // info.userPicture = this.pic;
              // localStorage.setItem('userInfo',JSON.stringify(info));
              let param = new URLSearchParams;
              param.append("userPicture",this.pic);
              param.append("userCode",JSON.parse(localStorage.getItem('userInfo')).userCode);
              // 更新用户头像
              updPicByUserCode(param).then(res=>{
                // 获取最新用户信息
                // 更新localStorage
                console.log(res.data)
                if(res.code == 401){
                  alert(res.msg);
                  this.$router.push('/login');
                }
                localStorage.setItem('userInfo',JSON.stringify(res.data));
              })
            })
        },
      },
      created() {
          this.pic = JSON.parse(localStorage.getItem('userInfo')).userPicture
      }
    }
</script>

<style scoped>
  .div1{
    display: flex;
    flex-direction: row;
    justify-content:center;
    padding-top: 100px;
  }

</style>
