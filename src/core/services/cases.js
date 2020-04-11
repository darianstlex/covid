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
    const { data } = await xhr.get(`total/country/${country}/status/${status}`);
    state[status] = {
      ...state[status],
      [country]: data.map(item => ({ ...item, Date: item.Date.split('T')[0] })),
    };
  },
};
