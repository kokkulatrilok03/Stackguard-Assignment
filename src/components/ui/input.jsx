import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={twMerge(
        'flex h-10 w-full rounded-lg border-0 bg-muted/40 px-3 py-2 text-sm placeholder:text-muted-foreground outline-none ring-0 focus:outline-none focus:ring-0 focus:bg-accent/20 transition-colors shadow-none',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';


