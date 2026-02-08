// frontend/app/(admin)/layout.tsx
import React from 'react';
import { AdminSidebar } from '@/components/layout/admin-sidebar'; // New import

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar /> {/* Integrated AdminSidebar */}
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}