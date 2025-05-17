import type { FetchesRequestConfig, FetchesResponse } from '@siberiacancode/fetches';

import type { GetCollectionsResponse as _GetCollectionsResponse } from '@/generated/api';

import { huentionApi } from '@/utils/api/instance';

type GetCollectionsRequestConfig = FetchesRequestConfig;
type GetCollectionsResponse = FetchesResponse<_GetCollectionsResponse>;

export const getCollection = async (
  config?: GetCollectionsRequestConfig
): Promise<GetCollectionsResponse> =>
  await huentionApi.get<_GetCollectionsResponse>('collections', config);
