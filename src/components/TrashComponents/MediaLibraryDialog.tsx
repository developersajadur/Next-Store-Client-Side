"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Upload,
  Search,
  Grid3X3,
  List,
  Check,
  X,
  ImageIcon,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  getAllMedia,
  uploadMedia,
} from "@/services/(AdminServices/MediaService";
import { IMediaResponse } from "@/types";
import { toast } from "sonner";

interface MediaLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (images: IMediaResponse[]) => void;
  maxSelection?: number;
  selectedImages?: IMediaResponse[];
  mode?: "single" | "multiple";
}

export function TrashMediaLibraryDialog({
  open,
  onOpenChange,
  onSelect,
  maxSelection = 10,
  selectedImages = [],
  mode = "multiple",
}: MediaLibraryDialogProps) {
  const [images, setImages] = useState<IMediaResponse[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    selectedImages.map((img) => img._id)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Load media when dialog opens
  useEffect(() => {
    const loadMedia = async () => {
      if (open) {
        setLoading(true);
        try {
          const response = await getAllMedia();
          setImages(response?.data || []);
          setSelectedIds(selectedImages.map((img) => img._id));
        } catch (error) {
          console.error("Failed to load media:", error);
          toast.error("Failed to load media");
        } finally {
          setLoading(false);
        }
      }
    };
    loadMedia();
  }, [open, selectedImages]);

  const handleImageSelect = (imageId: string) => {
    if (mode === "single") {
      setSelectedIds([imageId]);
    } else {
      setSelectedIds((prev) => {
        if (prev.includes(imageId)) {
          return prev.filter((id) => id !== imageId);
        } else if (prev.length < maxSelection) {
          return [...prev, imageId];
        }
        toast.warning(`Maximum ${maxSelection} images can be selected`);
        return prev;
      });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadFiles.length === 0) {
      toast.warning("Please select files to upload");
      return;
    }

    setUploading(true);
    const toastId = toast.loading("Uploading files...");

    try {
      const formData = new FormData();
      uploadFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response: { data: IMediaResponse[] } = await uploadMedia(formData);
      if (response?.data) {
        setImages((prev) => [...response.data, ...prev]);
        setSelectedIds((prev) => [
          ...prev,
          ...response.data.map((img) => img._id),
        ]);
        setUploadFiles([]);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.success(`${response.data.length} file(s) uploaded successfully`, {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const remainingSlots = Math.max(0, maxSelection - uploadFiles.length);
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    if (filesToAdd.length < imageFiles.length) {
      toast.warning(`Only ${remainingSlots} more file(s) can be added`);
    }

    setUploadFiles((prev) => [...prev, ...filesToAdd]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerFileInput = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current && uploadFiles.length < maxSelection) {
      fileInputRef.current.click();
    } else if (uploadFiles.length >= maxSelection) {
      toast.warning(`Maximum ${maxSelection} files can be uploaded at once`);
    }
  };

  const handleAddSelected = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const selected = images.filter((img) => selectedIds.includes(img._id));
    if (selected.length > 0) {
      onSelect(selected);
      onOpenChange(false);
      toast.success(`${selected.length} image(s) selected`);
    } else {
      toast.warning("Please select at least one image");
    }
  };

  const removeUploadFile = (index: number) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const cancelUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Upload cancelled");
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (uploading || uploadFiles.length >= maxSelection) {
      toast.warning(`Maximum ${maxSelection} files can be uploaded at once`);
      return;
    }

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const remainingSlots = Math.max(0, maxSelection - uploadFiles.length);
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    if (filesToAdd.length < imageFiles.length) {
      toast.warning(`Only ${remainingSlots} more file(s) can be added`);
    }

    setUploadFiles((prev) => [...prev, ...filesToAdd]);
  };

  const filteredImages = images.filter(
    (image) =>
      image.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (image.fileName &&
        image.fileName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        ref={dialogRef}
        className="bg-background rounded-lg shadow-xl w-full max-w-[95vw] h-[90vh] max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-0">
          <h2 className="text-2xl font-semibold">Media Library</h2>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="library"
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="mx-6 mt-4">
            <TabsTrigger value="library">Media Library</TabsTrigger>
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
          </TabsList>

          {/* Library Tab */}
          <TabsContent
            value="library"
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 pb-4 border-b">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-72"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setViewMode("grid");
                    }}
                    type="button"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setViewMode("list");
                    }}
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
                    <p className="text-muted-foreground text-lg">
                      No images found
                    </p>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-4">
                    {filteredImages.map((image) => (
                      <Card
                        key={image._id}
                        className={cn(
                          "relative cursor-pointer transition-all hover:shadow-md h-full flex flex-col",
                          selectedIds.includes(image._id) &&
                            "ring-2 ring-primary"
                        )}
                        onClick={() => handleImageSelect(image._id)}
                      >
                        <div className="aspect-square relative overflow-hidden rounded-t-lg">
                          <Image
                            src={image.url}
                            alt={image.fileName || image.fileName}
                            className="w-full h-full object-cover"
                            fill
                            unoptimized={image.url.startsWith("blob:")}
                          />
                          {selectedIds.includes(image._id) && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="bg-primary text-primary-foreground rounded-full p-1">
                                <Check className="h-4 w-4" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-2 flex-1">
                          <p className="text-sm font-medium truncate">
                            {image.fileName}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 pb-4">
                    {filteredImages.map((image) => (
                      <Card
                        key={image._id}
                        className={cn(
                          "flex items-center p-4 cursor-pointer transition-all hover:shadow-md",
                          selectedIds.includes(image._id) &&
                            "ring-2 ring-primary"
                        )}
                        onClick={() => handleImageSelect(image._id)}
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
                          <p className="font-medium truncate">
                            {image.fileName}
                          </p>
                        </div>
                        <Checkbox
                          checked={selectedIds.includes(image._id)}
                          onCheckedChange={() => handleImageSelect(image._id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent
            value="upload"
            className="flex-1 flex flex-col overflow-hidden"
          >
            <ScrollArea className="px-6 h-full">
              <form onSubmit={handleUpload} className="space-y-6 py-4 h-full">
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-12 text-center flex flex-col items-center justify-center",
                    uploadFiles.length > 0
                      ? "border-muted-foreground/10"
                      : "border-muted-foreground/25",
                    "min-h-[300px] cursor-pointer",
                    uploadFiles.length >= maxSelection &&
                      "cursor-not-allowed opacity-70"
                  )}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
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
                    onChange={handleFileSelect}
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
                        triggerFileInput(e);
                      }
                    }}
                  >
                    <div className="w-full flex justify-center">
                      <Button
                        type="button"
                        className="px-8 py-4 mt-6"
                        disabled={uploading || uploadFiles.length >= maxSelection}
                        onClick={triggerFileInput}
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
                        onClick={cancelUpload}
                        className="text-destructive"
                        type="button"
                      >
                        Cancel Upload
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {uploadFiles.map((file, index) => (
                        <Card
                          key={index}
                          className="relative h-full flex flex-col"
                        >
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
                                removeUploadFile(index);
                              }}
                              disabled={uploading}
                              type="button"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="p-3 flex-1">
                            <p className="text-sm font-medium truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        onClick={cancelUpload}
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
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t">
          <div className="text-sm text-muted-foreground">
            {mode === "multiple"
              ? `${selectedIds.length} of ${maxSelection} selected`
              : "1 selected"}
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenChange(false);
              }}
              className="px-8 py-3"
              type="button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddSelected}
              disabled={selectedIds.length === 0 || uploading}
              className="px-8 py-3"
              type="button"
            >
              Add Selected {selectedIds.length > 0 && `(${selectedIds.length})`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}