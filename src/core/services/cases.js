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
      const data = await xhr({
        method: 'get',
        url: `total/country/${country}/status/${status}`,
      });
      state[status] = {
        ...state[status],
        [country]: data,
      };
    }
  },
};
