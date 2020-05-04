<template>
  <div class="container">
    <div class="title">
      <span>选择要导出的内容</span>
    </div>
    <div class="content">
      <div>请选择要导出的内容</div>
      <div class="export">
<!--        左边，导出图片-->
        <div class="export_content">
          <div class="top">
            <div>图片 <span class="tip">( 推荐使用谷歌、火狐浏览器 )</span></div>
            <div>
              <el-input v-model="exportPicName" />
              <el-radio v-model="exportPicType" label="image/png">.png</el-radio>
              <el-radio v-model="exportPicType" label="image/jpeg">.jpeg</el-radio>
              <el-button type="primary" plain @click="exportPicture" :disabled="btn_disabled">导出</el-button>
            </div>
          </div>
          <div class="bottom"><chart :specify="'true'" ref="chart" /></div>
        </div>
<!--        右边，导出文件-->
        <div class="export_content">
          <div class="top">
            <div>文件</div>
            <div>
              <el-input v-model="exportFileName" />
              <el-radio v-model="exportFileType" label="csv">.csv</el-radio>
              <el-radio v-model="exportFileType" label="xlsx">.xlsx</el-radio>
              <el-button type="primary" plain @click="exportFile" :disabled="btn_disabled">导出</el-button>
            </div>
          </div>
          <div  class="bottom">
            <xlsx-table :columnName="cName" :fileData="fData" :height="360" ref="xlsxTable"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chart from '@/components/subcomponents/chart'
import xlsxTable from '@/components/subcomponents/xlsxTable'
export default {
  name: 'exportChart',
  data () {
    return {
      cName: [], // 表格列名
      fData: [], // 表格数据
      exportPicName: 'picture', // 导出图片名
      exportPicType: 'image/png', // 导出图片格式
      exportFileName: 'file', // 导出文件名
      exportFileType: 'csv' // 导出文件格式
    }
  },
  created () {
    // 初始化表格数据 将数据转换为表格所需数据的格式
    this.initData()
  },
  methods: {
    // 触发子组件导出文件事件
    exportFile () {
      this.$refs.xlsxTable.exportFile(this.exportFileName, this.exportFileType)
    },
    // 触发子组件导出图片事件
    exportPicture () {
      this.$refs.chart.exportPicture(this.exportPicName, this.exportPicType)
    },
    // 初始化表格数据，将chart数据转化为适合table的数据格式
    initData () {
      this.cName[0] = this.$store.state.file.columnName[0]
      for (let i = 0; i < this.checkList.length; i++) {
        this.cName.push(this.checkList[i])
      }
      console.log(this.cName)
      let arr = []
      let obj = {}
      for (let i = 0; i < this.xAxisData.length; i++) {
        obj[this.cName[0]] = this.xAxisData[i]
        console.log(obj)
        console.log('this.xAxisData[i]:' + this.xAxisData[i])
        arr.push(obj)
        obj = {}
      }
      for (let j = 0; j < this.checkList.length; j++) {
        for (let i = 0; i < this.xAxisData.length; i++) {
          console.log('arr[i][this.checkList[j]]:' + arr[i][this.checkList[j]])
          console.log('this.seriesData[j].data[i]:' + this.seriesData[j].data[i])
          arr[i][this.checkList[j]] = this.seriesData[j].data[i]
        }
      }
      this.fData = arr
    }
  },
  computed: {
    // 选择的字段 作为表格列名
    checkList () {
      return this.$store.state.checkList
    },
    // X轴数据 作为第一列数据
    xAxisData () {
      return this.$store.state.chartOption.xAxis.data
    },
    // 配置图表的各项数据 作为表格数据
    seriesData () {
      console.log('seriesData')
      console.log(this.$store.state.chartOption.series)
      return this.$store.state.chartOption.series
    },
    btn_disabled () {
      if (JSON.stringify(this.$store.state.chartOption) !== '{}') {
        return false
      } else {
        return true
      }
    }
  },
  components: {
    xlsxTable,
    chart
  }
}
</script>

<style scoped>
.container{
  width: 1440px;
  padding: 32px 156px 32px 160px;
  text-align: left;
}
.title{
  font-size: 24px;
}
.content{
  width: 100%;
  margin-top: 24px;
}
  .content .export{
    margin-top: 11px;
    width: 100%;
    height: 440px;
    white-space: nowrap;
  }
.content .export .export_content{
  width: 546px;
  margin-right: 24px;
  height: 440px;
  display: inline-block;
  border-radius: 4px;
  padding: 8px 16px;
  vertical-align: top;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-shadow: 1px 2px 8px 0  #F0F1F2,0 1px 0 0 #D8D8D8 inset;
  -webkit-box-shadow:1px 2px 8px 0  #F0F1F2,0 1px 0 0 #D8D8D8 inset;
  box-shadow:1px 2px 8px 0  #F0F1F2,0 1px 0 0 #D8D8D8 inset;
}
.content .export .export_content .top{
  width: 510px;
  height: 80px;
  line-height: 36px;
  font-size: 16px;
}
.content .export .export_content .top .el-input{
   width: 150px;
   margin-right: 10px;
 }
.content .export .export_content .bottom{
  width: 490px;
  height: 360px;
  padding: 5px;
}
  .tip{
    font-size: 12px;
    color: #606266;
  }
</style>
