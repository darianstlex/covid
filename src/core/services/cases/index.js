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
      const { data } = await xhr.get(`country/${country}/status/${status}`);
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
      state[status] = { ...state[status], [country]: list };
    }
  },
};
