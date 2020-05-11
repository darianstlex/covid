import { reactive } from '@vue/composition-api';
import { xhr } from '@/core/api';

const state = reactive({
  list: [],
});

export const countries = {
  get $() {
    return state;
  },
  async fetch() {
    const data = await xhr({
      method: 'get',
      url: 'countries',
    });
    if (data) state.list = data.sort((a, b) => a.Country.localeCompare(b.Country));
  },
};
