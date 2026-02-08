'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterTabsProps {
  activeFilter: 'all' | 'pending' | 'completed';
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void;
}

export const FilterTabs = ({ activeFilter, onFilterChange }: FilterTabsProps) => {
  return (
    <Tabs value={activeFilter} onValueChange={(value) => onFilterChange(value as any)} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
