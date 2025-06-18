"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, ImageIcon, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { IMediaResponse } from "@/types"
import { MediaLibraryDialog } from "../MediaLibrary/MediaLibraryDialog"

interface MultiImageUploadProps {
  value: IMediaResponse[]
  onChange: (images: IMediaResponse[]) => void
  maxImages?: number
  className?: string
}

export function MultiImageUpload({ value = [], onChange, maxImages = 4, className }: MultiImageUploadProps) {
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)

  const handleMediaSelect = (images: IMediaResponse[]) => {
    // Combine existing images with new selections, avoiding duplicates
    const existingIds = value.map((img) => img._id)
    const newImages = images.filter((img) => !existingIds.includes(img._id))
    const combined = [...value, ...newImages].slice(0, maxImages)
    onChange(combined)
    setShowMediaLibrary(false)
  }

  const handleRemove = (imageId: string) => {
    onChange(value.filter((img) => img._id !== imageId))
  }

  const canAddMore = value.length < maxImages

  return (
    <>
      <div className={cn("grid grid-cols-2 gap-2", className)}>
        {/* Existing Images */}
        {value.map((image, index) => (
          <Card key={image._id} className="relative border-2 border-solid border-border">
            <div className="aspect-square relative overflow-hidden rounded">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.fileName}
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 h-5 w-5 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove(image._id)
                }}
              >
                <X className="h-3 w-3" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                {index + 1}
              </div>
            </div>
          </Card>
        ))}

        {/* Empty Slots */}
        {Array.from({ length: maxImages - value.length }).map((_, index) => (
          <Card
            key={`empty-${index}`}
            className={cn(
              "relative border-2 border-dashed border-muted-foreground/25 transition-colors cursor-pointer hover:border-primary/50",
              !canAddMore && "cursor-not-allowed opacity-50",
            )}
            onClick={() => canAddMore && setShowMediaLibrary(true)}
          >
            <div className="aspect-square flex flex-col items-center justify-center p-4 text-center">
              {index === 0 && value.length === 0 ? (
                <>
                  <ImageIcon className="h-6 w-6 text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">
                    <span className="text-primary">Click to browse</span>
                  </p>
                </>
              ) : (
                <Plus className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add More Button */}
      {canAddMore && value.length > 0 && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setShowMediaLibrary(true)} 
          className="w-full mt-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add More Images ({value.length}/{maxImages})
        </Button>
      )}

      <MediaLibraryDialog
        open={showMediaLibrary}
        onOpenChange={setShowMediaLibrary}
        onSelect={handleMediaSelect}
        mode="multiple"
        maxSelection={maxImages - value.length}
        selectedImages={value}
      />
    </>
  )
}