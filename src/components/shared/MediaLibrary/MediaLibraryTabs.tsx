"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

interface MediaLibraryTabsProps {
  libraryContent: ReactNode;
  uploadContent: ReactNode;
}

export function MediaLibraryTabs({
  libraryContent,
  uploadContent,
}: MediaLibraryTabsProps) {
  return (
    <Tabs defaultValue="library" className="flex-1 flex flex-col overflow-hidden">
      <TabsList className="mx-6 mt-4">
        <TabsTrigger value="library">Media Library</TabsTrigger>
        <TabsTrigger value="upload">Upload Files</TabsTrigger>
      </TabsList>

      <TabsContent
        value="library"
        className="flex-1 flex flex-col overflow-hidden"
      >
        {libraryContent}
      </TabsContent>

      <TabsContent
        value="upload"
        className="flex-1 flex flex-col overflow-hidden"
      >
        {uploadContent}
      </TabsContent>
    </Tabs>
  );
}