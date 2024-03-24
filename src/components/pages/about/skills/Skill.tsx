'use client';

import { ForwardedRef, forwardRef } from 'react';

export const Skill = forwardRef(function Skill({ name }: { name: string }, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      className="w-[160px] h-[160px] rounded-full text-center text-2xl border-2 border-tertiary-text cursor-grabbing select-none absolute
      hover:border-primary-text flex flex-col justify-center"
    >
      {name}
    </div>
  );
});
