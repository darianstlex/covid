import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Covid 2019',
      metaTags: [
        {
          name: 'description',
          content: 'Covid 2019 statistic.',
        },
        {
          property: 'og:description',
          content: 'Covid 2019 statistic.',
        },
      ],
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
