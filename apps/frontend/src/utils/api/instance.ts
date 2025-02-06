import { Fetches } from '@siberiacancode/fetches';

import { ROUTES } from '../constants';

const BASE_URL = 'http://localhost:8000/api';

export const huentionApi = new Fetches({
  baseURL: BASE_URL,
  headers: { credentials: 'include' }
});

huentionApi.interceptors.response.use((response) => {
  if (response.status === 401) window.location.href = ROUTES.SIGN_IN;
  return response;
});
