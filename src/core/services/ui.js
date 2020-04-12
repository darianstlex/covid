import Vue from 'vue';

const state = Vue.observable({
  loading: 0,
  error: null,
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
  setError(error) {
    state.error = error;
  },
  resetError() {
    state.error = null;
  }
};
