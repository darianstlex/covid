import Vue from 'vue';

const state = Vue.observable({
  loading: 0,
});

export const ui = {
  get $() {
    return state;
  },
  addLoading() {
    state.loading = state.loading + 1;
  },
  removeLoading() {
    state.loading = state.loading - 1;
  },
};
