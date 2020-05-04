<template>
  <div id="app">
    <top/>
    <router-view/>
  </div>
</template>

<script>
import top from '@/components/subcomponents/top'
export default {
  name: 'App',
  components: {
    top
  }
}
</script>
<style src="./assets/element.css"></style>
<style>
#app {
  font-family: "PingFang SC","Helvetica Neue",Helvetica,"Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
div{
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
img,span{
  vertical-align: middle;
}
</style>
