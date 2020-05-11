import Vue from 'vue';
import { reactive, watch } from '@vue/composition-api';

const state = reactive({
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
    if (state.error !== null) state.error = null;
  },
};

watch(
  () => state.error,
  error => {
    if (error) {
      Vue.prototype.$Notice.error({
        title: `Error: ${error.status}`,
        desc: error.data?.message,
      });
    }
  }
);
