import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import './plugins/iview';
import './plugins/zingchart';
import './core/state';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
