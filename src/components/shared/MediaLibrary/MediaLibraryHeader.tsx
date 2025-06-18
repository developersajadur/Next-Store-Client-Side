"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MediaLibraryHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function MediaLibraryHeader({
  searchQuery,
  onSearchChange,
}: MediaLibraryHeaderProps) {
  return (
    <div className="px-6 pt-6 pb-0">
      <h2 className="text-2xl font-semibold">Media Library</h2>
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-72"
        />
      </div>
    </div>
  );
}