import Vue from 'vue';
import { xhr } from '@/core/api';

const state = Vue.observable({
  list: [],
});

export const countries = {
  get $() {
    return state;
  },
  async fetch() {
    const { data } = await xhr.get('countries');
    data.sort((a, b) => {
      if (a.Country < b.Country) return -1;
      if (a.Country > b.Country) return 1;
      return 0;
    });
    state.list = data;
  },
};
