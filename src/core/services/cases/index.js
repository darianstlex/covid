import Vue from 'vue';
import { xhr } from '@/core/api';

const state = Vue.observable({
  confirmed: {},
  recovered: {},
  deaths: {},
});

export const cases = {
  get $() {
    return state;
  },
  async fetch(country, status) {
    if (!state[status][country]) {
      const { data } = await xhr.get(`total/country/${country}/status/${status}`);
      const list = data.map(item => ({ ...item, Date: item.Date.split('T')[0] }));
      state[status] = { ...state[status], [country]: list };
    }
  },
};
