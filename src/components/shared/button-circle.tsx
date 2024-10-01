import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonCircleProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function ButtonCircle({ children, className, onClick }: Readonly<ButtonCircleProps>) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'pointer-events-auto rounded-full border-2 border-secondary-text hover:border-primary-text transition-[border-color] w-11 h-11',
        className,
      )}
    >
      {children}
    </button>
  );
}
