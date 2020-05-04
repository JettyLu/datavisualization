<template>
  <div  class="container">
      <div class="title">
        <span>选择一个合适的图表</span>
      </div>
      <div class="content" >
<!--        有数据 渲染图表-->
        <div class="left" v-if="show">
          <div class="chart" v-for="(item,index) in static_data" :key="index"  @mouseenter="mouseover(item.introduction)">
            <div class="chart_title">{{item.title}}</div>
            <div class="chart_content">
              <chart :type="item.type" :choose="'true'"/>
            </div>
          </div>
        </div>
<!--        无数据 渲染提示-->
        <div class="left" v-else>请选择合适的字段</div>
<!--        图表介绍-->
        <div class="right" v-if="show">
          <div class="introduction" v-html="introduction"></div>
        </div>
      </div>
    </div>
</template>

<script>
import chart from '@/components/subcomponents/chart'
export default {
  name: 'chooseChart',
  data () {
    return {
      static_data: [
        {
          title: '柱状图',
          type: 'bar',
          introduction: '<b>柱状图</b><br><br>别名<br>柱形图<br><br>定义<br>使用柱形显示维度的数值。横轴显示分类维度，纵轴显示相应的值。<br><br>图表血缘<br>统计图表 - 柱状图类<br><br>视觉通道<br>位置、颜色<br><br>分析目的<br>比较、分布、排名<br><br>数据准备<br>1 ~ 2 个「无序名词」字段<br><br>1 个「数值」字段'
        },
        {
          title: '散点图',
          type: 'scatter',
          introduction: '<b>散点图</b><br><br>定义<br>散点图是将所有的数据以不同颜色的点的形式展现在平面直角坐标系上的统计图表。<br><br>图表血缘<br>统计图表 - 散点图类<br><br>视觉通道<br>颜色、位置<br><br>分析目的<br>比较、分布<br><br>数据准备<br>2 个「数值」字段<br>0 ~ 1 个「无序名词」字段'
        },
        {
          title: '折线图',
          type: 'line',
          introduction: '<b>折线图</b><br><br>别名<br>折线图、线图<br><br>定义<br>使用折线的线段显示数据在一个具有顺序性的维度上的变化。<br><br> 图表血缘<br>统计图表 - 折线图类<br><br>视觉通道<br>位置、方向<br><br>分析目的<br>比较、趋势<br><br>数据准备<br>1 个「时间」或「有序名词」字段<br><br>0 ~ 1 个「无序名词」字段<br><br>1 个「数值」字段'
        }
      ],
      introduction: '<b>柱状图</b><br><br>别名<br>柱形图<br><br>定义<br>使用柱形显示维度的数值。横轴显示分类维度，纵轴显示相应的值。<br><br>图表血缘<br>统计图表 - 柱状图类<br><br>视觉通道<br>位置、颜色<br><br>分析目的<br>比较、分布、排名<br><br>数据准备<br>1 ~ 2 个「无序名词」字段<br><br>1 个「数值」字段'
    }
  },
  computed: {
    // 是否有选择字段
    show () {
      return this.$store.state.checkList.length
    }
  },
  methods: {
    // 图表划过事件 展示该图表介绍
    mouseover (content) {
      this.introduction = content
    }
  },
  components: {
    chart
  }
}
</script>

<style scoped>
  .container{
    width: 1440px;
    padding: 32px 160px;
    text-align: left;
  }
  .title{
    font-size: 24px;
  }
  .content{
    margin-top: 32px;
  }
  .content .left {
    width: 776px;
    display: inline-block;
  }
  .content .right{
    float: right;
    vertical-align: top;
  }
  .content .left .chart{
    display: inline-block;
    margin: 12px;
  }
  .content .left .chart .chart_title{
    margin-bottom: 16px;
  }
  .content .left .chart .chart_content{
     width: 360px;
     height: 225px;
     border:1px solid rgba(0,0,0,0.25);
     border-radius: 4px;
     /*cursor: pointer;*/
     box-sizing: border-box;
     -webkit-box-sizing: border-box;
     padding: 5px;
   }
  .content .left .chart .chart_content:hover{
     border:2px solid #2868F0;
   }
  .introduction{
    width: 320px;
    border-radius: 16px;
    line-height: 20px;
    padding: 24px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 1px solid rgba(0,0,0,0.1);
    -moz-box-shadow: 0 2px 8px 0  #F0F1F2,0 1px 0 0 #D8D8D8 inset;
    -webkit-box-shadow:0 2px 8px 0  #F0F1F2,0 1px 0 0 #D8D8D8 inset;
    box-shadow:0 2px 8px 0  #F0F1F2,0 1px 0 0 #D8D8D8 inset;
  }
</style>
