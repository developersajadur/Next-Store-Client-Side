"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FilterSidebar } from "./filter-sidebar";
import { Filter } from "lucide-react";

export function MobileFilterSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <FilterSidebar
          key={open ? "open" : "closed"}
          // isMobile={true}
          onClose={() => setOpen(true)}
          className="border-0 shadow-none"
        />
      </SheetContent>
    </Sheet>
  );
}
