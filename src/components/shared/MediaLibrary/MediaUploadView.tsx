"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { UploadPreviewItem } from "./UploadPreviewItem";
import { 
  ChangeEvent, 
  DragEvent, 
  FormEvent, 
  MouseEvent, 
  RefObject 
} from "react";

interface MediaUploadViewProps {
  uploadFiles: File[];
  maxSelection: number;
  uploading: boolean;
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  onTriggerFileInput: (e: MouseEvent) => void;
  onRemoveUploadFile: (index: number) => void;
  onCancelUpload: (e: MouseEvent) => void;
  onSubmit: (e: FormEvent) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

export function MediaUploadView({
  uploadFiles,
  maxSelection,
  uploading,
  onFileSelect,
  onTriggerFileInput,
  onRemoveUploadFile,
  onCancelUpload,
  onSubmit,
  onDragOver,
  onDrop,
  fileInputRef,
}: MediaUploadViewProps) {
  return (
    <ScrollArea className="px-6 h-full">
      <form onSubmit={onSubmit} className="space-y-6 py-4 h-full">
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-12 text-center flex flex-col items-center justify-center",
            uploadFiles.length > 0
              ? "border-muted-foreground/10"
              : "border-muted-foreground/25",
            "min-h-[300px] cursor-pointer",
            uploadFiles.length >= maxSelection && "cursor-not-allowed opacity-70"
          )}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <ImageIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <div className="space-y-2">
            <p className="text-xl font-medium">Upload Images</p>
            <p className="text-muted-foreground">
              {uploadFiles.length >= maxSelection
                ? `Maximum ${maxSelection} images reached`
                : `Drag and drop images here, or click to browse (${
                    maxSelection - uploadFiles.length
                  } remaining)`}
            </p>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onFileSelect}
            className="hidden"
            id="file-upload"
            disabled={uploading || uploadFiles.length >= maxSelection}
            ref={fileInputRef}
          />
          <Label
            htmlFor="file-upload"
            className="cursor-pointer w-full"
            onClick={(e) => {
              if (uploadFiles.length < maxSelection) {
                onTriggerFileInput(e);
              }
            }}
          >
            <div className="w-full flex justify-center">
              <Button
                type="button"
                className="px-8 py-4 mt-6"
                disabled={uploading || uploadFiles.length >= maxSelection}
                onClick={onTriggerFileInput}
              >
                <Upload className="mr-2 h-5 w-5" />
                <span className="text-base">Choose Files</span>
              </Button>
            </div>
          </Label>
        </div>

        {uploadFiles.length > 0 && (
          <div className="space-y-6 pb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">
                Files to Upload ({uploadFiles.length}/{maxSelection})
              </h3>
              <Button
                variant="ghost"
                onClick={onCancelUpload}
                className="text-destructive"
                type="button"
              >
                Cancel Upload
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {uploadFiles.map((file, index) => (
                <UploadPreviewItem
                  key={index}
                  file={file}
                  onRemove={() => onRemoveUploadFile(index)}
                  disabled={uploading}
                />
              ))}
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={onCancelUpload}
                className="flex-1 py-6 text-base"
                type="button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={uploading}
                className="flex-1 py-6 text-base"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Upload {uploadFiles.length} File
                    {uploadFiles.length !== 1 ? "s" : ""}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </ScrollArea>
  );
}