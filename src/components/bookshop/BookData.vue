<template>
    <div class="div1">
      <div ref="chart" style="display: flex;flex-wrap: wrap">
        <div style="width:500px;height:500px" id="main1"></div>
        <div style="width:500px;height:500px" id="main2"></div>
        <div style="width:500px;height:500px" id="main3"></div>
        <div style="width:500px;height:500px" id="main4"></div>
      </div>
    </div>
</template>

<script>
  import {getBookTopByShopCode} from '@/api/index.js'
  import {getSortTopByShopCode} from '@/api/index.js'
    export default {
      name: "BookData",
      data () {
        return {
          data: [
          ]
        };
      },
      created() {
        getBookTopByShopCode(JSON.parse(localStorage.getItem('shopInfo')).shopCode).then(res=>{
          // 饼图
          var myChart1 = this.$echarts.init(document.getElementById('main1'));
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: '店铺销售量前五饼图',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              right:'0px'
            },
            series: [
              {
                name: '书籍',
                type: 'pie',
                radius: '50%',
                data : res.data,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart1.setOption(option);

          // 柱状图
          var chartDom2 = document.getElementById('main2');
          var myChart2 = this.$echarts.init(chartDom2);
          var xAxisdata = [];
          var seriesdata = [];
          res.data.forEach(function (item,index) {
            xAxisdata.push(item.name);
            seriesdata.push(item.value);
          })
          var option2;
          option2 = {
            title: {
              text: '店铺销售量前五柱状图',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: xAxisdata,
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel:{
                  show:true,
                  overflow: 'break',
                  width: '80',
                  interval:0,
                  height:'10',
                  lineOverflow:'truncate'
                }
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '购买数量',
                type: 'bar',
                barWidth: '60%',
                data: seriesdata
              }
            ]
          };

          myChart2.setOption(option2);
        })
        getSortTopByShopCode(JSON.parse(localStorage.getItem('shopInfo')).shopCode).then(res=>{
          // 饼图
          var myChart1 = this.$echarts.init(document.getElementById('main3'));
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: '店铺书籍类别饼图',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              right:'0px'
            },
            series: [
              {
                name: '书籍',
                type: 'pie',
                radius: '50%',
                data : res.data,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart1.setOption(option);

          // 柱状图
          var chartDom2 = document.getElementById('main4');
          var myChart2 = this.$echarts.init(chartDom2);
          var xAxisdata = [];
          var seriesdata = [];
          res.data.forEach(function (item,index) {
            xAxisdata.push(item.name);
            seriesdata.push(item.value);
          })
          var option2;
          option2 = {
            title: {
              text: '店铺书籍类别柱状图',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: xAxisdata,
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel:{
                  show:true,
                  overflow: 'break',
                  width: '80',
                  interval:0,
                  height:'10',
                  lineOverflow:'truncate'
                }
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '购买数量',
                type: 'bar',
                barWidth: '60%',
                data: seriesdata
              }
            ]
          };

          myChart2.setOption(option2);
        })
      }
    }

</script>

<style scoped>

</style>
