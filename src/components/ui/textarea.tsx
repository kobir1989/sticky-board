import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }: TextareaProps, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'line-clamp-2 h-full w-full resize-none p-2 text-sm font-bold text-gray-700 outline-none',
          className
        )}
        {...props}
      />
    );
  }
);

export default Textarea;
