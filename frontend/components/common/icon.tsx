// frontend/components/common/icon.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = dynamic(
    () =>
      import('lucide-react').then((mod) => {
        const Component = mod[name as keyof typeof mod] as React.ComponentType<LucideProps> | undefined;

        if (Component) {
          return Component;
        } else {
          console.warn(`Lucide icon "${name}" not found.`);
          return () => null; // Fallback component
        }
      }),
    {
      ssr: false,
      loading: () => <div className="h-5 w-5" />,
    }
  );

  return <LucideIcon {...props} />;
}
