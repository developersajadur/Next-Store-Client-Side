
export interface IMediaResponse {
  _id: string;
  url: string;
  addedBy: string;
  fileName: string;
  isDeleted: boolean;
  createdAt: Date; 
  updatedAt: Date; 
}



export interface MediaLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (images: IMediaResponse[]) => void;
  maxSelection?: number;
  selectedImages?: IMediaResponse[];
  mode?: "single" | "multiple";
}

export type ViewMode = "grid" | "list";