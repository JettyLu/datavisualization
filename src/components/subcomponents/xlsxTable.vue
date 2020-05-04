<template>
  <el-table
    id="xlsxTable"
    ref="xlsxTable"
    :data="fileData"
    border
    :height="height"
    width="100%"
    :row-style="{height:'24px'}"
    :cell-style="{padding:'5px 0'}"
    :header-cell-style="{background:'#ededed',padding:'5px 0'}"
    >
    <el-table-column
      v-for="(item,index) in columnName"
      :key="index"
      :prop="columnName[index]"
      :label="columnName[index]"
      >
    </el-table-column>
  </el-table>
</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
export default {
  name: 'xlsxTable',
  props: ['columnName', 'fileData', 'height'],
  methods: {
    // 导出表格
    exportFile (file, type) {
      var wb = XLSX.utils.table_to_book(document.querySelector('#xlsxTable'))
      var wbout = XLSX.write(wb, { bookType: type, bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), file + '.' + type)
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    }
  }
}
</script>

<style scoped>

</style>
