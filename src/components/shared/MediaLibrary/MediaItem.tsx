"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IMediaResponse } from "@/types";

interface MediaListItemProps {
  image: IMediaResponse;
  isSelected: boolean;
  onSelect: () => void;
}

export function MediaListItem({
  image,
  isSelected,
  onSelect,
}: MediaListItemProps) {
  return (
    <Card
      className={cn(
        "flex items-center p-4 cursor-pointer transition-all hover:shadow-md",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={onSelect}
    >
      <div className="w-20 h-20 relative overflow-hidden rounded mr-4">
        <Image
          src={image.url}
          alt={image.fileName || image.fileName}
          className="w-full h-full object-cover"
          fill
          unoptimized={image.url.startsWith("blob:")}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{image.fileName}</p>
      </div>
      <Checkbox
        checked={isSelected}
        onCheckedChange={onSelect}
        onClick={(e) => e.stopPropagation()}
      />
    </Card>
  );
}