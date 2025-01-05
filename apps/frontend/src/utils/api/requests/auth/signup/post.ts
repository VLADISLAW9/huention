import type { FetchesRequestConfig, FetchesResponse } from '@siberiacancode/fetches';

import type { AuthSignUpDto, AuthSignUpResponse } from '@/generated/api';

import { huentionApi } from '@/utils/api/instance';

type postAuthSignUpRequestConfig = FetchesRequestConfig<AuthSignUpDto>;
type postAuthSignUpResponse = FetchesResponse<AuthSignUpResponse>;

export const postAuthSignUp = async ({ params, config }: postAuthSignUpRequestConfig) =>
  await huentionApi.post<postAuthSignUpResponse>('auth/signup', params, config);
