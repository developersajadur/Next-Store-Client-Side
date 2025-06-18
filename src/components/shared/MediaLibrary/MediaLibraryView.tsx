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
  hasMore: boolean;
  onLoadMore: () => void;
}

export function MediaLibraryView({
  viewMode,
  setViewMode,
  loading,
  filteredImages,
  selectedIds,
  onImageSelect,
  maxSelection,
  hasMore,
  onLoadMore,
}: MediaLibraryViewProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4 border-b">
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
        <div className="text-sm text-muted-foreground">
          {selectedIds.length} of {maxSelection} selected
        </div>
      </div>

      {/* Content Area */}
      <ScrollArea className="flex-1 px-6 h-full">
        <div className="min-h-full flex flex-col pb-6">
          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : filteredImages.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center h-[300px]">
              <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">No images found</p>
            </div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
                // List View
                <div className="space-y-2">
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

              {/* Load More Button */}
              {!loading && hasMore && (
                <div className="flex justify-center items-center w-full pt-6 mt-6 border-t mb-20">
                  <Button
                    onClick={onLoadMore}
                    className="bg-blue-600 text-white hover:bg-blue-700 transition-all"
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </>
  );
}
