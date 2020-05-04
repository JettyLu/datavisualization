<template>
  <div>
    <div  class="container">
<!--      标题-->
      <div class="title">
        <span>数据准备</span>
        <el-tooltip class="item" effect="dark" content="下载样例数据文件，操作上传" placement="top">
          <img src="../assets/info-circle.svg">
        </el-tooltip>
      </div>
      <div class="content">
<!--        选择数据源-->
        <div>
          <div class="left">选择数据源</div>
          <div class="right">
            <el-radio v-model="radio" label="1">样例数据</el-radio>
            <el-radio v-model="radio" label="2">本地数据</el-radio>
            <div class="con_select" v-if="radio==='1'">
              <img src="../assets/file-excel.svg">
<!--              开发路径-->
              <a href="../../static/example.xlsx" download="example.xlsx">样例数据下载</a>
<!--              打包路径-->
<!--              <a href="./static/example.xlsx" download="example.xlsx">样例数据下载</a>-->
            </div>
            <div class="con_select" v-if="radio==='2'">
              <el-upload v-loading="loading"  element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.8)" :action="url" :http-request="importExcel" list-type="text" :show-file-list="false" >
                <el-button size="small"  class="btn_upload">
                  {{btn_content}}<img src="../assets/upload.svg">
                </el-button>
              </el-upload>
              <div class="file_name">{{file.fileName}}</div>
            </div>
          </div>
        </div>
<!--        数据预览-->
        <div>
          <div class="left">数据预览</div>
          <div class="right">
<!--            表格-->
            <div class="con_preview">
              <div class="con_top">{{file.rowNum}}行，{{file.columnNum}}列</div>
              <div v-if="tip_show && radio === '2'">
                <div class="tip">
                <div>※ 推荐使用谷歌、火狐浏览器<br><br><br></div>
                  <img src="../assets/tip.png" >
                </div>
              </div>
              <div v-else>
                <xlsx-table :columnName="file.columnName" :fileData="file.fileData" :height="400"/>
              </div>
            </div>
<!--            选择字段 与 图表展示-->
            <div class="con_choose">
              <div>请选择合适的字段</div>
              <div class="con_choose_content">
                <div class="con_top">
                  <div class="list">字段</div><div class="list">示例</div>
                </div>
                <div class="con_mid">
                  <div class="list">
                    <el-checkbox-group v-model="checkList" :max="3">
<!--                      首列禁止选择-->
                      <el-checkbox  :label="file.columnName[0]" disabled></el-checkbox><br>
                      <div v-for="(item,index) in checkbox" :key="index">
                        <el-checkbox  :label="item"></el-checkbox><br>
                      </div>
                    </el-checkbox-group>
                  </div>
                  <div class="list">
                    <div v-for="(value,key,index) in file.fileData[0]" :key="index">
                      <div class="list_item">{{value}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>图表类型</div>
              <div class="con_chart" >
                <chart :type="type"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    下一步-->
    <div class="bottom">
      <div class="next_button" @click="nextRoute">下一步</div>
    </div>
  </div>
</template>

<script>
import chart from '@/components/subcomponents/chart'
import XLSX from 'xlsx'
import xlsxTable from '@/components/subcomponents/xlsxTable'
export default {
  name: 'uploadData',
  data () {
    return {
      checkList: this.$store.state.checkList || [], // 选择的字段
      radio: '1', // 数据源 单选：样例数据、本地数据
      type: '', // 图表类型
      loading: false,
      xlsxJson: '',
      // show: false,
      url: '',
      wb: ''
    }
  },
  created () {
    this.file.fileName ? this.radio = '2' : this.radio = '1'
    // 设置图表类型
    this.setType()
    console.log(this.checkbox)
  },
  computed: {
    // 文件数据
    file () {
      return this.$store.state.file
    },
    btn_content () {
      return this.file.fileName ? '重新上传' : '文件上传'
    },
    tip_show () {
      return this.file.fileName ? 0 : 1
    },
    // 除第一列以外的 列名
    checkbox () {
      return this.file.columnName.slice(1)
    }
  },
  watch: {
    // 保存选择字段
    checkList (newVal) {
      this.$store.dispatch('save_check_list', newVal)
      this.setType()
    }
  },
  methods: {
    importExcel (content) {
      this.loading = true
      const file = content.file
      const types = file.name.split('.')[1]
      const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types)
      if (!fileType) {
        this.$message('格式错误！请重新选择')
        this.loading = false
        return
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.xlsxJson = tabJson[0].sheet
          console.log(this.xlsxJson)
          // 清空选择的字段
          this.$store.dispatch('save_check_list', [])
          this.checkList = []
          let colName = (function () {
            let arr = []
            if (tabJson[0]) {
              for (var key in tabJson[0].sheet[0]) { arr.push(key) }
            }
            return arr
          })()
          // 将文件数据存至 state
          this.$store.dispatch('save_file', [{
            fileName: file.name,
            fileData: tabJson[0].sheet,
            columnName: colName,
            columnNum: colName.length,
            rowNum: tabJson[0].sheet.length
          }])
        }
        this.loading = false
      })
    },
    file2Xce (file) {
      this.loading = true
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        reader.onload = function (e) {
          const data = e.target.result
          this.wb = XLSX.read(data, {
            type: 'binary'
          })
          const result = []
          this.wb.SheetNames.forEach((sheetName) => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            })
          })
          resolve(result)
        }
        reader.readAsBinaryString(file)
      })
    },
    // 设置图表类型
    setType () {
      // if (!this.checkList.length) {
      //   this.show = false
      // } else {
      //   this.show = true
      // }
      if (this.checkList.length === 1) {
        this.type = 'bar' // 选择一个字段 渲染柱状图
      } else if (this.checkList.length === 2) {
        this.type = 'bar' // 选择2个字段 渲染柱状图
      } else if (this.checkList.length === 3) {
        this.type = 'scatter' // 选择3个字段 渲染散点图
      }
    },
    // 下一步 跳转路由
    nextRoute () {
      this.$router.push('/choose')
    }
  },
  components: {
    xlsxTable, // 表格
    chart // 图表
  }
}
</script>

<style scoped>
  .container{
    width: 1440px;
    padding: 32px 0 32px 160px;
    text-align: left;
  }
  .title{
    font-size: 24px;
  }
  .title img{
    margin-left: 16px;
  }
  .content{
    margin-top: 32px;
  }
  .content .left{
    display: inline-block;
    width: 220px;
    vertical-align: top;
  }
  .content .right{
    display: inline-block;
    vertical-align: top;
  }
  .content .right .con_select{
    margin: 16px 0;
  }
  .content .right .btn_upload{
    width: 320px;
    height: 32px;
    color: #2868F0;
    border-color: #2868F0;
  }
  .content .right .file_name{
    margin-top: 5px;
    font-size: 12px;
  }
  .content .right .con_top{
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    border-bottom:1px solid rgba(0,0,0,0.25);
  }
  .content .right .con_preview{
    border:1px solid rgba(0,0,0,0.25);
    display: inline-block;
    vertical-align: top;
    width: 640px;
    height: 440px;
  }
  .content .right .con_choose{
    display: inline-block;
    width: 320px;
    margin-left: 24px;
  }
  .content .right .con_choose .con_choose_content{
    border:1px solid rgba(0,0,0,0.25);
    width: 320px;
    height: 180px;
    margin: 16px 0;
  }
  .content .right .con_choose .con_chart{
    border:1px solid rgba(0,0,0,0.25);
    width: 320px;
    height: 180px;
    margin: 16px 0;
    padding: 6px 12px;
  }
  .content .right .con_choose .con_choose_content .con_mid{
    width: 100%;
    height: 145px;
    padding: 6px 12px;
    overflow: scroll;
  }
  .content .right .con_choose .con_choose_content .list{
    display: inline-block;
    width:45%;
    /*overflow: hidden;*/
    vertical-align: middle;
  }
  .list_item{
    height: 16px;
    line-height: 16px;
  }
  .bottom{
    width: 1440px;
    height: 64px;
    position: relative;
    background-color: #F6F6F6 ;
  }
  .next_button{
    width: 120px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: white;
    background-color: #2868F0;
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
    top: 13px;
    right: 160px;
  }
  .tip{
    margin-top: 30px;
    width: 635px;
    font-size: 12px;
    color: #606266;
  }
  .tip img{
    width: 100%;
  }
</style>
