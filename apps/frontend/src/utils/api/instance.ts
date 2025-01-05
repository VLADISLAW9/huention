import { Fetches } from '@siberiacancode/fetches';

import { LOCAL_STORAGE_KEYS, ROUTES } from '../constants';

const BASE_URL = 'http://localhost:8000/api';
const TOKEN = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) ?? null;

export const huentionApi = new Fetches({
  baseURL: BASE_URL,
  headers: { ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }) }
});

huentionApi.interceptors.response.use((response) => {
  if (response.status === 401) {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    window.location.href = ROUTES.SIGN_IN;
  }

  return response;
});
