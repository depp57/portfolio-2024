import createMiddleware from 'next-intl/middleware';
import { routing } from '@/lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized paths
  matcher: ['/', '/(en|fr)/:path*'],
};
