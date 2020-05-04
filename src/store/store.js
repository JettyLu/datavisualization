import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    file: {
      fileName: '',
      fileData: [
        {
          series: 'hot dog',
          x: 10,
          y: 20,
          z: 30
        },
        {
          series: 'burger',
          x: 12,
          y: 22,
          z: 32
        },
        {
          series: 'kebab',
          x: 8,
          y: 18,
          z: 28
        },
        {
          series: 'fries',
          x: 16,
          y: 12,
          z: 12
        }
      ],
      columnName: ['series', 'x', 'y', 'z'],
      columnNum: 0,
      rowNum: 0
    },
    checkList: [], // 选择字段
    chartOption: {} // 选择图表
  },
  actions: {
    save_file ({commit}, data) { commit(types.SAVE_FILE, data) },
    save_check_list ({commit}, data) { commit(types.SAVE_CHECK_LIST, data) },
    save_chart_option ({commit}, data) { commit(types.SAVE_CHART_OPTION, data) },
    save_chart_option_series ({commit}, data) { commit(types.SAVE_CHART_OPTION_SERIES, data) }
  },
  getters: {},
  mutations: {
    [types.SAVE_FILE]: (state, data) => {
      state.file = data[0]
      // console.log(data[0])
    },
    [types.SAVE_CHECK_LIST]: (state, data) => {
      state.checkList = data
      // console.log(data)
    },
    [types.SAVE_CHART_OPTION]: (state, data) => {
      state.chartOption = data
      // console.log(data)
    },
    [types.SAVE_CHART_OPTION_SERIES]: (state, data) => {
      state.chartOption.series = data
      // console.log(data)
    }
  }
})

export default store
