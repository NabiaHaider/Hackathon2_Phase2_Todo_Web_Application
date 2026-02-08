// frontend/components/common/typography.tsx
import React from 'react';
import { cn } from '@/lib/utils'; // Assuming cn utility is available for conditional class joining

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'blockquote'
  | 'code'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
}

export function Typography({ variant, children, className, ...props }: TypographyProps) {
  const Tag = variant === 'lead' || variant === 'large' || variant === 'small' || variant === 'muted' ? 'p' : variant;

  const getClasses = () => {
    switch (variant) {
      case 'h1':
        return 'text-5xl font-extrabold tracking-tight lg:text-6xl';
      case 'h2':
        return 'text-4xl font-semibold tracking-tight';
      case 'h3':
        return 'text-3xl font-semibold tracking-tight';
      case 'h4':
        return 'text-2xl font-semibold tracking-tight';
      case 'h5':
        return 'text-xl font-semibold tracking-tight';
      case 'h6':
        return 'text-lg font-semibold tracking-tight';
      case 'p':
        return 'leading-7';
      case 'blockquote':
        return 'mt-6 border-l-2 pl-6 italic';
      case 'code':
        return 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold';
      case 'lead':
        return 'text-xl text-muted-foreground';
      case 'large':
        return 'text-lg font-semibold';
      case 'small':
        return 'text-sm font-medium leading-none';
      case 'muted':
        return 'text-sm text-muted-foreground';
      default:
        return '';
    }
  };

  return (
    <Tag className={cn(getClasses(), className)} {...props}>
      {children}
    </Tag>
  );
}
