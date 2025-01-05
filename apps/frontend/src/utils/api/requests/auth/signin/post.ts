import type { FetchesRequestConfig, FetchesResponse } from '@siberiacancode/fetches';

import type { AuthSignInDto, AuthSignInResponse } from '@/generated/api';

import { huentionApi } from '@/utils/api/instance';

type postAuthSignInRequestConfig = FetchesRequestConfig<AuthSignInDto>;
type postAuthSignInResponse = FetchesResponse<AuthSignInResponse>;

export const postAuthSignIn = async ({ params, config }: postAuthSignInRequestConfig) =>
  await huentionApi.post<postAuthSignInResponse>('/auth/signin', params, config);
