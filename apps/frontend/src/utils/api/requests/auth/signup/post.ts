import type { FetchesRequestConfig, FetchesResponse } from '@siberiacancode/fetches';

import type { AuthSignUpDto, AuthSignUpResponse } from '@/generated/api';

import { huentionApi } from '@/utils/api/instance';

type PostAuthSignUpRequestConfig = FetchesRequestConfig<AuthSignUpDto>;
type PostAuthSignUpResponse = FetchesResponse<AuthSignUpResponse>;

export const postAuthSignUp = async ({
  params,
  config
}: PostAuthSignUpRequestConfig): Promise<PostAuthSignUpResponse> =>
  await huentionApi.post<AuthSignUpResponse>('auth/signup', params, config);
