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
    state.list = data.sort((a, b) => a.Country.localeCompare(b.Country));
  },
};
