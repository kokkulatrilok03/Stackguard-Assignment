import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const Label = forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={twMerge('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
    {...props}
  />
));

Label.displayName = 'Label';


