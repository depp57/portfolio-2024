'use client';

import { Link, usePathname } from '@/lib/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

type BlogPaginationProps = {
  totalPages: number;
};

export default function BlogPagination({ totalPages }: Readonly<BlogPaginationProps>) {
  const t = useTranslations('blog');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="mt-8 relative h-6">
      {currentPage > 1 && (
        <Link className="absolute left-0 flex gap-1 items-center" href={createPageURL(currentPage - 1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          {t('previousPage')}
        </Link>
      )}

      {currentPage < totalPages && (
        <Link className="absolute right-0 flex gap-1 items-center" href={createPageURL(currentPage + 1)}>
          {t('nextPage')}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      )}
    </div>
  );
}
