"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface FilterSidebarProps {
  className?: string;
  onClose?: () => void;
  isMobile?: boolean;
}

export function FilterSidebar({ className, onClose, isMobile = false }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize states from URL params or empty defaults
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [availability, setAvailability] = useState(searchParams.get("availability") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "default");
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  // Sync local state with URL params on change
  useEffect(() => {
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setAvailability(searchParams.get("availability") || "");
    setSortBy(searchParams.get("sortBy") || "default");
  }, [searchParams]);

  // Update the URL with current filters
  const updateFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Preserve existing 'search' query param
    const currentSearch = searchParams.get("search");
    if (currentSearch) {
      params.set("search", currentSearch);
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    if (availability) {
      params.set("availability", availability);
    } else {
      params.delete("availability");
    }

    if (sortBy !== "default") {
      params.set("sortBy", sortBy);
    } else {
      params.delete("sortBy");
    }

    router.push(`/products?${params.toString()}`);

    if (isMobile && onClose) onClose();
  };

  // Clear all filters except 'search'
  const clearFilters = () => {
    const params = new URLSearchParams();
    const currentSearch = searchParams.get("search");
    if (currentSearch) params.set("search", currentSearch);

    setMinPrice("");
    setMaxPrice("");
    setAvailability("");
    setSortBy("default");

    router.push(`/products?${params.toString()}`);
  };

  // Check if any filter is active
  const hasActiveFilters = minPrice || maxPrice || availability || sortBy !== "default";

  return (
    <Card className={cn("h-fit", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear
              </Button>
            )}
            {isMobile && (
              <>
                <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div className="space-y-3">
            <Label>Price Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                min={0}
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min={0}
              />
            </div>
          </div>

          <Separator />

          {/* Availability */}
          <div className="space-y-3">
            <Label>Availability</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={availability === "in-stock"}
                  onCheckedChange={() =>
                    setAvailability(availability === "in-stock" ? "" : "in-stock")
                  }
                />
                <Label htmlFor="in-stock">In Stock</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="out-of-stock"
                  checked={availability === "out-of-stock"}
                  onCheckedChange={() =>
                    setAvailability(availability === "out-of-stock" ? "" : "out-of-stock")
                  }
                />
                <Label htmlFor="out-of-stock">Out of Stock</Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Sort By */}
          <div className="space-y-3">
            <Label>Sort By</Label>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full bg-orange-500 hover:bg-orange-400" onClick={updateFilters}>
            Apply Filters
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
