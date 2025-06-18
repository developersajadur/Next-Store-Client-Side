"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { MouseEvent } from "react";

interface MediaLibraryFooterProps {
  selectedCount: number;
  maxSelection: number;
  mode: "single" | "multiple";
  uploading: boolean;
  onCancel: () => void;
  onAddSelected: (e: MouseEvent) => void;
}

export function MediaLibraryFooter({
  selectedCount,
  maxSelection,
  mode,
  uploading,
  onCancel,
  onAddSelected,
}: MediaLibraryFooterProps) {
  return (
    <div className="flex items-center justify-between p-6 border-t">
      <div className="text-sm text-muted-foreground">
        {mode === "multiple"
          ? `${selectedCount} of ${maxSelection} selected`
          : "1 selected"}
      </div>
      <div className="flex space-x-4">
        <Button
          variant="outline"
          onClick={onCancel}
          className="px-8 py-3"
          type="button"
        >
          Cancel
        </Button>
        <Button
          onClick={onAddSelected}
          disabled={selectedCount === 0 || uploading}
          className="px-8 py-3"
          type="button"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Please wait...
            </>
          ) : (
            <>
              Add Selected {selectedCount > 0 && `(${selectedCount})`}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}