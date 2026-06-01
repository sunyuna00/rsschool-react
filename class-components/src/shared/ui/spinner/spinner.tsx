import type { ComponentPropsWithoutRef } from 'react';

type SpinnerProps = ComponentPropsWithoutRef<'div'>;

export const Spinner = ({ className = '', ...props }: SpinnerProps) => {
  return (
    <div
      {...props}
      className={`flex justify-center items-center py-10 ${className}`}
    >
      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
};
