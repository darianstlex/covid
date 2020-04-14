import axios from 'axios';
import { ui } from './services/ui';

const _axios = axios.create({
  baseURL: 'https://api.covid19api.com',
});

const defErrorResponse = {
  data: {
    message: 'Something went wrong, refresh the page and try again',
  },
  status: 'Unknown',
};

export const xhr = async config => {
  ui.addLoading();
  ui.resetError();

  try {
    const { data } = await _axios(config);
    return data;
  } catch ({ response = defErrorResponse }) {
    ui.setError(response);
  } finally {
    ui.removeLoading();
  }
};
