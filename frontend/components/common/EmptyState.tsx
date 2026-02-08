import { Icon } from "./icon";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: string;
}

export const EmptyState = ({ title, description, icon }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg border-primary/50 shadow-md">
      <Icon name={icon} className="w-16 h-16 text-primary" />
      <h2 className="mt-4 text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-gray-700">{description}</p>
    </div>
  );
};
