import { reactive } from '@vue/composition-api';
import { xhr } from '@/core/api';

const state = reactive({
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
      if (data) {
        state[status] = {
          ...state[status],
          [country]: data.map(item => ({ ...item, Date: item.Date.split('T')[0] })),
        };
      }
    }
  },
};
