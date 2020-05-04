<!--此组件为配置图表页面 的右边 配置-->
<template>
    <div class="con">
      <div class="title">配置</div>
      <div>
<!--        画布-->
        <div @click="open('panel1')" class="panel"><img src="../../assets/select.svg" ref="panel1">画布</div>
        <div v-show="panel1">
          <div><div class="item">标题</div>
            <el-input v-model="title" placeholder="请输入内容"></el-input></div>
          <div>
            <div class="item">字体</div>
            <el-select v-model="title_size" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div><div class="item">副标题</div>
            <el-input v-model="subtitle" placeholder="请输入内容"></el-input></div>
          <div>
            <div class="item">字体</div>
            <el-select v-model="subtitle_size" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <div class="item">图例字体</div>
            <el-select v-model="legend_size" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">背景色</div><el-color-picker v-model="bgColor" size="mini"></el-color-picker>
        </div>
<!--        X轴-->
        <div @click="open('panel2')" class="panel"><img src="../../assets/select.svg" ref="panel2">X轴</div>
        <div v-show="panel2">
          <div>
            <div class="item">显示</div>
            <el-switch v-model="x" active-color="#2868F0" inactive-color="#8d8d8d"></el-switch>
          </div>
          <div>
            <div class="item">网格</div>
            <el-switch v-model="x_line" active-color="#2868F0" inactive-color="#8d8d8d"></el-switch>
          </div>
          <div>
            <div class="item">字体</div>
            <el-select v-model="x_size" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
<!--        Y轴-->
        <div @click="open('panel3')" class="panel"><img src="../../assets/select.svg" ref="panel3">Y轴</div>
        <div  v-show="panel3">
          <div>
            <div class="item">显示</div>
            <el-switch v-model="y" active-color="#2868F0" inactive-color="#8d8d8d"></el-switch>
          </div>
          <div>
            <div class="item">网格</div>
            <el-switch v-model="y_line" active-color="#2868F0" inactive-color="#8d8d8d"></el-switch>
          </div>
          <div>
            <div class="item">字体</div>
            <el-select v-model="y_size" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
<!--        图形-->
        <div @click="open('panel4')" class="panel"><img src="../../assets/select.svg" ref="panel4">图形</div>
        <div v-show="panel4">
          <div v-for="(item,index) in color" :key="index">
            <div class="item">颜色</div><el-color-picker v-model="color[index]" size="mini"></el-color-picker>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'configure',
  data () {
    return {
      panel1: true, // 画布项是否收起
      panel2: true, // X轴项是否收起
      panel3: true, // Y轴项是否收起
      panel4: true, // 图形项是否收起
      title: '', // 图表标题
      subtitle: '', // 图表副标题
      title_size: '24px', // 图表标题字体大小
      subtitle_size: '16px', // 图表副标题字体大小
      legend_size: '10px', // 图例字体大小
      x: true, // 是否显示X轴刻度
      x_line: '', // 是否显示X轴网格
      x_size: '10px', // X轴字体大小
      y: true, // 是否显示Y轴刻度
      y_line: '', // 是否显示Y轴网格
      y_size: '10px', // Y轴字体大小
      bgColor: 'rgba(255,255,255,0)', // 图表背景颜色
      color: [], // 各例颜色
      options: [
        {
          value: '10',
          label: '10px'
        }, {
          value: '12',
          label: '12px'
        }, {
          value: '14',
          label: '14px'
        }, {
          value: '16',
          label: '16px'
        }, {
          value: '18',
          label: '18px'
        }, {
          value: '20',
          label: '20px'
        }, {
          value: '24',
          label: '24px'
        }, {
          value: '28',
          label: '28px'
        }
      ] // 字体选项
    }
  },
  created () {
    // 初始化数据
    this.initData()
  },
  computed: {
    // 获取用户选择的图表数据 作为配置数据
    op () {
      console.log(this.$store.state.chartOption)
      return this.$store.state.chartOption
    }
  },
  watch: {
    // 深度监听 用户配置数据的改变 ，并将改变存入state
    op: {
      handler (newVal) {
        this.$store.dispatch('save_chart_option', newVal)
      },
      deep: true
    },
    // 监听各配置项数据变化
    title (newVal) { this.op.title.text = newVal },
    title_size  (newVal) { this.op.title.textStyle.fontSize = newVal },
    subtitle (newVal) { this.op.title.subtext = newVal },
    subtitle_size  (newVal) { this.op.title.subtextStyle.fontSize = newVal },
    legend_size (newVal) { this.op.legend.textStyle.fontSize = newVal },
    bgColor (newVal) { this.op.backgroundColor = newVal },
    x (newVal) { this.op.xAxis.axisLabel.show = newVal },
    x_size (newVal) { this.op.xAxis.axisLabel.textStyle.fontSize = newVal },
    x_line (newVal) { this.op.xAxis.splitLine.show = newVal },
    y (newVal) { this.op.yAxis.axisLabel.show = newVal },
    y_size (newVal) { this.op.yAxis.axisLabel.textStyle.fontSize = newVal },
    y_line (newVal) { this.op.yAxis.splitLine.show = newVal },
    color (newVal) {
      for (let i = 0; i < newVal.length; i++) {
        this.op.series[i].itemStyle.normal.color = newVal[i]
      }
    }
  },
  methods: {
    // 配置各项 的展开与收缩动画
    open (panel) {
      if (this[panel]) {
        this.$refs[panel].style.transform = 'rotate(-90deg)'
      } else {
        this.$refs[panel].style.transform = 'rotate(0deg)'
      }
      this[panel] = !this[panel]
    },
    // 初始化配置项数据
    initData () {
      if (JSON.stringify(this.op) !== '{}') {
        this.op.legend.top = 'top'
        this.op.grid.top = 80
        let type = this.op.series[0].type
        if (this.op.title.text) {
          this.title = this.op.title.text
        } else {
          if (type === 'bar') { this.op.title.text = this.title = '柱状图' }
          if (type === 'scatter') { this.op.title.text = this.title = '散点图' }
          if (type === 'line') { this.op.title.text = this.title = '折线图' }
        }
        if (this.op.title.subtext) {
          this.subtitle = this.op.title.subtext
        } else {
          if (type === 'bar') { this.op.title.subtext = this.subtitle = '这是一个柱状图' }
          if (type === 'scatter') { this.op.title.subtex = this.subtitle = '这是一个散点图' }
          if (type === 'line') { this.op.title.subtext = this.subtitle = '这是一个折线图' }
        }
        this.title_size = this.op.title.textStyle.fontSize
        this.subtitle_size = this.op.title.subtextStyle.fontSize
        this.x = this.op.xAxis.axisLabel.show
        this.x_line = this.op.xAxis.splitLine.show
        this.x_size = this.op.xAxis.axisLabel.textStyle.fontSize
        this.y = this.op.yAxis.axisLabel.show
        this.y_line = this.op.yAxis.splitLine.show
        this.y_size = this.op.yAxis.axisLabel.textStyle.fontSize
        this.bgColor = this.op.backgroundColor
        let colorLength = this.op.series.length
        for (let i = 0; i < colorLength; i++) {
          this.color[i] = this.op.series[i].itemStyle.normal.color
        }
      }
    }
  }
}
</script>

<style scoped>
  .con{
    width: 100%;
    height: 624px;
    overflow-y: scroll;
    text-align: left;
    font-size: 16px;
    line-height: 32px;
    margin: 8px 0 0 8px;
  }
  .con::-webkit-scrollbar {display:none}
  .title{
    width: 100%;
    padding-left: 20px;
    font-size: 20px;
  }
  .panel{
    cursor: pointer;
  }
  .item{
    width: 80px;
    padding-left: 20px;
    display: inline-block;
    vertical-align: middle;
    color: #8d8d8d;
    font-size: 14px;
  }
  img{
    margin-right: 10px;
    transition: all 0.2s;
  }
</style>
