<template>
    <div>
      <img :src="'https://shudianbucket-guangzhou.oss-cn-beijing.aliyuncs.com/'+pic">
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
    export default {
        name: "UserPicture",
      data(){
        return{
          pic:'123.jpg'
        }
      },
      methods:{
          picTest(response, file, fileList){
            console.log(response)
            this.pic = response;
console.log('https://shudianbucket-guangzhou.oss-cn-beijing.aliyuncs.com/'+this.pic)
          }
      }
    }
</script>

<style scoped>

</style>
