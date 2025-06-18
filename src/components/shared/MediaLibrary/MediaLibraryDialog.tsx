"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { toast } from "sonner";
import { getAllMedia, uploadMedia } from "@/services/(AdminServices/MediaService";
import { IMediaResponse, MediaLibraryDialogProps, ViewMode } from "@/types";
import { MediaLibraryHeader } from "./MediaLibraryHeader";
import { MediaLibraryFooter } from "./MediaLibraryFooter";
import { MediaLibraryTabs } from "./MediaLibraryTabs";
import { MediaLibraryView } from "./MediaLibraryView";
import { MediaUploadView } from "./MediaUploadView";

export function MediaLibraryDialog({
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
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      return;
    }

    setSelectedIds((prev) => {
      if (prev.includes(imageId)) {
        return prev.filter((id) => id !== imageId);
      } else if (prev.length < maxSelection) {
        return [...prev, imageId];
      }
      toast.warning(`Maximum ${maxSelection} images can be selected`);
      return prev;
    });
  };

const handleUpload = async (e: React.FormEvent) => {
  e.preventDefault();

  if (uploadFiles.length === 0) {
    toast.warning("Please select files to upload");
    return;
  }

  setUploading(true);

  try {
    const formData = new FormData();
    uploadFiles.forEach((file) => {
      formData.append("files", file);
    });

    const response = await uploadMedia(formData);
    if (response.success) {
      setImages((prev) => [...response.data, ...prev]);
      setSelectedIds((prev) => [
        ...prev,
        ...response.data.map((img: IMediaResponse) => img._id),
      ]);
      setUploadFiles([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success(`${response.data.length} file(s) uploaded successfully`);
    } else {
      toast.error("Upload failed");
    }
  } catch (error) {
    console.error("Upload failed:", error);
    toast.error("Upload failed");
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

  const filteredImages = images.filter((image) =>
    image.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-[95vw] h-[90vh] max-h-[90vh] flex flex-col overflow-hidden">
        <MediaLibraryHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <MediaLibraryTabs
          libraryContent={
            <MediaLibraryView
              viewMode={viewMode}
              setViewMode={setViewMode}
              loading={loading}
              filteredImages={filteredImages}
              selectedIds={selectedIds}
              onImageSelect={handleImageSelect}
              maxSelection={maxSelection}
            />
          }
          uploadContent={
            <MediaUploadView
              uploadFiles={uploadFiles}
              maxSelection={maxSelection}
              uploading={uploading}
              onFileSelect={handleFileSelect}
              onTriggerFileInput={triggerFileInput}
              onRemoveUploadFile={removeUploadFile}
              onCancelUpload={cancelUpload}
              onSubmit={handleUpload}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              fileInputRef={fileInputRef as RefObject<HTMLInputElement>}
            />
          }
        />

        <MediaLibraryFooter
          selectedCount={selectedIds.length}
          maxSelection={maxSelection}
          mode={mode}
          uploading={uploading}
          onCancel={() => onOpenChange(false)}
          onAddSelected={handleAddSelected}
        />
      </div>
    </div>
  );
}