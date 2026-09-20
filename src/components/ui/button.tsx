'use client';
import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-700 text-white hover:bg-brand-600 border-brand-700 shadow-surface focus-visible:outline-brand-700',
  secondary: 'bg-white text-ink-950 border-ink-300 hover:border-ink-950 hover:bg-ink-50',
  tertiary: 'bg-amber-500 text-ink-950 border-amber-500 hover:bg-amber-400',
  ghost: 'bg-transparent text-ink-900 border-transparent hover:bg-ink-50 underline-offset-4',
  danger: 'bg-red-700 text-white border-red-700 hover:bg-red-600',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-[36px] px-3 py-1.5 text-sm',
  md: 'min-h-[44px] px-5 py-2.5 text-[15px]',
  lg: 'min-h-[52px] px-7 py-3 text-base',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'btn-transition inline-flex items-center justify-center gap-2 rounded-[4px] border font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function ButtonLink({ href, variant = 'primary', size = 'md', className, children }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'btn-transition inline-flex items-center justify-center gap-2 rounded-[4px] border font-semibold',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
