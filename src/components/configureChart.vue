<template>
    <div class="container">
      <div class="left">
        <div class="chart">
<!--          有数据 渲染图表-->
          <div class="chart_content" v-show="show">
            <chart :specify="'true'" />
          </div>
<!--          无数据 渲染提示-->
          <div class="chart_content" v-show="!show">
            <br><br><br><br>暂无数据，请选择合适的字段和图表
          </div>
        </div>
        <div class="box"></div>
        <div class="table">
<!--          表格 列名-->
          <div class="row">
            <div v-for="(item,index) in columnName" :key="index" class="row_con">
              <el-input v-model="columnName[index]" />
            </div>
          </div>
<!--          表格内容 可编辑-->
          <div v-for="(item,index) in seriesData" :key="index">
            <div class="row">
              <div v-for="(c,i) in item.data" :key="i" class="row_con">
                <el-input v-model="item.data[i]" />
              </div>
          </div>
          </div>
        </div>
      </div>
      <div class="right">
        <configure/>
        <div class="btn" @click="nextRoute">完成配置，生成图表 -></div>
      </div>
    </div>
</template>

<script>
import configure from '@/components/subcomponents/configure'
import xlsxTable from '@/components/subcomponents/xlsxTable'
import chart from '@/components/subcomponents/chart'
export default {
  name: 'configureChart',
  data () {
    return {
      show: true
    }
  },
  created () {
    if (JSON.stringify(this.$store.state.chartOption) === '{}') {
      this.show = false
    }
  },
  computed: {
    // 获取 选择的字段数据
    checkList () {
      return this.$store.state.checkList
    },
    // X轴数据 作为表格的列名
    columnName () {
      return JSON.stringify(this.$store.state.chartOption) !== '{}' ? this.$store.state.chartOption.xAxis.data : []
    },
    // 配置图表中的数据 作为表格的数据
    seriesData () {
      return this.$store.state.chartOption.series || []
    }
  },
  watch: {
    // 深度监听 表格数据改变，修改配置图表的数据
    seriesData: {
      handler (newVal) {
        this.$store.dispatch('save_chart_option_series', newVal)
      },
      deep: true
    }
  },
  methods: {
    // 完成配置，跳转路由
    nextRoute () {
      this.$router.push('/export')
    }
  },
  components: {
    configure,
    xlsxTable,
    chart
  }
}
</script>

<style scoped>
  .container{
    width: 1440px;
  }
  .left{
    width: 1200px;
    display: inline-block;
  }
  .right{
    width: 240px;
    height: 672px;
    float: right;
    vertical-align: top;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-shadow: -1px 0 5px 0  rgba(0,0,0,0.1),1px 0 0 0 #D8D8D8 inset;
    -webkit-box-shadow:-1px 0 5px 0  rgba(0,0,0,0.1),1px 0 0 0 #D8D8D8 inset;
    box-shadow:-1px 0 5px 0  rgba(0,0,0,0.1),1px 0 0 0 #D8D8D8 inset;
  }
  .right .btn{
    width: 240px;
    height: 48px;
    color: white;
    line-height: 48px;
    font-size: 16px;
    cursor: pointer;
    bottom: 0;
    background-color: #2868F0;
  }
  .left .chart{
    width: 1200px;
    height: 480px;
    background: #F6F6F6;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding-top: 40px;
    padding-left: 316px;
    /*line-height: 480px;*/
  }
  .left .chart .chart_content{
    width: 640px;
    height: 400px;
    background-color: white;
  }
  .left .box{
    width: 100%;
    height: 48px;
    -moz-box-shadow:0 0 4px 0  rgba(0,0,0,0.1);
    -webkit-box-shadow:0 0 4px 0  rgba(0,0,0,0.1);
    box-shadow:0 0 4px 0  rgba(0,0,0,0.1);
  }
  .left .table{
    width: 1200px;
    padding: 16px 0;
    overflow-x: scroll;
  }
  .left .table .row{
    /*width: 100px;*/
    height: 28px;
    white-space: nowrap;
    /*width: 100px;*/
    /*height: 24px;*/
    /*line-height: 24px;*/
  }
  .left .table .row_con{
     display: inline-block;
   }
</style>
