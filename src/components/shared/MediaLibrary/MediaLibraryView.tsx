"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Grid3X3, List, ImageIcon, Loader2 } from "lucide-react";
import { IMediaResponse, ViewMode } from "@/types";
import { MediaGridItem } from "./MediaGridItem";
import { MediaListItem } from "./MediaItem";

interface MediaLibraryViewProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  loading: boolean;
  filteredImages: IMediaResponse[];
  selectedIds: string[];
  onImageSelect: (imageId: string) => void;
  maxSelection: number;
}

export function MediaLibraryView({
  viewMode,
  setViewMode,
  loading,
  filteredImages,
  selectedIds,
  onImageSelect,
  maxSelection,
}: MediaLibraryViewProps) {
  return (
    <>
      <div className="flex items-center justify-between p-6 pb-4 border-b">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              type="button"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              type="button"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {selectedIds.length} of {maxSelection} selected
        </div>
      </div>

      <ScrollArea className="flex-1 px-6 h-full">
        <div className="min-h-full">
          {loading ? (
            <div className="flex items-center justify-center h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">No images found</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-4">
              {filteredImages.map((image) => (
                <MediaGridItem
                  key={image._id}
                  image={image}
                  isSelected={selectedIds.includes(image._id)}
                  onSelect={() => onImageSelect(image._id)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              {filteredImages.map((image) => (
                <MediaListItem
                  key={image._id}
                  image={image}
                  isSelected={selectedIds.includes(image._id)}
                  onSelect={() => onImageSelect(image._id)}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </>
  );
}