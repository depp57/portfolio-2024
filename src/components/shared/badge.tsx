import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border py-0.5 ' +
          'transition-colors border-transparent bg-primary text-primary-text shadow hover:bg-primary/80 ' +
          'justify-center text-sm px-1.5 sm:px-2.5 sm:text-base sm:font-medium',
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
