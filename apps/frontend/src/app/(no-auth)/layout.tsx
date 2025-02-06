import type { ReactNode } from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { COOKIES_KEYS, ROUTES } from '@/utils/constants';

const NoAuthLayout = async ({ children }: { children: ReactNode }) => {
  const cookiesStore = await cookies();

  if (cookiesStore.get(COOKIES_KEYS.ACCESS_TOKEN)) return redirect(ROUTES.HOME);

  return children;
};

export default NoAuthLayout;
