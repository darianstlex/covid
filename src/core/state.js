import Vue from 'vue';
import { countries } from './services/countries';
import { cases } from './services/cases';

Vue.prototype.$state = {
  countries,
  cases,
};
