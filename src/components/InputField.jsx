import { Label } from './ui/label.jsx';
import { Input } from './ui/input.jsx';
import { twMerge } from 'tailwind-merge';

export default function InputField({ id, label, error, className, as, ...props }) {
  const isTextarea = as === 'textarea';
  return (
    <div className={className}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      {isTextarea ? (
        <textarea
          id={id}
          className={twMerge(
            'mt-1 flex min-h-[120px] w-full rounded-lg border-0 bg-muted/40 px-3 py-2 text-sm placeholder:text-muted-foreground outline-none ring-0 focus:outline-none focus:ring-0 focus:bg-accent/20 transition-colors shadow-none'
          )}
          {...props}
        />
      ) : (
        <Input id={id} {...props} />
      )}
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}


