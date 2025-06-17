"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, Search, Grid3X3, List, Check, X, ImageIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { getAllMedia, uploadMedia } from "@/services/(AdminServices/MediaService"
import { IMediaResponse } from "@/types"


interface MediaLibraryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (images: IMediaResponse[]) => void
  maxSelection?: number
  selectedImages?: IMediaResponse[]
  mode?: "single" | "multiple"
}

export function MediaLibraryDialog({
  open,
  onOpenChange,
  onSelect,
  maxSelection = 10,
  selectedImages = [],
  mode = "multiple",
}: MediaLibraryDialogProps) {
  const [images, setImages] = useState<IMediaResponse[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>(selectedImages.map((img) => img._id))
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadFiles, setUploadFiles] = useState<File[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load media when dialog opens
  useEffect(() => {
    const loadMedia = async () => {
      if (open) {
        setLoading(true)
        try {
          const response = await getAllMedia()
        //   console.log(response);
          setImages(response?.data || [])
          setSelectedIds(selectedImages.map((img) => img._id))
        } catch (error) {
          console.error("Failed to load media:", error)
        } finally {
          setLoading(false)
        }
      }
    }
    loadMedia()
  }, [open, selectedImages])

  const handleImageSelect = (imageId: string) => {
    if (mode === "single") {
      setSelectedIds([imageId])
    } else {
      setSelectedIds((prev) => {
        if (prev.includes(imageId)) {
          return prev.filter((id) => id !== imageId)
        } else if (prev.length < maxSelection) {
          return [...prev, imageId]
        }
        return prev
      })
    }
  }

  const handleUpload = async () => {
    if (uploadFiles.length === 0) return

    setUploading(true)
    try {
      const formData = new FormData()
      uploadFiles.forEach(file => {
        formData.append('files', file)
      })

    const response: { data: IMediaResponse[] } = await uploadMedia(formData)
if (response?.data) {
  setImages(prev => [...response.data, ...prev])
  setSelectedIds(prev => [...prev, ...response.data.map(img => img._id)])
  setUploadFiles([])
}
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))
    setUploadFiles((prev) => [...prev, ...imageFiles].slice(0, maxSelection))
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleAddSelected = () => {
    const selected = images.filter((img) => selectedIds.includes(img._id))
    onSelect(selected)
    onOpenChange(false)
  }

  const removeUploadFile = (index: number) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (uploading) return

    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))
    setUploadFiles((prev) => [...prev, ...imageFiles].slice(0, maxSelection))
  }

  const filteredImages = images.filter(image =>
    image.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (image.fileName && image.fileName.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] h-[95vh] max-w-none max-h-none p-0 flex flex-col">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl">Media Library</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="library" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-6">
            <TabsTrigger value="library">Media Library</TabsTrigger>
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="flex-1 flex flex-col mt-0 overflow-hidden">
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
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedIds.length} of {maxSelection} selected
              </div>
            </div>

            <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : filteredImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">No images found</p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                  {filteredImages.map((image) => (
                    <Card
                      key={image._id}
                      className={cn(
                        "relative cursor-pointer transition-all hover:shadow-md group h-full flex flex-col",
                        selectedIds.includes(image._id) && "ring-2 ring-primary",
                      )}
                      onClick={() => handleImageSelect(image._id)}
                    >
                      <div className="aspect-square relative overflow-hidden rounded-t-lg">
                        <Image
                          src={image.url}
                          alt={image.fileName || image.fileName}
                          className="w-full h-full object-cover"
                          fill
                          unoptimized={image.url.startsWith('blob:')}
                        />
                        {selectedIds.includes(image._id) && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="bg-primary text-primary-foreground rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-2 flex-1 flex flex-col">
                        <p className="text-sm font-medium truncate">{image.fileName}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredImages.map((image) => (
                    <Card
                      key={image._id}
                      className={cn(
                        "flex items-center p-4 cursor-pointer transition-all hover:shadow-md",
                        selectedIds.includes(image._id) && "ring-2 ring-primary",
                      )}
                      onClick={() => handleImageSelect(image._id)}
                    >
                      <div className="w-20 h-20 relative overflow-hidden rounded mr-4">
                        <Image
                          src={image.url}
                          alt={image.fileName || image.fileName}
                          className="w-full h-full object-cover"
                          fill
                          unoptimized={image.url.startsWith('blob:')}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{image.fileName}</p>
                        {/* <p className="text-sm text-muted-foreground truncate">
                          {image.size ? formatFileSize(image.size) : 'N/A'} • {image.createdAt?.split('T')[0]}
                        </p> */}
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
            </ScrollArea>
          </TabsContent>

          <TabsContent value="upload" className="flex-1 flex flex-col mt-0 overflow-hidden">
            <ScrollArea className="p-6 h-full">
              <div className="space-y-6 h-full">
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-lg p-12 text-center flex flex-col items-center justify-center",
                    uploadFiles.length > 0 ? "border-muted-foreground/10" : "border-muted-foreground/25",
                    "min-h-[300px]"
                  )}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <ImageIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-xl font-medium">Upload Images</p>
                    <p className="text-muted-foreground">
                      Drag and drop images here, or click to browse (Max {maxSelection} images)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    disabled={uploading}
                    ref={fileInputRef}
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer mt-6">
                    <Button className="px-8 py-4" disabled={uploading}>
                      <Upload className="mr-2 h-5 w-5" />
                      <span className="text-base">Choose Files</span>
                    </Button>
                  </Label>
                </div>

                {uploadFiles.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="font-medium text-lg">Files to Upload ({uploadFiles.length})</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {uploadFiles.map((file, index) => (
                        <Card key={index} className="relative h-full">
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
                              onClick={() => removeUploadFile(index)}
                              disabled={uploading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="p-3">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                    <Button 
                      onClick={handleUpload} 
                      disabled={uploading} 
                      className="w-full py-6 text-base"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-5 w-5" />
                          Upload {uploadFiles.length} File{uploadFiles.length !== 1 ? "s" : ""}
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between p-6 border-t">
          <div className="text-sm text-muted-foreground">
            {mode === "multiple" ? `${selectedIds.length} of ${maxSelection} selected` : "1 selected"}
          </div>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="px-8 py-3"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddSelected} 
              disabled={selectedIds.length === 0 || uploading}
              className="px-8 py-3"
            >
              Add Selected {selectedIds.length > 0 && `(${selectedIds.length})`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}