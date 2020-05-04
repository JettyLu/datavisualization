import Vue from 'vue'
import Router from 'vue-router'
import uploadData from '@/components/uploadData'
import chooseChart from '@/components/chooseChart'
import configureChart from '@/components/configureChart'
import exportChart from '@/components/exportChart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'uploadData',
      component: uploadData
    },
    {
      path: '/choose',
      name: 'chooseChart',
      component: chooseChart
    },
    {
      path: '/configure',
      name: 'configureChart',
      component: configureChart
    },
    {
      path: '/export',
      name: 'exportChart',
      component: exportChart
    }
  ]
})
