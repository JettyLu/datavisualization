<template>
    <div ref="chart" class="echart" @click="chooseChart"></div>
</template>

<script>
export default {
  name: 'chart',
  props: ['type', 'choose', 'specify'], // 图表类型 是否选择图表 是否渲染指定图表
  data () {
    return {
      myChart: '', // 图表初始
      option: {
        title: {
          text: '',
          textStyle: {
            fontSize: 24, // 务必记住设置文字大小只能是数字
            color: '#000'
          },
          subtext: '',
          subtextStyle: {
            fontSize: 16, // 务必记住设置文字大小只能是数字
            color: '#000'
          }
        },
        legend: {
          orient: 'horizontal',
          // x: 'left',
          data: [],
          left: 'right',
          bottom: 'bottom',
          icon: 'rectangle', // 图例的形状
          itemWidth: 8, // 图例的宽
          textStyle: {
            fontSize: 10
          }
        },
        grid: {
          left: 5, // 组件离容器左侧的距离,百分比字符串或整型数字
          top: 20, // 组件离容器上侧的距离，百分比字符串或整型数字
          right: 5, // 组件离容器右侧的距离,百分比字符串或整型数字
          bottom: 2, // 组件离容器下侧的距离,百分比字符串或整型数字
          width: 'auto', // 图例宽度
          height: 'auto', // 图例高度
          containLabel: true
        },
        xAxis: {
          // show: true,
          type: 'category',
          axisTick: {
            alignWithLabel: true,
            show: false // 隐藏x坐标轴刻度
          },
          // x轴字体样式
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 40,
            textStyle: {
              color: '#42436A',
              fontSize: '10'
            }
          },
          splitLine: {
            show: true
          },
          // x轴颜色
          axisLine: {
            lineStyle: {
              color: '#e4e4e4'
            }
          },
          data: []
        },
        yAxis: {
          show: true,
          type: 'value',
          minInterval: 1, // 只显示整数
          axisLine: {
            show: false // 隐藏y坐标轴
          },
          // y轴字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: '#9495ab',
              fontSize: '10'
            }
          },
          // 网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: '#e4e4e4',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false // 隐藏y坐标轴刻度
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{a} {b} : {c}'
        },
        series: [],
        backgroundColor: '#fff'
      }, // 初始数据
      op: {} // 绘制的数据
    }
  },
  mounted () {
    // 图表初始化
    this.myChart = this.$echarts.init(this.$refs.chart, 'walden')
    // 绘制默认初始图表
    if (this.type) {
      this.draw()
    }
    // 绘制配置的图表
    if (this.specify) {
      this.specifyDraw()
    }
  },
  computed: {
    // 选择的字段
    checkList () {
      return this.$store.state.checkList
    },
    // 文件数据 用于渲染默认图标
    file () {
      return this.$store.state.file
    },
    // 配置数据 用于渲染配置图表
    specifyData () {
      return this.$store.state.chartOption
    }
  },
  watch: {
    // 用户指定的字段改变，重新绘制
    checkList (newVal) {
      if (newVal.length) {
        this.draw()
      }
    },
    // 深度监听配置数据， 配置数据改变 重新渲染
    specifyData: {
      handler (newVal) {
        console.log('specifyData')
        console.log(newVal)
        if (this.specify) this.specifyDraw()
      },
      deep: true
    }
  },
  methods: {
    draw () {
      this.op = this.option
      let x = this.getData(this.file.columnName[0]) // 横坐标
      this.op.xAxis.data = x
      this.op.legend.data = this.checkList
      if (this.checkList.length === 1) {
        let arr = this.getData(this.checkList[0])
        this.op.series = [{
          name: this.checkList[0],
          type: this.type,
          itemStyle: {
            normal: {color: '#2868F0'}
          },
          data: arr
        }]
      } else if (this.checkList.length === 2) {
        let arr1 = this.getData(this.checkList[0])
        let arr2 = this.getData(this.checkList[1])
        this.op.series = [{
          name: this.checkList[0],
          type: this.type,
          itemStyle: {
            normal: {color: '#2868F0'}
          },
          data: arr1
        },
        {
          name: this.checkList[1],
          type: this.type,
          // barWidth : 6,//柱体宽度
          itemStyle: {
            normal: {color: '#6be6c1'}
          },
          data: arr2
        }]
      } else if (this.checkList.length === 3) {
        let arr1 = this.getData(this.checkList[0])
        let arr2 = this.getData(this.checkList[1])
        let arr3 = this.getData(this.checkList[2])
        this.op.series = [{
          name: this.checkList[0],
          type: this.type,
          itemStyle: {
            normal: {color: '#2868F0'}
          },
          data: arr1
        },
        {
          name: this.checkList[1],
          type: this.type,
          // barWidth : 6,//柱体宽度
          itemStyle: {
            normal: {color: '#6be6c1'}
          },
          data: arr2
        },
        {
          name: this.checkList[2],
          type: this.type,
          // barWidth : 6,//柱体宽度
          itemStyle: {
            normal: {color: '#a0a7e6'}
          },
          data: arr3
        }]
      }
      this.myChart.setOption(this.op, true)
    },
    // 绘制配置数据的图表
    specifyDraw () {
      this.myChart.setOption(this.specifyData, true)
    },
    // 在state中获取图表数据
    getData (data) {
      let len = this.file.fileData.length
      let temp = data
      let arr = []
      for (let i = 0; i < len; i++) {
        arr.push(this.file.fileData[i][temp])
      }
      return arr
    },
    // 绘制默认数据图标
    // 选择图表，保存选择的图表数据
    chooseChart () {
      if (this.choose) {
        this.$store.dispatch('save_chart_option', this.op)
        // console.log('this.$store.state.chartOption:')
        // console.log(this.$store.state.chartOption)
        this.$router.push('/configure')
      }
    },
    // 导出图片事件
    exportPicture (file, type) {
      if (this.$refs.chart) {
        let chartsCanvas = this.$refs.chart.querySelectorAll('canvas')[0]
        let mime = type
        if (chartsCanvas) {
          // toDataURL()是canvas对象的一种方法，用于将canvas对象转换为base64位编码
          let imageUrl = chartsCanvas && chartsCanvas.toDataURL(mime)
          if (navigator.userAgent.indexOf('Trident') > -1) {
            // IE11
            let arr = imageUrl.split(',')
            // atob() 函数对已经使用base64编码编码的数据字符串进行解码
            let bstr = atob(arr[1])
            let bstrLen = bstr.length
            // Uint8Array, 开辟 8 位无符号整数值的类型化数组。内容将初始化为 0
            let u8arr = new Uint8Array(bstrLen)
            while (bstrLen--) {
              // charCodeAt() 方法可返回指定位置的字符的 Unicode 编码
              u8arr[bstrLen] = bstr.charCodeAt(bstrLen)
            }
            //  msSaveOrOpenBlob 方法允许用户在客户端上保存文件，方法如同从 Internet 下载文件，这是此类文件保存到“下载”文件夹的原因
            if (type === 'image/png') {
              window.navigator.msSaveOrOpenBlob(new Blob([u8arr], {type: mime}), file + '.png')
            } else {
              window.navigator.msSaveOrOpenBlob(new Blob([u8arr], {type: mime}), file + '.jpeg')
            }
          } else {
            // 其他浏览器
            let $a = document.createElement('a')
            $a.setAttribute('href', imageUrl)
            if (type === 'image/png') {
              $a.setAttribute('download', file + '.png')
            } else {
              $a.setAttribute('download', file + '.jpeg')
            }
            $a.click()
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.echart{
  width: 95% ;
  height: 95% ;
  padding-top: 2%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin: auto;
  cursor: pointer;
}
</style>
