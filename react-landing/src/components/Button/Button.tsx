import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-surface text-ink hover:bg-white/90 hover:scale-[1.02] active:scale-[0.99]',
  secondary:
    'bg-transparent text-surface border border-surface/80 hover:bg-surface/10 hover:scale-[1.02] active:scale-[0.99]',
  ghost:
    'bg-transparent text-surface hover:text-white',
};

export function Button({
  variant = 'primary',
  children,
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface disabled:opacity-60',
        variantClasses[variant],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
