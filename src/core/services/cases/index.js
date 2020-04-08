import Vue from 'vue';
import { xhr } from '@/core/api';

const state = Vue.observable({
  list: {},
});

export const cases = {
  get $() {
    return state;
  },
  async fetch(country) {
    if (!state.list[country]) {
      const { data } = await xhr.get(`country/${country}/status/deaths`);
      let temp = null;
      const list = data
        .map(item => ({ ...item, Date: item.Date.split('T')[0] }))
        .reduce((acc, { Country, CountryCode, CV, Cases, Status, Date }) => {
          if ((temp || {}).Date !== Date) {
            temp = { Country, CountryCode, CV, Cases, Status, Date };
            return [...acc, temp];
          } else {
            temp.Cases = temp.Cases + Cases;
            return acc;
          }
        }, []);
      state.list = { ...state.list, [country]: list };
    }
  },
};
