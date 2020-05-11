import Vue from 'vue';
import './plugins/iview';
import './plugins/zingchart';
import './plugins/compositionApi';
import './core/state';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
