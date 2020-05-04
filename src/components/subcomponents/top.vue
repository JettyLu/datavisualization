<template>
    <div>
      <div class="top head">
        <img src="../../assets/data.svg">
        <span>数据可视化</span>
      </div>
<!--      导航-->
      <div class="top nav">
        <div v-for="(item,index) in static_data" :key="index">
          <div :class="active===item.id? 'step step_active':'step'"  @click="changRoute(item.path)">
            <div class="circle circle_success" v-if="active>item.id">√</div>
            <div class="circle circle_active" v-if="active===item.id">{{item.id}}</div>
            <div class="circle" v-if="active<item.id">{{item.id}}</div>
            <span>{{item.title}}</span>
          </div>
          <img src="../../assets/right.svg" class="right" v-if="item.img">
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      static_data: [
        {
          id: 1,
          path: '/',
          title: '上传数据',
          img: true
        },
        {
          id: 2,
          path: '/choose',
          title: '选择图表',
          img: true
        },
        {
          id: 3,
          path: '/configure',
          title: '配置图表',
          img: true
        },
        {
          id: 4,
          path: '/export',
          title: '导出图表',
          img: false
        }
      ]
    }
  },
  computed: {
    // 根据当前路由 渲染样式
    active () {
      if (this.$route.path === '/') {
        return 1
      } else if (this.$route.path === '/choose') {
        return 2
      } else if (this.$route.path === '/configure') {
        return 3
      } else if (this.$route.path === '/export') {
        return 4
      }
    }
  },
  methods: {
    // 切换路由
    changRoute (path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style scoped>
.top{
  width: 1440px;
  height: 64px;
  line-height: 64px;
  -moz-box-shadow: 0 2px 8px 0  #F0F1F2,0 1px 0 0 #D8D8D8 inset;
  -webkit-box-shadow:0 2px 8px 0  #F0F1F2,0 1px 0 0 #D8D8D8 inset;
  box-shadow:0 2px 8px 0  #F0F1F2,0 1px 0 0 #D8D8D8 inset;
}
  .head{
    font-size: 20px;
    text-align: left;
    padding-left: 32px;
  }
  .nav{}
  .nav div{
    display: inline-block;
  }
  .nav .step{
    width: 160px;
    height: 64px;
    font-size: 16px;
    cursor: pointer;
  }
  .nav .step_active{
    border-bottom: 4px solid #2868F0;
  }
  .nav .step .circle{
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 32px;
    border: 1px solid rgba(0,0,0,0.25);
    color: rgba(0,0,0,0.25) ;
    margin-right: 8px;
    vertical-align: middle;
  }
  .nav .step .circle_success{
    border: 1px solid #2868F0;
    color: #2868F0 ;
  }
  .nav .step .circle_active{
    background-color: #2868F0;
    color: #fff ;
    border: none;
  }
  .nav .right{
    width: 12px;
    opacity: 0.25;
  }
</style>
