import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr'], // supported locales
  defaultLocale: 'en',
});

export const config = {
  // Match only internationalized paths
  matcher: ['/', '/(en|fr)/:path*'],
};
