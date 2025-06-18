"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import Image from "next/image";
import { formatFileSize } from "./utils";

interface UploadPreviewItemProps {
  file: File;
  onRemove: () => void;
  disabled?: boolean;
}

export function UploadPreviewItem({
  file,
  onRemove,
  disabled = false,
}: UploadPreviewItemProps) {
  return (
    <Card className="relative h-full flex flex-col">
      <div className="aspect-square relative overflow-hidden rounded-t-lg">
        <Image
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="w-full h-full object-cover"
          fill
          unoptimized
        />
        <Button
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onRemove();
          }}
          disabled={disabled}
          type="button"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-3 flex-1">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(file.size)}
        </p>
      </div>
    </Card>
  );
}