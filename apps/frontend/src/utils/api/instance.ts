import { Fetches } from '@siberiacancode/fetches';

import { ROUTES } from '../constants';
import { STATUS_CODES } from '../constants/api';

const BASE_URL = 'http://localhost:8000/api';

export const huentionApi = new Fetches({
  baseURL: BASE_URL
});

huentionApi.interceptors.response.use((response) => {
  if (response.status === STATUS_CODES.UNAUTHORIZED) window.location.href = ROUTES.SIGN_IN;
  return response;
});

huentionApi.interceptors.request.use((config) => {
  config.credentials = 'include';
  return config;
});
