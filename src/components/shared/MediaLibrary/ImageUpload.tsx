"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { MediaLibraryDialog } from "./MediaLibraryDialog"
import { IMediaResponse } from "@/types"

interface ImageUploadProps {
  value: IMediaResponse | null
  onChange: (image: IMediaResponse | null) => void
  placeholder?: string
  className?: string
}

export function ImageUpload({ value, onChange, placeholder = "Upload image", className }: ImageUploadProps) {
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)

  const handleMediaSelect = (images: IMediaResponse[]) => {
    if (images.length > 0) {
      onChange(images[0])
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
  }

  return (
    <>
      <Card
        className={cn(
          "relative border-2 border-dashed transition-colors cursor-pointer hover:border-primary/50",
          value ? "border-solid border-border" : "border-muted-foreground/25",
          className,
        )}
        onClick={() => setShowMediaLibrary(true)}
      >
        {value ? (
          <div className="relative">
            <Image
              src={value.url || "/placeholder.svg"}
              alt={value.fileName}
              className="w-full h-32 object-cover rounded"
                width={300}
                height={300}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 h-6 w-6 p-0"
              onClick={handleRemove}
            >
              <X className="h-3 w-3" />
            </Button>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 rounded-b">
              {value.fileName}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-1">{placeholder}</p>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">Click to browse</span> from media library
            </p>
          </div>
        )}
      </Card>

      <MediaLibraryDialog
        open={showMediaLibrary}
        onOpenChange={setShowMediaLibrary}
        onSelect={handleMediaSelect}
        mode="single"
        maxSelection={1}
        selectedImages={value ? [value] : []}
      />
    </>
  )
}
