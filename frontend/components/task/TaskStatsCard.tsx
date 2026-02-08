import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskStatsCardProps {
  icon: React.ReactNode;
  count: number;
  title: string;
}

export const TaskStatsCard = ({ icon, count, title }: TaskStatsCardProps) => {
  return (
    <Card className="flex items-center space-x-4 p-4 shadow-lg rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
      <CardHeader className="p-0">
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent className="p-0">
        <CardTitle className="text-2xl font-bold">{count}</CardTitle>
        <p className="text-sm text-primary">{title}</p>
      </CardContent>
    </Card>
  );
};
