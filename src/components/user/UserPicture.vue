<template>
    <div class="div1">
      <div style="height: 100%">
        <span>当前头像：</span>
        <img :src="'https://shudianbucket-guangzhou.oss-cn-beijing.aliyuncs.com/'+pic" width="100px" height="100px">
      </div>
      <el-upload
        class="upload-demo"
        drag
        action="http://localhost:8888/picTest"
        auto-upload
        :on-success="picTest"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
</template>

<script>
  import {updPicByUserCode} from "@/api/index.js"
  import {login} from "@/api/index.js"
    export default {
        name: "UserPicture",
      data(){
        return{
          pic:''
        }
      },
      methods:{
          picTest(response, file, fileList){
            this.pic = response;
            let param = new URLSearchParams;
            param.append("userPicture",response);
            param.append("userCode",JSON.parse(localStorage.getItem('userInfo')).userCode);
            // 更新用户头像
            updPicByUserCode(param).then(res=>{
              // 获取最新用户信息
              // 更新localStorage
              console.log(res.data);
              localStorage.setItem('userInfo',JSON.stringify(res.data));
            })
          }
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
    justify-content:space-evenly;
  }

</style>
