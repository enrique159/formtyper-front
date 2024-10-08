import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMeta from 'vue-meta'
import VueApexCharts from 'vue-apexcharts'
import './registerServiceWorker'


Vue.config.productionTip = false

axios.defaults.headers.common['Allow-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
axios.defaults.baseURL = process.env.VUE_APP_SERVICE_URL;

Vue.use(VueAxios, axios)
Vue.use(VueMeta)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
