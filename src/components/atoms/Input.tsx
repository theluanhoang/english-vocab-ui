import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ type = 'text', className = '', ...rest }, ref) => {
    return (
      <input
        type={type}
        className={`w-full px-3 py-2 border-1 border-[var(--color-primary)] bg-[var(--bg-input)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${className}`}
        ref={ref}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;