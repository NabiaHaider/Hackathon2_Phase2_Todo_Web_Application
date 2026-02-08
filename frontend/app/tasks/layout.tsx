import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function TasksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen bg-lavender-light overflow-auto">
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </div>
  );
}
