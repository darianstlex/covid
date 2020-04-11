import Vue from 'vue';
import { countries } from './services/countries';
import { cases } from './services/cases';
import { ui } from './services/ui';

Vue.prototype.$state = {
  countries,
  cases,
  ui,
};
