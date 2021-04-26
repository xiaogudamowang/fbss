<template>
    <div class="div1">
      <div class="div2">
        <div class="div3">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">
              <div style="background: url(http://img3m0.ddimg.cn/83/2/29199440-1_u_17.jpg); width: 300px;height: 300px">
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="div4">
          <div class="div6 divt">文城（余华新书，时隔8年重磅归来，《活着》之后又一精彩力作！限量赠送珍藏余华肖像漫画）</div>
          <div class="divt">余华时隔8年重磅新作！写《活着》的余华又回来了！人生就是自己的往事和他人的序章。关于一个人和他一生的寻找，以及一群人和一个汹涌的年代。精彩过瘾，不负等待！易烊千玺挚爱作家。限量赠送余华珍藏生肖漫画！</div>
          <div class="divt">作者:余华 著 ， 新经典 出品出版社:北京十月文艺出版社出版时间:2021年03月 </div>
          <div class="divt">¥56.10</div>
          <div class="div5">
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
          </div>
        </div>

      </div>

    </div>
</template>

<script>
    export default {
        name: "Book"
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .div1{
    display: flex;
    justify-content: center;
  }

  .div2{
    width: 1080px;
    display: flex;
  }

  .div3{
    width: 280px;
    margin: 10px;
  }
  .div4{
    width: 740px;
    margin: 10px;
  }
  .div5{
    display: flex;
    justify-content: space-evenly;
  }
  .div6{
    color: #F56C6C;
    font-weight:bold;

  }

  .divt{
    margin: 10px 0px 10px 0px;
  }

</style>
