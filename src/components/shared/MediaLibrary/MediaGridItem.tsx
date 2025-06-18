"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import { IMediaResponse } from "@/types";

interface MediaGridItemProps {
  image: IMediaResponse;
  isSelected: boolean;
  onSelect: () => void;
}

export function MediaGridItem({
  image,
  isSelected,
  onSelect,
}: MediaGridItemProps) {
  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all hover:shadow-md h-full flex flex-col",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={onSelect}
    >
      <div className="aspect-square relative overflow-hidden rounded-t-lg">
        <Image
          src={image.url}
          alt={image.fileName || image.fileName}
          className="w-full h-full object-cover"
          fill
          unoptimized={image.url.startsWith("blob:")}
        />
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <div className="bg-primary text-primary-foreground rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>
      <div className="p-2 flex-1">
        <p className="text-sm font-medium truncate">{image.fileName}</p>
      </div>
    </Card>
  );
}