import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 font-medium ' +
          'transition-colors border-transparent bg-primary text-primary-text shadow hover:bg-primary/80',
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
