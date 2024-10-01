'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useHomeStore } from '@/stores/homeStore';

function showBannerInConsole() {
  console.log('%cHello there, developer!', 'color: #32ffce');
  console.log(
    '%cIf you’d like to get in touch, please feel free to reach out via the contact section.',
    'color: #32ffce',
  );
  console.log('%c— Sacha', 'color: #777777');
}

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  showBannerInConsole();

  const pathname = usePathname();
  if (pathname.split('/').length > 2) {
    useHomeStore.setState({ isIntro: false });
  }

  return <ThemeProvider disableTransitionOnChange>{children}</ThemeProvider>;
}
