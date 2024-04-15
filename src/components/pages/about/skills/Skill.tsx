'use client';

import { ForwardedRef, forwardRef } from 'react';

export const Skill = forwardRef(function Skill({ name }: { name: string }, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      className="w-[100px] lg:w-[160px] h-[100px] lg:h-[160px] rounded-full text-center text-base lg:text-2xl border-2 border-tertiary-text cursor-grabbing select-none absolute
      hover:border-primary-text flex flex-col justify-center"
    >
      {name}
    </div>
  );
});
