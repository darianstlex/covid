import Vue from 'vue';
import { xhr } from '@/core/api';
import { ui } from './ui';

const state = Vue.observable({
  list: [],
});

export const countries = {
  get $() {
    return state;
  },
  async fetch() {
    ui.addLoading();
    const { data } = await xhr.get('countries');
    state.list = data.sort((a, b) => a.Country.localeCompare(b.Country));
    ui.removeLoading();
  },
};
